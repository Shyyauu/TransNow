import { useEffect, useState } from 'react'
// import { Configuration, OpenAIApi } from "openai";
// import OpenAI from "openai";
// import axios from 'axios'
import './TranslationField.css'
// import * as deepl from 'deepl-node';

export default function TranslationField(props) {
  
  const [translatedWord, setTranslatedWord] = useState('wait for it')
  // const API_KEY = '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'

  // const handleGenerateResponse = () => {
  //   fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       model: "gpt-3.5-turbo",
  //       prompt: "Translate this text: 'Hello, world!' to Polish language.",
  //       max_tokens: 50,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error('Błąd podczas wywoływania API ChatGPT:', error);
  //     });
  // };


  // const openai = new OpenAI();
  
  // async function askForTranslation() {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: "Translate the word: 'Hello' to Polish language." }],
  //     model: "gpt-3.5-turbo",
  //   });
  
  //   console.log(completion.choices[0]);
  // }
  

  // const handleTranslate = () => {
  //   axios
  //     .post("http://localhost:8080/v2/translate", {"text":["Hello, world!"],"target_lang":"DE"})
  //     .then((res) => {
  //       setResponse(res.data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //   })
  // }
 
  
  function deeplApi() {
      const requestOptions = {
        headers: { 
          'Authorization': `DeepL-Auth-Key [${import.meta.env.VITE_DEEPL_AUTH_KEY}]`,
          'Content-Type': 'application/json',

        },
        body: { 'text': ["hello world"], 'target_lang': "PL" },
        method: "POST"
      };
      return fetch('https://api-free.deepl.com/v2/translate', requestOptions)
          .then(response => response.json())
          .then(data => setTranslatedWord(data))
  }

  

    useEffect(function(){
    //   const deepl = require('deepl-node'); // przeglądarka nie czyta
    //   const translator = new deepl.Translator(import.meta.env.VITE_DEEPL_AUTH_KEY);

    //   (async () => {
    //       const result = await translator.translateText('Hello, world!', null, 'fr');
    //       console.log(result.text); // Bonjour, le monde !
    //   })();
    deeplApi()
    }, [])

    return (
    <>
      <div className={props.visible ? 'translation' : 'none'}>
        <div className={'xmark'} ></div>
            <p>Wybrane słowo: {props.wordToTranslate}</p> <br></br>
            <p>Znaczenie: {translatedWord}</p>
        </div>
    </>
  )
}