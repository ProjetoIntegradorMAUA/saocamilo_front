import "./App.css"
import Confirmacao from "./components/Confirmacao";

export default function App() {
    return (
        <>
          <Confirmacao texto="Tem certeza que deseja excluir esse atleta?" 
          textob1="Não" 
          textob2="Sim"></Confirmacao>  
        </>
    );
}



