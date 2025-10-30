import { IBank } from "@/types/bank";
import { BsArrowLeft } from "react-icons/bs";

export default async function Banks() {
    const result= await fetch(`http://localhost:8008/banks`)
    const banksData:IBank[] = await result.json()

    const totalBalance = banksData.reduce((sum, bank) => sum + bank.balance, 0);

    return (
        <>
            <div className="Balance">
                <div>کل موجودی</div>
                <div className="En">{totalBalance.toLocaleString()}</div>
            </div>
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
