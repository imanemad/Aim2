import { FiSearch } from "react-icons/fi";

export default function page() {
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
                    <div className="Item">
                        <div>iman emadi</div>
                        <div className="En">09128570012</div>
                    </div>
                </div>
            </div>
    )
}
