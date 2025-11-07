import NavApp from "@/components/layout/NavApp";
import Routs from "@/components/layout/Routs";
import { ApplicationProviders } from "./providers";
import { LoadingProvider } from "@/context/LoadingContext";

export default function Layout({children}:IChildrenProps) {
    return (
        <ApplicationProviders>
            <LoadingProvider>
                <div className="App">
                    <NavApp/>
                        <main className="App-Main">
                            {children}
                        </main>
                    <Routs/>
                </div>
            </LoadingProvider>
        </ApplicationProviders>
    )
}