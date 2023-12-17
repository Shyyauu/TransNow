import { useNavigate } from "react-router-dom"
import "./MainSettings.css";
import { auth, provider } from "./firebase"
import { signInWithPopup } from "firebase/auth"


export default function MainSettings({onLanguage}) {

  const navigate = useNavigate()
  
  const singInWithGoogle = async() => {
    const results = await signInWithPopup(auth, provider)
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      isAuth: true
    }
    localStorage.setItem("auth", JSON.stringify(authInfo))
  }

  const toStory = () => {
    if(localStorage.getItem("auth") !== null) {
      navigate('/story')
    } else {
      alert("Login with google :)")
    }
  }

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
      <div className="mainsettings-site">
        <h2>Main Settings</h2>
          <div className="select-bar-wrapper">
            <button className="google" onClick={singInWithGoogle}></button>
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
          <button className="lets-start-btn" onClick={toStory}>Let's start!</button> 
     </div>         
    </>
  );
}