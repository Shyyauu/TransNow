import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import "./TranslationField.css";
import { useAddTranslation } from "./useAddTranslation";


export default function TranslationField(props) {
  const [translatedWord, setTranslatedWord] = useState("wait for it")
  const [chosenWord, setChosenWord] = useState([])
  const [saveChosenWord, setSaveChosenWord] = useState('')
  const [saveTranslatedWord, setSaveTranslatedWord] = useState('')
  const [isClicked, setIsClicked] = useState(true)
  const { addTranslation } = useAddTranslation()
  const splitingChar = ' '

  const handleClick = () => {
    setSaveChosenWord('')
    setSaveTranslatedWord('')
    setIsClicked(props.handleToogleVisible)
  }

  const saveTransletedWord = async(e) => {
    e.preventDefault()
    if(saveChosenWord !== '') {
      addTranslation({word: saveChosenWord, meaning: saveTranslatedWord.toLowerCase().replace(/[,.'"!?—]/g, '')})
      props.handleToogleVisible(props.visible)
    } else {
      alert("choose the word to translate in 'chosen sentence' section :)")
    }
    setSaveChosenWord('')
  }

  const chooseTheWord = (e) => {
    e.preventDefault()
    const wordValue = e.target.getAttribute("value")
    setSaveChosenWord(wordValue)
  }

  async function RapidApi(translate, setter) {
    const options = {
      method: "GET",
      url: "https://translated-mymemory---translation-memory.p.rapidapi.com/get",
      params: {
        langpair: `en|${props.language}`,
        q: translate,
        mt: "1",
        onlyprivate: "0",
        de: "a@b.c",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X_RapidAPI_Key,
        "X-RapidAPI-Host":
          "translated-mymemory---translation-memory.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options)
      setter(response.data.responseData.translatedText)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(
    function () {
      RapidApi(props.wordToTranslate, setTranslatedWord)
      setChosenWord(props.wordToTranslate.split(splitingChar))
    },
    [props.wordToTranslate]
  );

  useEffect(
    function () {
      if(saveChosenWord !== '') {
        RapidApi(saveChosenWord, setSaveTranslatedWord)
      }
    },
    [saveChosenWord]
  );

  return (
    <>
      {props.visible ? (
        <div className="background">
          <div className="translation">
            <div className="translated-sentence">
              <p className="selected-word">Chosen sentence:</p> 
                <div className="selected-word black">
                {
                chosenWord.map(words => {
                return (
                  <span className='chosen-word' 
                    value={words} 
                    key={nanoid()}
                    onClick={chooseTheWord}> 
                    {words + splitingChar}
                  </span>
                )
              })}
              </div> 
              <p className="meaning-word">Meaning: <span className="the-word">{translatedWord.toLowerCase()}</span></p>       
              <div className="btn-wrapper">
                <div className="i-know" onClick={saveTransletedWord}>
                  {saveChosenWord ? 'got it' : 'choose'}
                </div>
                <div className="i-dont-know" onClick={handleClick}>not yet</div>
                {
                  saveChosenWord !== '' ? 
                  <div className="word-cloud">
                    <span>{saveChosenWord}</span>
                    <span> - {saveTranslatedWord ? saveTranslatedWord : 'wait..'}</span>
                  </div> 
                  : null
                }
              
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}