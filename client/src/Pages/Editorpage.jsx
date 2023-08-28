import React from 'react'
import { useParams } from 'react-router-dom'
import {io} from 'socket.io-client'

const Editorpage = () => {
    const {username : name,roomId} = useParams();
    const socket = io('http://localhost:8000')
    socket.on('connect',()=>{
      console.log(`${name} connected with socket id ${socket.id}`)
    })

  return (
    <h1>EditorPage</h1>
  )
}

export default Editorpage