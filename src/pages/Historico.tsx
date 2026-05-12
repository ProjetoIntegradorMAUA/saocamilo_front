import CardHistorico from "../components/CardHistorico";
import ComboBox from "../components/Combobox";
import Navbar from "../components/Navbar";

export default function Historico() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={4} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-[1800px] min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-6">

                    <ComboBox texto="Filtro" placeholder="" options={["Hoje", "Últimos 7 dias", "Últimos 30 dias",]} ></ComboBox>
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
