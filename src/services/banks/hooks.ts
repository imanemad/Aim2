import { useEffect, useState } from "react"
import { getBanks } from "./endpoints"
import { IBank } from "./bank"

export const useGetBanks = ()=>{
    const [data, setData] = useState<IBank[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    
    useEffect(()=>{
        async function getData(){
            setLoading(true)
            const data = await getBanks()
            setData(data)
            setLoading(false)
        } 
        getData()
    },[])

    return {data, loading}
}