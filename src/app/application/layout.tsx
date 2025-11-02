import NavApp from "@/components/NavApp";
import Routs from "@/components/Routs";
import { Toaster } from "react-hot-toast";


export default function Layout({children}:IChildrenProps) {
    return (
        <div className="App">
            <NavApp/>
                <main className="App-Main">
                    {children}
                </main>
            <Routs/>
            <Toaster position="top-left" containerStyle={{top: 60}}/>
        </div>
    )
}