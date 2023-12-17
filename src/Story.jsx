import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { signOut } from "firebase/auth"
import { auth } from "./firebase"
import { useNavigate } from "react-router-dom";
import { useAddStory } from "./useAddStory"

import TranslationField from "./TranslationField";
import StoryList from "./StoryList";
import "./Story.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


export default function Story({language, saveWord}) {
  const [storiesData, setStoriesData] = useState({
    _id: "_ID",
    title: "Title",
    author: "Author",
    story: "Story",
    moral: "Moral",
  })


  const { addStory } = useAddStory()

  const [wordToTranslate, setWordToTranslate] = useState("");
  const [visible, setVisible] = useState(false)
  const [wantToSaveStory, setWantToSaveStory] = useState(false)
  const splitingChar = "."

  const regex = /[,.'"!?—]/g
  const sentence = storiesData.story.split(splitingChar)


  const handleToogleVisible = () => {
    setVisible(false)
  }

  const fetchData = () => {
    return fetch("https://shortstories-api.onrender.com")
      .then((res) => res.json())
      .then((data) => setStoriesData(data))
  }

  const translateField = (e) => {
    e.preventDefault()
    setVisible((prevState) => !prevState)
    const wordValue = e.target.getAttribute("value")
    setWordToTranslate(wordValue.toLowerCase())
  }

  const navigate = useNavigate()
  const singUserOut = async() => {
    try {
      await signOut(auth)
      localStorage.clear()
      navigate('/')
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if(storiesData.title !== 'Title') {
      addStory({
        storytitle: storiesData.title,
        author: storiesData.author, 
        story: storiesData.story, 
        moral: storiesData.moral 
      })
    }
  }, [wantToSaveStory])


  return (
    <>
    <div className="story-site">
      <FontAwesomeIcon className="profil" onClick={singUserOut} icon={faArrowLeft} />
      <StoryList 
      selectedStory={setStoriesData}
      addStoryToFirebase={setWantToSaveStory}
      />
      {/* <pre>{JSON.stringify(storiesData, null, 2)}</pre> */}
      {/* <h1>{storiesData.length}</h1> */}
      <h1>{storiesData.title}</h1>
      <p className="italic">{storiesData.author}</p>
      {/* <div>{storiesData.story}</div> */}
      <p className="story-area">
        {sentence.map((sentence) => {
          return (
            <span
              className="story"
              key={nanoid()}
              value={sentence.replace(regex, '')}
              onClick={translateField}
            >
              {sentence + splitingChar}
            </span>
          )
        })}
      </p>
      <p className="italic">{storiesData.moral}</p>

      <button className="story-btn nextstory" onClick={fetchData}>
        {" "}
        {storiesData.title === "Title" ? "New story" : "Next story"}
      </button>

      {wordToTranslate ? (
        <TranslationField
          wordToTranslate={wordToTranslate}
          visible={visible}
          language={language.toString()}
          saveWord={saveWord}
          handleToogleVisible={handleToogleVisible}
        />
      ) : null}
      </div>
    </>
  )
}