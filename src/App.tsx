import './App.css'
import CardDashboard from '../components/CardDashboard/CardDashboard'
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";

export default function App() {

    return (
        <>
            <CardDashboard texto='Atletas' quantidade={5} icone={<FaRegUserCircle />} cor="text-blue-400"  /> 
                
          
            <CardDashboard texto='Avaliações' quantidade={5} icone={<IoIosTimer />} cor="text-green-400" /> 
                
      
        </>
    )
}
