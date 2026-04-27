import './App.css'
import CardDashboard from '../components/CardDashboard/CardDashboard'
import { FaUserLarge } from "react-icons/fa6";

export default function App() {

    return (
        <>
            <CardDashboard texto='Atletas' quantidade={5} icone={<FaUserLarge />} > 
                
            </CardDashboard>
        </>
    )
}
