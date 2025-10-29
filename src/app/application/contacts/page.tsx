import { IPeople } from "@/types/people";
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
                <button className="Btn Btn-Black">جدید</button>
            </div>
            <div className="Contact">
                {people.map(item => (
                    <div className="Item" key={item.id}>
                        <div>{item.name}</div>
                        <div className="En">{item.phone}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
