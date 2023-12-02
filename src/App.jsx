import { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Story from './Story'
import MainSettings from './MainSettings'
import ScoreBoard from './ScoreBoard'


export default function App() {
  const [language, setLanguage] = useState('pl')

    const [translatedWordToScoreboard, setTranslatedWordToScoreboard] = useState(
      [
        {
          word: 'pussy',
          meaning: 'kotek'
        }
      ])     
  
 
  return (
      <Routes>
        <Route path='/' element={<MainSettings onLanguage={setLanguage}/>} />
        <Route path='/story' element={
          <>
            <Story language={language} saveWord={setTranslatedWordToScoreboard}/>
            <ScoreBoard savedWord={translatedWordToScoreboard}/>
          </>
        }/>
      </Routes>
  )
}