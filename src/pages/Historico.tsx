import CardHistorico from "../components/CardHistorico";
import Navbar from "../components/Navbar";

export default function Historico() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={4} />
            </div>

            <main className="flex-1 p-4 lg:p-8 flex flex-col gap-4 overflow-y-auto">
                
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

            </main>
        </div>
    );
}