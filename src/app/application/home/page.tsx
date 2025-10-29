import Link from "next/link";
import { IoPower } from "react-icons/io5";

export default function page() {
    return (
        <div className='Container'>
            <div className="Home">
                    <div className="Profile">
                        <div className="FlexG8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                            <div className="Name">iman.emadiie@gmail.com</div>
                        </div>
                        <Link href="/">
                            <IoPower size={18}/>
                        </Link>
                    </div>

                    {/* <div className="Loans">
                        <div className="Debts">
                            <small>مبالغ دریافتنی</small>
                            <div className="En">0</div>
                        </div>
                        <div className="Debts">
                            <small>مبالغ پرداختنی</small>
                            <div className="En">0</div>
                        </div>
                    </div> */}

                    <div className="Banks ">
                        <div className="Balance">
                            <div>کل موجودی</div>
                            <div className="En">1.450.600</div>
                        </div>
                        {/* <a href="" className="Item">
                            <div className="Name">بانک شهر</div>
                            <div className="En">450.000</div>
                            <BsArrowLeft size={16} className="bi bi-arrow-left"/>
                        </a>
                        <a href="" className="Item">
                            <div className="Name">نقد</div>
                            <div className="En">450.000</div>
                            <BsArrowLeft size={16} className="bi bi-arrow-left"/>
                        </a> */}
                    </div>
                    {/* <Chart/> */}
                </div>
        </div>
    )
}
