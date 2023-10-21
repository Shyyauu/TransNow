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

  const fetchData = () => {
    return fetch("https://shortstories-api.onrender.com")
            .then(res => res.json())
            .then(data => setStoriesData(data))
  }

  useEffect(function() {
    fetchData();
}, [])


const translateField = (event) => {
  event.preventDefault()
  setVisible(prevState  => !prevState)
  const wordValue = event.target.getAttribute("value")
  console.log(wordValue)
  setWordToTranslate(wordValue)
}
  console.log(storiesData.length)
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
                    onClick={translateField}>
                  {sentence} </span>
                  )
                })
              }
        </p>
        <p>{storiesData.moral}</p>
        
        <button className='nextstory-btn' onClick={fetchData}>Next story</button>
        
        <div className={visible ? 'translation' : 'none'}>
          <div className={'xmark'}></div>
          <p>Wybrane słowo: {wordToTranslate}</p> <br></br>
          <p>Znaczenie: [...]</p>
        </div>
    </>
  )
}