import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Story from './Story'
import MainSettings from './MainSettings'


export default function App() {
  const [language, setLanguage] = useState('pl')
 
  return (
    <Routes>
      <Route path='/' element={<MainSettings onLanguage={setLanguage}/>} />
      <Route path='/story' element={<Story language={language}/>} />
    </Routes>
  )
}