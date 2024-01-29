import React, { useEffect } from 'react'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'

const Editor = () => {
  useEffect(()=>{
    async function init(){
      Codemirror.fromTextArea(document.getElementById('rteditor'),{
        mode:{name:'javascript',json:true},
        theme:'material-ocean',
        autoCloseTags:true,
        autoCloseBrackets:true,
        lineNumbers:true
      })
    }
    init()
  },[])
  return (
    <textarea id='rteditor'></textarea>
    // <textarea id='rteditor' rows="35" cols = "125"></textarea>
  )
}

export default Editor