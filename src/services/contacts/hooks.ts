import { useEffect, useState } from "react"
import { IPeople } from "./types"
import { getContacts } from "./endPoints"

export const useGetContacts = () => {
    const [data, setData]=useState<IPeople[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(()=>{
        async function load() {
            setLoading(true)
            const data = await getContacts()
            setData(data)
            setLoading(false)
        }
        load()
    },[])

    return { data, loading }
}