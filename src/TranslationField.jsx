import {useEffect, useState} from "react";
import axios from "axios";
import "./TranslationField.css";


export default function TranslationField(props) {
  const [translatedWord, setTranslatedWord] = useState("wait for it");


  const saveTransletedWord = () => {
      console.log(translatedWord)
    };

  async function RapidApi() {
    const options = {
      method: "GET",
      url: "https://translated-mymemory---translation-memory.p.rapidapi.com/get",
      params: {
        langpair: "en|pl",
        q: props.wordToTranslate,
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
      const response = await axios.request(options);
      console.log(response.data.responseData.translatedText);
      setTranslatedWord(response.data.responseData.translatedText);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(
    function () {
      RapidApi();
    },
    [props.wordToTranslate]
  );

  return (
    <>
      {props.visible ? (
        <div className="background">
          <div className="translation">
            <div className="translated-sentence">
              <p className="selected-word">Chosen word: <span className="the-word">"{props.wordToTranslate}"</span></p> 
              <p className="meaning-word">Meaning: <span className="the-word">"{translatedWord}"</span></p>       
              <div className="btn-wrapper">
                <div className="i-know" onClick={saveTransletedWord}>Got it</div>
                <div className="i-dont-know" onClick={props.handleToogleVisible}>learning</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}