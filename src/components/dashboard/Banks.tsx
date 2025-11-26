"use client"
import Link from "next/link";
import toast from "react-hot-toast";
import { useGetBanksQuery } from "@/services/banks/hooks";

export default function Banks() {
    const { 
    data: banks,
    isLoading,      
    isError,        
    error           
    } = useGetBanksQuery();

    // ۳. مدیریت صریح خطا
    if (isError) {
        toast.error(error.message); 
        return <div className="ErrorState">خطا در بارگذاری مخاطبین.</div>
    }
    const totalBalance = banks?.reduce((sum, bank) => sum + bank.balance, 0);

    return (
        <>
            {isLoading ? <div className="p-3 px-5">Loading</div>
                :(<>
                    <div className="Balance">
                        <div>کل موجودی</div>
                        <div className="En">{totalBalance?.toLocaleString()}</div>
                    </div>
                    {banks?.map(item => (
                        <Link href={`/application/dashboard/${item.id}`} className="Item" key={item.id}>
                            <div className="Name">{item.bankName}</div>
                            <div className="En">{item.balance.toLocaleString()}</div>
                        </Link>
                    ))}
                    <Link href="/application/dashboard/new-bank" className="Btn Btn-Black m-0! mb-2! mx-2!">صندوق جدید</Link>
                </>)
            }
        </>
    )
}
