import {Link} from "react-router-dom"
import "./MainSettings.css";

export default function MainSettings({onLanguage}) {
  const handleLanguage = (event) => {
    event.preventDefault();
    const selectedLanguage = event.target.value;
    console.log(selectedLanguage)
    onLanguage(selectedLanguage)
  }

  const options = [
    { value: 'pl', label: 'Polish' },
    { value: 'de', label: 'German' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'ru', label: 'Russian' }
  ]

  return (
    <>
        <h2>Main Settings</h2>
          <div className="select-bar-wrapper">
            <h3>Select language you want to learn.</h3>
            <select className="select-bar" onClick={handleLanguage}>
              {options.map(option => (
                <option 
                  key={option.value} 
                  value={option.value}
                >
                  {option.label}
                </option>
              ))} 
            </select>
          </div>
        <button className="lets-start-btn"><Link to="/story" >Let's start!</Link></button>
    </>
  );
}