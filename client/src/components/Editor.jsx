import React, { useEffect, useRef } from 'react'
import Codemirror, { changeEnd } from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'

const Editor = ({socketRef}) => {

  const editorRef = useRef(null);

  useEffect(()=>{
    async function init(){
      editorRef.current =  Codemirror.fromTextArea(document.getElementById('rteditor'),{
        mode:{name:'javascript',json:true},
        theme:'material-ocean',
        autoCloseTags:true,
        autoCloseBrackets:true,
        lineNumbers:true
      });

      // 'change' codemirror event 
      editorRef.current.on('change',(instance,changes)=>{
          // console.log('changes ',changes)  // input
          const {origin} = changes
          const code = instance.getValue();   //editor content 
          

          console.log(code)
      })

      // editorRef.current.setValue('')

    }
    init()
  },[])
  return (
    <textarea id='rteditor'></textarea>
    // <textarea id='rteditor' rows="35" cols = "125"></textarea>
  )
}

export default Editor