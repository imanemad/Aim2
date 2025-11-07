import Banks from "@/components/dashboard/Banks";
import Loans from "@/components/dashboard/Loans";
import BiPerson from "@/components/icons/BiPerson";
import BiPower from "@/components/icons/BiPower";
import Link from "next/link";

export default function page() {
    return (
        <div className='Container'>
            <div className="Home">
                    <div className="Profile">
                        <div className="FlexG8">
                            <BiPerson size={18}/>
                            <div className="mt-0.5">iman@example.com</div>
                        </div>
                        <Link href="/">
                            <BiPower size={18}/>
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
