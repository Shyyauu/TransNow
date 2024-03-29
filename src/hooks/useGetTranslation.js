import { useEffect, useState } from "react"
import { query, collection, orderBy, onSnapshot, where } from 'firebase/firestore'
import { db } from './firebase'
import { useGetUserInfo } from  "./useGetUserInfo"

export const useGetTranslation = () => {
    const [translations, setTranslations] = useState([])
    const translationCollectionRef = collection(db, 'translations')
    const { userID } = useGetUserInfo()
    const getTranslations = async() => {
        try {
            const queryTranslations = query(
                translationCollectionRef,
                where('userID', '==', userID), 
                orderBy('createdAt')
                )

            onSnapshot(queryTranslations, (snapshot) => {

                let docs = []

                snapshot.forEach(doc => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({...data, id})
                });

                setTranslations(docs)
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getTranslations()
    }, [])

    return { translations }
}