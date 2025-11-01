import { IPeople } from "@/types/people";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default async function page() {
    const result = await fetch(`http://localhost:8008/contacts`)
    const people:IPeople[] = await result.json()

    return (
        <div className="Container">
            <div className="FlexBetween">
                <div className="Search">
                    <input type="text" placeholder="جستجوی مخاطب"/>
                    <FiSearch size={20}/>
                </div>
                <Link href="/application/contacts/new" className="Btn Btn-Black">جدید</Link>
            </div>
            <div className="Contact">
                {people.map(item => (
                    <Link href={`http://localhost:8080/application/contacts/${item.id}`} className="Item" key={item.id}>
                        <div>{item.name}</div>
                        <div className="En">{item.phone}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
