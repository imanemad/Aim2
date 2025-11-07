import BiCartLeftFill from "@/components/icons/BiCartLeftFill";
import BiDashCircleFill from "@/components/icons/BiDashCircleFill";
import BiPlusCircleFill from "@/components/icons/BiPlusCircleFill";
import BiSearch from "@/components/icons/BiSearch";
import { baseBackendURL } from "@/lib/config";
import { ICategory } from "@/types/category";
import { ITransactionList } from "@/types/transactionList";
import moment from "moment-jalaali";

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
                    <BiSearch size={19}/>
                </div>
                <button className="Btn Btn-Black">
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
                                <BiCartLeftFill />
                            </div>
                            <div className="FlexBetween mt-3">
                                <div className="FlexG8">
                                    {item.type === "deposit" 
                                        ? <BiPlusCircleFill className="Plus" size={15} /> 
                                        : <BiDashCircleFill className="Dash" size={15} />
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
