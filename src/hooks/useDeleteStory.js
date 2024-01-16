import { deleteDoc, doc } from "firebase/firestore"
import { db } from "./firebase"


export const useDeleteStory = (idToDelete) => {
        const deleteStory = async () => {
            await deleteDoc(doc(db, 'storylist', idToDelete))
        }
    return { deleteStory }
}