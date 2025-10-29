import { JSX } from "react"
import { BsDownload, BsPersonAdd, BsPersonDash, BsUpload } from "react-icons/bs";

interface LinkTypes{
    url:string,
    title: string,
    icon?: JSX.Element
}

export const linksAddItem: LinkTypes[] = [
    {
        url: "deposit",
        title: "واریز به حساب",
        icon: <BsDownload size={18}/>
    },
    {
        url: "withdraw",
        title: "برداشت از حساب",
        icon: <BsUpload size={17}/>
    },
    {
        url: "debtor",
        title: "ثبت بدهکار",
        icon: <BsPersonAdd size={20}/>
    },
    {
        url: "creditor",
        title: "ثبت بستانکار",
        icon: <BsPersonDash size={20}/>
    },
];