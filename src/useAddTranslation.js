import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export const useAddTranslation = () => {
    const translationCollectionRef = collection(db, 'translations')

    const addTranslation = async ({word, meaning}) => {
        await addDoc(translationCollectionRef, {
            word,
            meaning,
            createdAt: serverTimestamp()
        })
    }
    return { addTranslation }
}