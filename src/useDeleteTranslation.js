import { deleteDoc, doc } from "firebase/firestore"
import { db } from "./firebase"


export const useDeleteTranslation = (idToDelete) => {
    //const { docID } = useGetTranslation()
        const docID = ''
        const deleteTranslation = async () => {
            console.log("usuwamy")
            await deleteDoc(doc(db, 'translations', idToDelete))
        }

    return { deleteTranslation }

}