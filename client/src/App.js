import './App.css';
import {Toaster} from 'react-hot-toast'
import  {BrowserRouter,Routes,Route} from 'react-router-dom'
import Editorpage from './Pages/Editorpage'
import Home from './Pages/Home'

function App() {
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
            <Route path='/:username/:roomId' element={<Editorpage/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
