import { useState } from "react";
import "./StoryList.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBarsStaggered, faPlus } from '@fortawesome/free-solid-svg-icons'

import { useGetStory } from "./useGetStory";

export default function StoryList(props) {
    
    const [isVisible, setVisible] = useState(false)
    const { storylist } = useGetStory()

    function toggleVisible() {
        setVisible(prevState => !prevState)
    }

    const saveStoryToFirebase = (e) => {
        e.preventDefault()
        props.addStoryToFirebase(prevState => !prevState)
    }

    return (
        <>
            <FontAwesomeIcon icon={isVisible ? faBarsStaggered : faBars} className="story-list-click" onClick={toggleVisible}/>
                {isVisible ? (
                    <div className="story-list">
                        <h3>reached stories</h3>
                        <div className="add-new-story">
                            <span>Add current story to list</span>
                            <FontAwesomeIcon icon={faPlus} className="plus" onClick={saveStoryToFirebase}/>
                        </div>
                    {storylist.map((storylist, i) => {
                        return (
                            <div className="story-title" key={i} onClick={() => props.selectedStory({
                                _id: storylist._id,
                                title: storylist.storytitle,
                                author: storylist.author,
                                story: storylist.story,
                                moral: storylist.moral
                            })}>
                                <span>{storylist.storytitle}</span>
                            </div>
                        )
                    })}
                    </div>) 
                : null}  
        </>
    )
}