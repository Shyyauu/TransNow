import {useState} from "react";
import {nanoid} from "nanoid";
import { Link } from "react-router-dom";

import TranslationField from "./TranslationField";
import "./Story.css";


export default function Story({language, saveWord}) {
  const [storiesData, setStoriesData] = useState({
    title: "Title",
    author: "Author",
    story: "Story",
    moral: "Moral",
  })

  const [wordToTranslate, setWordToTranslate] = useState("");
  const [visible, setVisible] = useState(false)
  const splitingChar = " "

  const handleToogleVisible = () => {
    setVisible(false)
  }

  const fetchData = () => {
    return fetch("https://shortstories-api.onrender.com")
      .then((res) => res.json())
      .then((data) => setStoriesData(data))
  }

  const translateField = (event) => {
    event.preventDefault()
    setVisible((prevState) => !prevState)
    const wordValue = event.target.getAttribute("value")
    console.log(wordValue)
    setWordToTranslate(wordValue.toLowerCase())
  }

  const regex = /[,.'"!?—]/g
  const sentence = storiesData.story.split(splitingChar)
  console.log(sentence.toString())

  return (
    <>
      <Link to="/">Settings</Link>
      {/* <pre>{JSON.stringify(storiesData, null, 2)}</pre> */}
      {/* <h1>{storiesData.length}</h1> */}
      <h1>{storiesData.title}</h1>
      <p>{storiesData.author}</p>
      {/* <div>{storiesData.story}</div> */}
      <p className="story-area">
        {sentence.map((sentence) => {
          return (
            <span
              className="story"
              key={nanoid()}
              value={sentence.toString().replace(regex, '')}
              onClick={translateField}
            >
              {sentence + splitingChar}
            </span>
          )
        })}
      </p>
      <p>{storiesData.moral}</p>

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
    </>
  )
}