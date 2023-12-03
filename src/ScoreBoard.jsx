import { useState } from "react";
import "./ScoreBoard.css";
import { useGetTranslation } from "./useGetTranslation";

export default function ScoreBoard(props) {
    
    const [isVisible, setVisible] = useState(false)
    const savedWord = props.savedWord

    const { translations } = useGetTranslation()

    console.log('visible', ', objekt przeszedł do scoreboard: ', translations)
    
    function toggleVisible() {
        setVisible(prevState => !prevState)
    }

    return (
        <>
            <button className="score-board-click" onClick={toggleVisible}></button>
                {isVisible ? (
                    <div className="score-board">
                        <h3>notebook</h3>
                    {translations.map((savedWord, i) => {
                        return (
                            <p className="saved-word" key={i}>
                                <span>{savedWord.word} - {savedWord.meaning}</span>
                            </p>
                        )
                    })}
                    </div>) 
                : null}  
        </>
    )
}