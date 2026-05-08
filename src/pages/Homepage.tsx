import Navbar from "../components/Navbar";
import CardAvaliacoes from "../components/CardAvaliacoes";
import CardDashboard from "../components/CardDashboard";


export default function Homepage() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:z-auto">
                <Navbar index={0} />
            </div>
                    <div>
                        <CardDashboard texto="Atletas" quantidade={5}></CardDashboard>
                        <CardDashboard texto="Avaliacoes" quantidade={8}></CardDashboard>
                    </div>
            <CardAvaliacoes
                avaliacoes={[
                    {
                        nome: "Diego Piol",
                        data: new Date("2026-05-01"),
                        sudorese: 2.1,
                    },
                    {
                        nome: "Lucca Rodrigues",
                        data: new Date("2026-05-01"),
                        sudorese: 1.8,
                    },
                    {
                        nome: "Caíque Frassão",
                        data: new Date("2026-05-01"),
                        sudorese: 2.4,
                    },
                ]}
            />
        </div>
    );
}
