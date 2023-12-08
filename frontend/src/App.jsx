import { Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './pages/Home'

const App = () => {

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  )
}

export default App
