import { useState } from "react";
import "./StoryList.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBarsStaggered, faPlus, faX } from '@fortawesome/free-solid-svg-icons'

import { useGetStory } from "../hooks/useGetStory";
import { useDeleteStory } from "../hooks/useDeleteStory";

export default function StoryList(props) {
    
    const [isVisible, setVisible] = useState(false)
    const [ idToDelete, setIdToDelete ] = useState('')

    const { storylist } = useGetStory()
    const { deleteStory } = useDeleteStory(idToDelete ? idToDelete : null)

    function toggleVisible() {
        setVisible(prevState => !prevState)
    }

    const handleId = () => {
        deleteStory(idToDelete)
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
                        <div className="line"></div>
                    {storylist.map((storylist, i) => {
                        return (
                            <div className="story-title" key={i} onMouseEnter={() => setIdToDelete(storylist.id)} onClick={() => props.selectedStory({
                                _id: storylist._id,
                                title: storylist.storytitle,
                                author: storylist.author,
                                story: storylist.story,
                                moral: storylist.moral
                            })} 
                            >

                                <span>{storylist.storytitle}</span>
                                <FontAwesomeIcon icon={faX} className="delete-story" onClick={handleId}/>
                            </div>
                        )
                    })}
                    </div>) 
                : null}  
        </>
    )
}