import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from 'react-hot-toast'
import EditorPage from './pages/EditorPage'
import './App.css'

const App = () => {
  return (
    <>
      <div>
          <Toaster
              position="top-center"
              toastOptions={{
                  success: {
                      theme: {
                          primary: '#4aed88',
                      },
                  },
              }}
          ></Toaster>
      </div>      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/editor/:roomId' element={<EditorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App