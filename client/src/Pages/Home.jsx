import React,{useState} from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {v4} from 'uuid'

const Home = () => {
  const navigator = useNavigate()
  const [name, setname] = useState('')
  const [roomid, setroomid] = useState('')

  const createRoom = (e)=>{ 
    e.preventDefault();
    const id = v4();
    setroomid(id);
  }
  const handlekey = (e)=>{
    if(e.code === 'Enter'){
      joinRoom()
    }
  }
  const joinRoom = ()=>{
      if(!name && !roomid){
        toast.error('Empty Fields ☹️')
        return;
      }
      else if(!name){
        toast.error('Empty Name ☹️')
        return;
      }
      else if(!roomid){
        toast.error('Empty Room ID ☹️')
        return;
      }else{
        navigator(`/${name}/${roomid}`)
        return;
      }
  }  
  return (
    <>
    <h1>Collaborative Text Editor</h1>
    Enter Name<input 
        type='text'
        placeholder='Enter your name'
        onChange={(e)=>setname(e.target.value)}
        value={name}
        onKeyUp={handlekey}
    /><br/>
    Room ID : <input
        type='text'
        placeholder='Enter room Id'
        value={roomid}
        onChange={(e)=>setroomid(e.target.value)}
        onKeyUp={handlekey}
      /><br/>
      <button onClick={createRoom}>Create New Room</button>
      &nbsp;<button onClick={joinRoom}>JoinRoom</button>
    </>
  )
}

export default Home