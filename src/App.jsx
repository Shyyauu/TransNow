import { Route, Routes } from 'react-router-dom'
import './App.css'
import Story from './Story'
import MainSettings from './MainSettings'

export default  function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSettings />} />
      <Route path="/story" element={<Story />} />
    </Routes>
  )
}