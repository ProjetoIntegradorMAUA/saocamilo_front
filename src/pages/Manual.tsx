import Detectacao from "../components/Detectacao";
import EscalaUrina from "../components/Escala";
import Navbar from "../components/Navbar";
import Padronizacao from "../components/Padronizacao";
import Topbar from "../components/Topbar";

export default function Manual() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={3} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-[1800px] min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-6">

                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Manual" />
                    </div>

                    <div className="flex flex-col gap-6 mt-2 justify-center items-center xl:items-stretch">
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
                </div>
            </main>
        </div>
    );
}