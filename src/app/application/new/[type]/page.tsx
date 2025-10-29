"use client"

import { useParams } from "next/navigation";
import { BsArrowRightCircle } from "react-icons/bs";

export default function Page() {
    const params = useParams();
    const type = params.type?.toString() || "";
    const titles: Record<string, string> = {
        deposit: "واریز به حساب",
        withdraw: "برداشت از حساب",
        debtor: "ثبت بدهکار",
        creditor: "ثبت بستانکار"
    };
    const title = titles[type] || "ثبت جدید";

    return (
        <div className="Container">
                <a href="/application" className="Titr">
                    <BsArrowRightCircle size={18}/>
                    <div>{title}</div>
                </a>
                <form className="Form">
                    <div className="Form-Item">
                        <label htmlFor="">مبلغ</label>
                        <input type="text" className="En"/>
                    </div>
                    <div className="Form-Item">
                        <label htmlFor="">بانک / صندوق</label>
                        <input type="text"/>
                    </div>
                    <div className="Form-Item">
                        <label htmlFor="">بابت</label>
                        <input type="text"/>
                    </div>
                    <div className="Form-Item">
                        <label htmlFor="">توضیحات</label>
                        <input type="text"/>
                    </div>
                    <div className="text-end Form-Item">
                        <button className="Btn Btn-Black m-0 mt-4">ذخیره</button>
                    </div>
                </form>
            </div>
    )
}
