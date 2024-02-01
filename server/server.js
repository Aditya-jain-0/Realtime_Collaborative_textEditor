const express = require('express')
const app = express();
const http = require('http')
const {Server} = require('socket.io')
require('dotenv').config()

const server = http.createServer(app)
const io = new Server(server)

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

