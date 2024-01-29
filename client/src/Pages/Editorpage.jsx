import React,{useState} from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'

const EditorPage = () => {
  const [clients, setClients] = useState([
    {socketId:1,username:'Aditya sus'},
    {socketId:2,username:'Ivar boneless'},
    {socketId:3,username:'Bjorn Ironside'},
    {socketId:4,username:'Ubbe lothbrok'},
    {socketId:5,username:'Hvitserk'},
  ])
  return (
    <div className='mainWrap'>
      <div className='memWrap'>
          <div className='memWrapinner'>
            <h3 className='EditorHeading'>Collaborators</h3>  
            <div className='memList'>
              {clients.map((client)=>(
                <Client 
                key = {client.socketId} 
                username = {client.username}
                />
              ))}
            </div>
          </div>  
       </div>
      <div className='editorWrap'>
          <Editor/>
       </div>
      <div className='memWrapbtn'>
      <button>Copy room Id</button>
      <button>Leave</button>
      </div>
    </div>
  )
}

export default EditorPage