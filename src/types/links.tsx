import BiHome from "@/components/icons/BiHome";
import BiListNested from "@/components/icons/BiListNested";
import BiPeople from "@/components/icons/BiPeople";
import BiPlusCircle from "@/components/icons/BiPlusCircle";
import { JSX } from "react"

interface LinkTypes{
    href: string,
    title: string,
    icon?: JSX.Element
}

export const links: LinkTypes[] = [
    {
        href: "/application",
        title: "Add",
        icon: <BiPlusCircle size={19}/>
    },
    {
        href: "/application/contacts",
        title: "contacts",
        icon: <BiPeople  size={20}/>
    },
    {
        href: "/application/list",
        title: "list",
        icon: <BiListNested size={20}/>
    },
    {
        href: "/application/dashboard",
        title: "Home",
        icon: <BiHome size={19}/>
    },
];