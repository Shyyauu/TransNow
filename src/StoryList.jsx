import { useState } from "react";
import "./StoryList.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'



export default function StoryList() {
    
    const [isVisible, setVisible] = useState(false)

    const stories = [1, 2, 3]

    function toggleVisible() {
        setVisible(prevState => !prevState)
    }

    return (
        <>
            <FontAwesomeIcon icon={isVisible ? faBarsStaggered : faBars} className="story-list-click" onClick={toggleVisible}/>
                {isVisible ? (
                    <div className="story-list">
                        <h3>reached stories</h3>
                    {stories.map((title, i) => {
                        return (
                            <div className="story-title" key={i}>
                                <span>{title}</span>
                            </div>
                        )
                    })}
                    </div>) 
                : null}  
        </>
    )
}