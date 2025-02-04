import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header, Navbar } from './components'
import { Bonds, Cells, Home, Pulses } from './pages'

function App() {

  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bonds' element={<Bonds />} />
        <Route path='/cells' element={<Cells />} />
        <Route path='/pulses' element={<Pulses />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
