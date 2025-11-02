"use client"

import FormHeader from "@/components/Form/FormHeader";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const type = params.type?.toString() || "";
    const titles: Record<string, string> = {
        deposit: "واریز به حساب",
        withdraw: "برداشت از حساب",
    };
    const title = titles[type];

    return (
        <div className="Container">
            <FormHeader title={title}/>
            
            <form className="Form">
                <div className="Form-Item">
                    <label htmlFor="">بابت</label>
                    <input type="text"/>
                </div>
                <div className="Form-Item">
                    <label htmlFor="">مبلغ</label>
                    <input type="text" className="En"/>
                </div>
                <div className="Form-Item">
                    <label htmlFor="">بانک / صندوق</label>
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
