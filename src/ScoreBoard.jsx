import { useState } from "react";
import "./ScoreBoard.css";

export default function ScoreBoard(props) {
    
    const [isVisible, setVisible] = useState(false)
    const savedWord = props.savedWord

    console.log('visible', ', objekt przeszedł do scoreboard: ', savedWord)
    
    function toggleVisible() {
        setVisible(prevState => !prevState)
    }

    return (
        <>
            <button className="score-board-click" onClick={toggleVisible}></button>
                {isVisible ? (
                    <div className="score-board">
                        <h3>notebook</h3>
                    {savedWord.map((savedWord, i) => {
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