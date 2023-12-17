import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"
import { useGetUserInfo } from "./useGetUserInfo"

export const useAddTranslation = () => {
    const translationCollectionRef = collection(db, 'translations')
    const { userID } = useGetUserInfo()

    const addTranslation = async ({ word, meaning}) => {
        await addDoc(translationCollectionRef, {
            userID,
            word,
            meaning,
            createdAt: serverTimestamp()
        })
    }
    return { addTranslation }
}