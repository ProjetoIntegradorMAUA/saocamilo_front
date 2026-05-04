import "./App.css"
import CardDashboard from "./components/CardDashboard";


export default function App() {
    return (
        <>
            <CardDashboard quantidade={10} texto="Avaliações" />
            <CardDashboard quantidade={5} texto="Atletas" />
        </>
    );
}



