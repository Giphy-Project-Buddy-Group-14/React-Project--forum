import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/Home/Home.jsx'
import Signin from './components/Signin/Signin.jsx'

function App() {


  return (
    <>
    <Routes>
      <Route path='/home' element={<Home />}/>
      <Route path='/' element={<Home />}/>
      <Route path='/signin' element={<Signin />}/>

    

    </Routes>
     <h1>Hello Home Page</h1>
    </>
  )
}

export default App
