import BiDownload from "@/components/icons/BiDownload";
import BiUpload from "@/components/icons/BiUpload";
import { JSX } from "react"

interface LinkTypes{
    url:string,
    title: string,
    icon?: JSX.Element
}

export const linksAddItem: LinkTypes[] = [
    {
        url: "deposit",
        title: "واریز به حساب",
        icon: <BiDownload size={18}/>
    },
    {
        url: "withdraw",
        title: "برداشت از حساب",
        icon: <BiUpload size={17}/>
    },
];