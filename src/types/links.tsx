import { JSX } from "react"
import { BsListNested } from "react-icons/bs";
import { GoPeople, GoPlusCircle } from "react-icons/go";
import { RiHomeLine } from "react-icons/ri";


interface LinkTypes{
    href: string,
    title: string,
    icon?: JSX.Element
}

export const links: LinkTypes[] = [
    {
        href: "/application",
        title: "Add",
        icon: <GoPlusCircle size={21}/>
    },
    {
        href: "/application/contacts",
        title: "contacts",
        icon: <GoPeople  size={20}/>
    },
    {
        href: "/application/list",
        title: "list",
        icon: <BsListNested size={20}/>
    },
    {
        href: "/application/home",
        title: "Home",
        icon: <RiHomeLine size={18}/>
    },
];