import { BsFillDashCircleFill, BsFillPlusCircleFill } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";

export default function page() {
    return (
        <div className="Container">
            <div className="FlexBetween">
                <div className="Search">
                    <input type="text" placeholder="جستجوی تراکنش"/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </div>
                <button className="Btn Btn-Black text-nowrap">
                    انتخاب تاریخ
                </button>
            </div>
            <div className="List">
                <div className="Item">
                    <div className="FlexBetween">
                        <div className="Title">عنوان تراکنش</div>
                        <GoChevronDown size={20} />
                    </div>
                    <div className="FlexBetween mt-3 Opacity">
                        <div className="FlexG8">
                            <small>مانده</small>
                            <small className="En pb-1">45.000</small>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <small className="En">30.000.000</small>
                                <BsFillPlusCircleFill className="Plus"  size={16}/>
                            </div>
                            <small className="En">1404.02.23</small>
                        </div>
                    </div>
                </div>
                <div className="Item">
                    <div className="FlexBetween">
                        <div className="Title">عنوان تراکنش</div>
                        <GoChevronDown size={20} />
                    </div>
                    <div className="FlexBetween mt-3 Opacity">
                        <div className="FlexG8">
                            <small>مانده</small>
                            <small className="En pb-1">45.000</small>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <small className="En">30.000.000</small>
                                <BsFillDashCircleFill className="Dash"  size={16}/>
                            </div>
                            <small className="En">1404.02.23</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
