import Navbar from "../components/Navbar";
import Botao from "../components/Botao";
import CardAtleta from "../components/CardAtleta";
import { IoAddOutline } from "react-icons/io5";

export default function Atletas() {
    return (
        <div className="flex">
            <Navbar index={1} />

            <div className="flex-1 p-10">
                
                <div className="relative flex items-center mb-10">
            
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <input
                            type="text"
                            placeholder="Pesquise por um atleta..."
                            className="w-[700px] h-[50px] border border-gray-300 rounded-2xl px-5 text-lg outline-none"
                        />
                    </div>

                    <div className="ml-auto">
                        <Botao
                            texto="Adicionar Atleta"
                            icone={<IoAddOutline />}
                        />
                    </div>
                </div>

                <div className="ml-[260px] p-10">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                        <CardAtleta nome="Lucca Rodrigues" />
                        <CardAtleta nome="Caique Frassão" />
                        <CardAtleta nome="Diego Piol" />
                        <CardAtleta nome="Paulo Perasso" />
                        <CardAtleta nome="Enzo Chagas" />
                        <CardAtleta nome="Rafael Maistro" />
                    </div>
                </div>
            </div>
        </div>
    );
}

