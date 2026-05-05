import Detectacao from "../components/Detectacao";
import EscalaUrina from "../components/Escala";
import Navbar from "../components/Navbar";
import Padronizacao from "../components/Padronizacao";

export default function App() {
    return (
        <div className="min-h-screen bg-#f4f4f4 flex">
            <Navbar index={3} />

            <main className="flex-1 lg:ml-60 p-8">
                <div className="bg-[#e9e9ed] rounded-3xl p-8 shadow-sm">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                        <div className=" p-6">
                            <Padronizacao />
                        </div>

                        <div className="p-6">
                            <Detectacao />
                        </div>
                    </div>

                    <div className="p-6">
                        <EscalaUrina />
                    </div>
                </div>
            </main>
        </div>
    );
}