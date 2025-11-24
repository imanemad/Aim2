"use client";
import BiCartLeftFill from "@/components/icons/BiCartLeftFill";
import BiDashCircleFill from "@/components/icons/BiDashCircleFill";
import BiPlusCircleFill from "@/components/icons/BiPlusCircleFill";
import BiSearch from "@/components/icons/BiSearch";
import moment from "moment-jalaali";
import toast from "react-hot-toast";
import { useGetTransactionsQuery } from "@/services/transactions/hooks";

export default function Transactions() {
    const { 
        data: transactions,
        isLoading,      
        isError,        
        error           
    } = useGetTransactionsQuery();

    if (isError) {
        toast.error(error.message); 
        return <div className="ErrorState">خطا در بارگذاری مخاطبین.</div>
    }

    return (
        <div className="Container">
            <div className="FlexBetween">
                <div className="Search">
                    <input type="text" placeholder="جستجوی تراکنش"/>
                    <BiSearch size={19}/>
                </div>
                <button className="Btn Btn-Black">
                    فیلتر تراکنش ها
                </button>
            </div>
            <div className="List">
                {isLoading ? (<div className="p-2">Loading...</div>) : (
                    <>
                        {transactions?.map(item => {
                            return(
                                <div className="Item" key={item.id}>
                                    <div className="FlexBetween">
                                        <div className="Title">
                                            {item.categoryName}
                                        </div>
                                        <div className="flex space-x-1">
                                            <div className="FlexG8">
                                                {item.type === "deposit" 
                                                    ? <BiPlusCircleFill className="Plus" size={15} /> 
                                                    : <BiDashCircleFill className="Dash" size={15} />
                                                }
                                                <small className="En">{item.amount.toLocaleString()}</small>
                                            </div>
                                            <BiCartLeftFill />
                                        </div>
                                    </div>
                                    <div className="FlexBetween mt-3">
                                        <small>
                                            {`مانده ${item.bankName} ${item.lastBalanceBank.toLocaleString()}`}
                                        </small>
                                        <small className="En">{moment(item.date).format('jYYYY/jMM/jDD')}</small>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
        </div>
    )
}
