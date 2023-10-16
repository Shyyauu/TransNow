import { useState, useEffect, useId} from 'react'
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

  useEffect(function() {
    fetch("https://shortstories-api.onrender.com")
        .then(res => res.json())
        .then(data => setStoriesData(data))
}, [])


function nextStory() {
    console.log(storiesData)
}

const translateField = (event) => {
  event.preventDefault()
  setVisible(prevState  => !prevState)
  const wordValue = event.target.getAttribute("value")
  // sconsole.log(wordValue)
  setWordToTranslate(wordValue)
}

    const sentence = storiesData.story.split(' ')
    const spanId = useId() // POPRAWIĆ

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
                  key={spanId} 
                  value={sentence.toString()}
                  onClick={translateField}>{sentence} </span>
                  )
                })
              }
        </p>
        <p>{storiesData.moral}</p>
        <button onClick={nextStory}>Next story</button>
        <div className={visible ? 'translation' : 'none'}>
          <p>Wybrane słowo: {wordToTranslate}</p> <br></br>
          <p>Znaczenie: [...]</p>
        </div>
    </>
  )
}