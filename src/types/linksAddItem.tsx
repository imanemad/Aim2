import { JSX } from "react"
import { BsDownload, BsUpload } from "react-icons/bs";

interface LinkTypes{
    url:string,
    title: string,
    icon?: JSX.Element
}

export const linksAddItem: LinkTypes[] = [
    {
        url: "deposit",
        title: "واریز به حساب",
        icon: <BsDownload size={18.5}/>
    },
    {
        url: "withdraw",
        title: "برداشت از حساب",
        icon: <BsUpload size={17}/>
    },
];