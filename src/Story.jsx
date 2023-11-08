import { useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import TranslationField from './TranslationField'
import './Story.css'

export default function Story() {

  const [storiesData, setStoriesData] = useState({
    title: "Title",
    author: "Author",
    story: "Story",
    moral: "Moral"
  })

  const [wordToTranslate, setWordToTranslate] = useState('')
  const [visible, setVisible] = useState(false)
  const splitingChar = ' '

  const fetchData = () => {
      return fetch("https://shortstories-api.onrender.com")
              .then(res => res.json())
              .then(data => setStoriesData(data))
    }


const translateField = (event) => {
  event.preventDefault()
  setVisible(prevState  => !prevState)
  const wordValue = event.target.getAttribute("value")
  console.log(wordValue)
  setWordToTranslate(wordValue)
}
    const sentence = storiesData.story.split(splitingChar)

  return (
    <>
        {/* <pre>{JSON.stringify(storiesData, null, 2)}</pre> */}
        {/* <h1>{storiesData.length}</h1> */}
        <h1>{storiesData.title}</h1>
        <p>{storiesData.author}</p>
        {/* <div>{storiesData.story}</div> */}
        <p>
            {
              sentence.map(sentence => {
                return (
                  <span
                    className='story' 
                    key={nanoid()} 
                    value={sentence.toString()}
                    onClick={translateField}>
                  {sentence + splitingChar}</span>
                  )
                })
              }
        </p>
        <p>{storiesData.moral}</p>
        
        <button className='nextstory-btn' onClick={fetchData}> {
          storiesData.title === 'Title' ? 'New story' : 'Next story'
        }</button>
        
        <TranslationField wordToTranslate={wordToTranslate} visible={visible} /> 
        

    </>
  )
}