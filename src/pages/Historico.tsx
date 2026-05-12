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

                    <div className="flex-1 p-4 lg:p-8 flex flex-col gap-4 overflow-y-auto">
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
                    </div>
                </div>
            </main>
        </div>
    );
}
