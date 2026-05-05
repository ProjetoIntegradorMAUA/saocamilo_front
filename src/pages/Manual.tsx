import Detectacao from "../components/Detectacao";
import EscalaUrina from "../components/Escala";
import Navbar from "../components/Navbar";
import Padronizacao from "../components/Padronizacao";

export default function App() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex">
            <Navbar index={3} />

            <main className="flex-1 lg:ml-60 px- py-6 flex justify-center">
                <div className="w-full max-w-400 bg-#e9e9ed rounded-3xl px-10 py-8">

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">
                        
                        <div className="flex justify-center">
                            <div className="w-full max-w-155">
                                <Padronizacao />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="w-full max-w-155">
                                <Detectacao />
                            </div>
                        </div>

                    </div>

                    <div className="mt-10 flex justify-center">
                        <div className="w-full max-w-287.5">
                            <EscalaUrina />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}