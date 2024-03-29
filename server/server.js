const express = require('express')
const app = express();
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

const server = http.createServer(app)
const io = new Server(server)
require('dotenv').config()

const compiler = require('compilex')
var options = {stats : true}; //prints stats on console 
compiler.init(options);

app.use(cors());

const userSocketMap = {}

function connectedClients(roomId){
    // get 'roomId' from all rooms
    // "io.sockets.adapter.rooms.get(roomId)" gives map    //N
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username : userSocketMap[socketId]
        }
    })

}

io.on('connection',(socket)=>{
    console.log('socket connected ',socket.id);

    socket.on('join',({roomId,username})=>{
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = connectedClients(roomId);
        // console.log(clients)
        
        //alert for new joinee
        clients.forEach(({socketId})=>{
            io.to(socketId).emit('joined',{
                clients,
                username,
                socketId : socket.id
            })
        })
    })

    socket.on('code-change',({roomId,code})=>{    
        // io.to(roomId).emit('code-change',{code});  //E
        socket.in(roomId).emit('code-change',{code});
    })
   
    socket.on('compile-code',({code,input})=>{  
        if(input){
        var envData = { OS : "windows"}; 
        compiler.compilePythonWithInput( envData , code , input , function(data){
            const outpt = data.output;
            socket.emit('compile-code',{outpt})
        });
        }else{
         var envData = { OS : "windows"}; 
         compiler.compilePython( envData , code , function(data){
             const outpt = data.output;
             socket.emit('compile-code',{outpt})
         }); 
        }
    })

    socket.on('sync-code',({code,socketId})=>{    
        // io.to(roomId).emit('code-change',{code});  //E
        io.to(socketId).emit('code-change',{code});
    })

    //event before socket completely disconnecting (terminate browser, shift to another tab)
    socket.on('disconnecting',()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit('disconnected',{
                socketId : socket.id,
                username : userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id]
        socket.leave();
    })
})  


const PORT = process.env.PORT || 8000
server.listen(PORT,()=>{
    console.log(`Express Server started at Port ${PORT}`)
})

