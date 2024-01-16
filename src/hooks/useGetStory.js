import { useEffect, useState } from "react"
import { query, collection, orderBy, onSnapshot, where } from 'firebase/firestore'
import { db } from './firebase'
import { useGetUserInfo } from "./useGetUserInfo"

export const useGetStory = () => {
    const [storylist, setStorylist] = useState([])
    const storylistCollectionRef = collection(db, 'storylist')
    const { userID } = useGetUserInfo()
    const getStorylist = async() => {
        try {
            const queryStorylist = query(
                storylistCollectionRef,
                where('userID', '==', userID), 
                orderBy('createdAt')
                )

            onSnapshot(queryStorylist, (snapshot) => {

                let docs = []

                snapshot.forEach(doc => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({...data, id})
                });

                setStorylist(docs)
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getStorylist()
    }, [])

    return { storylist }
}