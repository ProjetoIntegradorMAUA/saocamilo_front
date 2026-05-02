import "./App.css"
import { useState } from "react";
import ComboBox from "./components/ComboBox";
;


export default function App() {
    const [opcao, setOpcao] = useState("");


    return (
        <div className="p-10">
            <ComboBox texto='Manchas de sal na roupa' valor={opcao} onChange={setOpcao} />
        </div>
    );
}



