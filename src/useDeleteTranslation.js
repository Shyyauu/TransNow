import { deleteDoc, doc } from "firebase/firestore"
import { db } from "./firebase"


export const useDeleteTranslation = (idToDelete) => {
        const deleteTranslation = async () => {
            await deleteDoc(doc(db, 'translations', idToDelete))
        }
    return { deleteTranslation }
}