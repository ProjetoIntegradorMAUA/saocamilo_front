import CardHistorico from "../components/CardHistorico";
import ComboBox from "../components/Combobox";
import Navbar from "../components/Navbar";
import { icons } from "../utils/IconsJson";

export default function Historico() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={4} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-[1800px] min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-semibold text-black">
                                Histórico de Sessões
                            </h1>

                            <p className="text-gray-500 mt-2 text-sm sm:text-base">
                                Acompanhe o desempenho dos atletas em cada
                                sessão realizada.
                            </p>
                        </div>
                        <ComboBox
                            texto="Filtro"
                            placeholder="Hoje"
                            options={["Últimos 7 dias", "Últimos 30 dias"]}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white border border-gray-200 rounded-3xl h-40 p-6 flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-3xl">
                                {icons.pessoas}
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Sessões Realizadas
                                </p>

                                <h2 className="text-4xl font-semibold text-black">
                                    24
                                </h2>

                                <span className="text-gray-400 text-sm">
                                    no período
                                </span>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-3xl h-40 p-6 flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500  text-3xl">
                                {icons.relogio}
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Tempo Total
                                </p>

                                <h2 className="text-4xl font-semibold text-black">
                                    36h
                                </h2>

                                <span className="text-gray-400 text-sm">
                                    de atividades
                                </span>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-3xl h-40 p-6 flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500  text-3xl">
                                {icons.setinhaCrescimento}
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Melhor Variação de Massa
                                </p>

                                <h2 className="text-4xl font-semibold text-black">
                                    +2,4%
                                </h2>

                                <span className="text-gray-400 text-sm">
                                    no período
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-3 w-full max-w-[500px]">
                        <span className="text-gray-400 text-2xl">
                            {icons.lupa}
                        </span>

                        <input
                            type="text"
                            placeholder="Buscar atleta ou sessão..."
                            className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                        />
                    </div>
                    <div className="w-full rounded-2xl border border-gray-200 overflow-hidden bg-white">
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1.2fr] items-center px-6 py-4 bg-[#fafafa] border-b border-gray-200 text-sm font-semibold text-gray-500">
                            <p>Atleta</p>
                            <p>Horário</p>
                            <p>Modalidade</p>
                            <p>Duração</p>
                            <p>Sudorese</p>
                            <p>Var. Massa</p>
                            <p>Status</p>
                            <p>Ações</p>
                        </div>

                        <CardHistorico
                            nome="Lucca Frassao"
                            horarioAtual="14:30"
                            modalidade="Futebol"
                            duracao="1h 20min"
                            sudorese={1.8}
                            massa={67.7}
                        />

                        <CardHistorico
                            nome="Caique Frassao"
                            horarioAtual="16:10"
                            modalidade="Basquete"
                            duracao="2h"
                            sudorese={2.1}
                            massa={50.3}
                        />

                        <CardHistorico
                            nome="Diego Piol"
                            horarioAtual="09:45"
                            modalidade="Jiu-Jitsu"
                            duracao="1hr"
                            sudorese={1.2}
                            massa={90.9}
                        />

                        <div className="bg-[#fafafa] border-t border-gray-200 px-6 py-5 flex items-center justify-between">
                            <p className="text-sm text-gray-500 font-medium">
                                Mostrando 1 a 4 de 10 sessões
                            </p>

                            <div className="flex items-center gap-3">
                                <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100     transition">
                                    ←
                                </button>

                                <button className="w-10 h-10 rounded-xl bg-red-500 text-white font-semibold flex items-center justify-center shadow-sm">
                                    1
                                </button>

                                <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium flex items-center justify-center hover:bg-gray-100 transition">
                                    2
                                </button>

                                <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium flex items-center justify-center hover:bg-gray-100 transition">
                                    3
                                </button>

                                <span className="px-1 text-gray-400 font-medium">
                                    ...
                                </span>

                                <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium flex items-center justify-center hover:bg-gray-100 transition">
                                    6
                                </button>

                                <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
