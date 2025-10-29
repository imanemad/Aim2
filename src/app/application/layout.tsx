import NavApp from "@/components/NavApp";
import Routs from "@/components/Routs";


export default function Layout({children}:IChildrenProps) {
    return (
        <div className="App">
            <NavApp/>
                <main className="App-Main">
                    {children}
                </main>
            <Routs/>
        </div>
    )
}