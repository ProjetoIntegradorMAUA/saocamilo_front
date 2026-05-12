import { useLocation, useNavigate } from "react-router-dom";
import { icons } from "../utils/IconsJson";

interface ITopbar {
    titulo: string;
    foto: string;
}

export default function Topbar({ titulo, foto }: ITopbar) {

    const navigate = useNavigate()

    const local = useLocation()

    function fnavigate(rota: string) {
        setTimeout(() => {
            navigate("/" + rota)
        }, 500)
    }

    return (
        <div className="w-full bg-gray-50 flex gap-3  items-center ps-5 pe-5">
            <button className="cursor-pointer text-2xl  p-2" onClick={() => {
                if (local.pathname != "/homepage") fnavigate("homepage")
            }}>{icons.seta_esquerda}</button>
            <div className="w-11/12 ps-15 font-semibold">
                {titulo}
            </div>
            <div className="flex gap-10 ">
                <button className="cursor-pointer text-3xl  p-2">{icons.sino}</button>
                <button className="cursor-pointer"><img className="min-w-10 w-12 max-w-20 p-1" src={foto} alt="Foto de usuario" style={{ borderRadius: 100 }} /></button>
            </div>
        </div>
    )
}