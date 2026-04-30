import "./App.css";
import EscalaUrina from "./components/Escala";
import { GiAlliedStar } from "react-icons/gi";

export default function App() {
    return (
        <>
            <EscalaUrina texto="A" icone={<GiAlliedStar />} />
        </>
    );
}
