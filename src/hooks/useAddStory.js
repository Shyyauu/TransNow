import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"
import { useGetUserInfo } from "./useGetUserInfo"


export const useAddStory = () => {
    const { userID } = useGetUserInfo()
    const storyCollectionRef = collection(db, 'storylist')

    const addStory = async ({ storytitle, author, story, moral }) => {
        await addDoc(storyCollectionRef, {
            userID,
            storytitle,
            author,
            story,
            moral,   
            createdAt: serverTimestamp()
        })
    }
    return { addStory }
}