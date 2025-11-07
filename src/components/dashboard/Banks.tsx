"use client"
import { useGetBanks } from "@/services/banks/hooks";
import Link from "next/link";
import BiArrowLeft from "../icons/BiArrowLeft";

export default function Banks() {
    const {data: banks, loading} = useGetBanks()
    const totalBalance = banks.reduce((sum, bank) => sum + bank.balance, 0);

    return (
        <>
            {loading ? <div className="p-3 px-5">Loading</div>
                :(<>
                    <div className="Balance">
                        <div>کل موجودی</div>
                        <div className="En">{totalBalance.toLocaleString()}</div>
                    </div>
                    {banks.map(item => (
                        <Link href={`/application/home/${item.id}`} className="Item" key={item.id}>
                            <div className="Name">{item.bankName}</div>
                            <div className="En">{item.balance.toLocaleString()}</div>
                            <BiArrowLeft size={16} className="bi bi-arrow-left"/>
                        </Link>
                    ))}
                    <Link href="/application/home/new-bank" className="Btn Btn-Black m-0! mb-2!">صندوق جدید</Link>
                </>)
            }
        </>
    )
}
