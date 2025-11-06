import NavApp from "@/components/NavApp";
import Routs from "@/components/Routs";
import { ApplicationProviders } from "./providers";

export default function Layout({children}:IChildrenProps) {
    return (
        <ApplicationProviders>
            <div className="App">
                <NavApp/>
                    <main className="App-Main">
                        {children}
                    </main>
                <Routs/>
            </div>
        </ApplicationProviders>
    )
}