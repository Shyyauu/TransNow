import { useState } from "react";
import "./ScoreBoard.css";
import { useGetTranslation } from "../hooks/useGetTranslation";
import { useDeleteTranslation } from "../hooks/useDeleteTranslation";
import { Margin, usePDF, Resolution } from "react-to-pdf";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faX, faFilePdf } from '@fortawesome/free-solid-svg-icons'



export default function ScoreBoard() {
    
    const [ isVisible, setVisible ] = useState(false)
    const { translations } = useGetTranslation()
    const [ strikethrough, setStrikethrough ] = useState('')
    const [ opacity, setOpacity ] = useState('1')
    const [ idx, setIdx ] = useState('')
    const [ idToDelete, setIdToDelete ] = useState('')
    const [ fullView, setFullView ] = useState('')
    const { deleteTranslation } = useDeleteTranslation(idToDelete ? idToDelete : null)


    const { toPDF, targetRef } = usePDF({
        filename: 'mynotes.pdf',
        resolution: Resolution.HIGH
      });

    const handleId = () => {
        deleteTranslation(idToDelete)
    }
    
    const handleFullView = () => {
        setFullView(' full-view')
    }

    const handleStandardView = () => {
        setFullView('')
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
                    <div className={"score-board" + fullView} ref={targetRef} >
                        <h3 onMouseOut={handleStandardView}>notebook</h3>
                        <FontAwesomeIcon icon={faFilePdf} className="pdf-icon" onClick={toPDF} onMouseEnter={handleFullView}/>
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
                                 className='delete-mark'
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