import { baseBackendURL } from "@/lib/config";
import { ICategory } from "@/types/category";
import { ITransactionList } from "@/types/transactionList";
import moment from "moment-jalaali";
import { BsFillDashCircleFill, BsFillPlusCircleFill } from "react-icons/bs";
import { FaCaretLeft } from "react-icons/fa";

export default async function page() {
    const userId = 1;

    const result = await fetch(`${baseBackendURL}/transactions`)
    const transactions:ITransactionList[] = await result.json()

    const resultCategory = await fetch(`${baseBackendURL}/categories?userId=${userId}`);
    const categories:ICategory[] = await resultCategory.json()

    return (
        <div className="Container">
            <div className="FlexBetween">
                <div className="Search">
                    <input type="text" placeholder="جستجوی تراکنش"/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </div>
                <button className="Btn Btn-Black text-nowrap">
                    فیلتر تراکنش ها
                </button>
            </div>
            <div className="List">
                {transactions.map(item => {
                    const category = categories.find(c => c.id == item.categoryId);
                    return(
                        <div className="Item" key={item.id}>
                            <div className="FlexBetween">
                                <div className="Title">
                                    {category ? category.name : "بدون دسته"}
                                </div>
                                <FaCaretLeft size={20} />
                            </div>
                            <div className="FlexBetween mt-3">
                                <div className="FlexG8">
                                    {item.type === "deposit" 
                                        ? <BsFillPlusCircleFill className="Plus" size={15} /> 
                                        : <BsFillDashCircleFill className="Dash" size={15} />
                                    }
                                    <small className="En">{item.amount.toLocaleString()}</small>
                                </div>
                                <small className="En">{moment(item.date).format('jYYYY/jMM/jDD')}</small>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
