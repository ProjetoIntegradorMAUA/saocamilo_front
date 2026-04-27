import './App.css'
import Topbar from './components/Topbar'
import { Users } from "./mock/users";
export default function App() {
    return (
        <>
            <Topbar foto={Users.user1.foto} titulo='Configurações' />
        </>
    )
}
