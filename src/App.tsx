import './App.css'
import CardAvaliacoes from '../components/Avaliacoes/Avaliacoes'
import { FaRegCalendar } from "react-icons/fa";

export default function App() {

    return (
        <>
             <CardAvaliacoes nome='Diego Piol Amancio' data={new Date()} icone={<FaRegCalendar />} sudorese={1.72} /> 
        </>
    )
}
