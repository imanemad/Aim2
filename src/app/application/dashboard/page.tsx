import Banks from "@/components/dashboard/Banks";
import Loans from "@/components/dashboard/Loans";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { IoPower } from "react-icons/io5";

export default function page() {
    return (
        <div className='Container'>
            <div className="Home">
                    <div className="Profile">
                        <div className="FlexG8">
                            <BsPerson size={18}/>
                            <div className="mt-0.5">iman@example.com</div>
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
