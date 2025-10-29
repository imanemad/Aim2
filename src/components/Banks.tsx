import { IBank } from "@/types/bank";
import { BsArrowLeft } from "react-icons/bs";

export default async function Banks() {
    const result= await fetch(`http://localhost:8008/banks`)
    const banksData:IBank[] = await result.json()
    return (
        <>
            {banksData.map(item => (
                <a href="" className="Item" key={item.id}>
                    <div className="Name">{item.bankName}</div>
                    <div className="En">{item.balance.toLocaleString()}</div>
                    <BsArrowLeft size={16} className="bi bi-arrow-left"/>
                </a>
            ))}
        </>
    )
}
