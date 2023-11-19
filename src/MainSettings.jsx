import {useState} from "react";
import {Link} from "react-router-dom"
import "./MainSettings.css";

export default function MainSettings() {

  const [Language, setLanguage] = useState("pl");

  const options = [
    { value: 'pl', label: 'Polish' },
    { value: 'de', label: 'German' },
    { value: 'sp', label: 'Spanish' },
    { value: 'ru', label: 'Russian' }
  ]

  function handleSelect(event) {
    setLanguage(event.target.value)
    console.log(event.target.value)
  }

  return (
    <>
        <h1>Main Settings</h1>
          <div className="select-bar-wrapper">
            <h3>Select language you want to learn.</h3>
            <select className="select-bar" onChange={handleSelect}>
              {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))} 
            </select>
          </div>
        <button className="lets-start-btn"><Link to="/story" >Let's start!</Link></button>
    </>
  );
}