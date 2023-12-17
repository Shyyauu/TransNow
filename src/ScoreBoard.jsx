import { useState } from "react";
import "./ScoreBoard.css";
import { useGetTranslation } from "./useGetTranslation";
import { useDeleteTranslation } from "./useDeleteTranslation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faX } from '@fortawesome/free-solid-svg-icons'



export default function ScoreBoard() {
    
    const [ isVisible, setVisible ] = useState(false)
    const { translations } = useGetTranslation()
    const [ strikethrough, setStrikethrough ] = useState('')
    const [ opacity, setOpacity ] = useState('1')
    const [ idx, setIdx ] = useState('')
    const [ idToDelete, setIdToDelete ] = useState('')
    const { deleteTranslation } = useDeleteTranslation(idToDelete ? idToDelete : null)


    const handleId = () => {
        deleteTranslation(idToDelete)
    }

    const handleStrike = () => {
        setStrikethrough('line-through')
        setOpacity('0.5')
    }

    const handleStrikeOff = () => {
        setIdx('')
        setStrikethrough('')
        setOpacity('1')
    }

    function toggleVisible() {
        setVisible(prevState => !prevState)
    }
    

    return (
        <>
            <FontAwesomeIcon icon={isVisible ? faBookOpen : faBook} className="score-board-click" onClick={toggleVisible}/>
                {isVisible ? (
                    <div className="score-board">
                        <h3>notebook</h3>
                    {translations.map((savedWord, i) => {
                        return (
                            <div className={"saved-word"} key={i} onMouseEnter={() => setIdToDelete(savedWord.id)} onMouseOver={() => setIdx(i)}>
                                <span 
                                    style={{
                                        textDecoration: i === idx ? strikethrough : 'none',
                                        opacity: i === idx ? opacity : 'none'
                                    }}
                                >{savedWord.word} - {savedWord.meaning}</span>
                                <FontAwesomeIcon icon={faX} 
                                 className={"delete-mark"}
                                 onMouseEnter={handleStrike} 
                                 onMouseLeave={handleStrikeOff}
                                 onClick={handleId}/>
                            </div>
                        )
                    })}
                    </div>) 
                : null}  
        </>
    )
}