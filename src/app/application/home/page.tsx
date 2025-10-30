import Banks from "@/components/Banks";
import Loans from "@/components/Loans";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { IoPower } from "react-icons/io5";

export default function page() {
    return (
        <div className='Container'>
            <div className="Home">
                    <div className="Profile">
                        <div className="FlexG8">
                            <BsPerson size={17}/>
                            <div className="Name">iman@example.com</div>
                        </div>
                        <Link href="/">
                            <IoPower size={18}/>
                        </Link>
                    </div>

                    <Loans/>

                    <div className="Banks ">
                        
                        <Banks/>
                    </div>
                    {/* <Chart/> */}
                </div>
        </div>
    )
}
