import "./App.css";
import Detectacao from "./components/Detectacao";   
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


export default function App() {
    return (
        <>
            <Detectacao texto="A" icone={<IoIosCheckmarkCircleOutline />} />
        </>
    );
}
