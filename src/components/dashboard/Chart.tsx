import { GoChevronDown } from "react-icons/go";

export default function Chart() {
    return (
        <div className="Chart">
            <div className="FlexBetween">
                <div>نمودار برداشت</div>
                <button className="FlexG8">
                    <small>1404.12</small>
                    <GoChevronDown size={16}/>
                </button>
            </div>
            <div className="Chart-Container">
                <div className="Item" style={{height: "60%"}}>
                    <span className="Detail">
                        <span>04.12</span>
                        <span>1.500.000</span>
                    </span>
                </div>
                <div className="Item" style={{height: "40%;"}}></div>
                <div className="Item" style={{height: "15%;"}}></div>
                <div className="Item" style={{height: "95%;"}}></div>
                <div className="Item" style={{height: "5%;"}}></div>
                <div className="Item" style={{height: "75%;"}}></div>
                <div className="Item" style={{height: "45%;"}}></div>
                <div className="Item" style={{height: "75%;"}}></div>
                <div className="Item" style={{height: "35%;"}}></div>
                <div className="Item" style={{height: "5%;"}}></div>
                <div className="Item" style={{height: "25%;"}}></div>
                <div className="Item" style={{height: "60%;"}}></div>
                <div className="Item" style={{height: "20%;"}}></div>
                <div className="Item" style={{height: "80%;"}}></div>
                <div className="Item" style={{height: "80%;"}}></div>
                <div className="Item" style={{height: "18%;"}}></div>
                <div className="Item" style={{height: "100%;"}}></div>
                <div className="Item" style={{height: "5%;"}}></div>
                <div className="Item" style={{height: "70%;"}}></div>
                <div className="Item" style={{height: "100%;"}}></div>
                <div className="Item" style={{height: "80%;"}}></div>
                <div className="Item" style={{height: "18%;"}}></div>
                <div className="Item" style={{height: "100%;"}}></div>
                <div className="Item" style={{height: "5%;"}}></div>
                <div className="Item" style={{height: "70%;"}}></div>
                <div className="Item" style={{height: "20%;"}}></div>
            </div>
        </div>
    )
}
