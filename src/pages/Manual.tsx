import Detectacao from "../components/Detectacao";
import EscalaUrina from "../components/Escala";
import Navbar from "../components/Navbar";
import Padronizacao from "../components/Padronizacao";

export default function Manual() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex">
            <Navbar index={3} />

            <main className="flex-1 lg:ml-60 px-3 sm:px-6 py-2 sm:py-6 flex justify-center">
                <div className="w-full max-w-350 bg-[#e9e9ed] rounded-3xl px-2 sm:px-6 py-2 sm:py-6 mx-2 sm:mx-4 transform scale-85 sm:scale-95 md:scale-100 origin-top">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 lg:gap-10 items-start">
                        
                        <div className="flex justify-center">
                            <div className="w-full">
                                <Padronizacao />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="w-full">
                                <Detectacao />
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 sm:mt-8 flex justify-center">
                        <div className="w-full">
                            <EscalaUrina />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}