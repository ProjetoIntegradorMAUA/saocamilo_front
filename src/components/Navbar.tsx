import { icons } from "../utils/IconsJson"

// interface INavbar {
//     index: number;
// }

export default function Navbar() {
    return (
        <div className="h-30 w-full bg-gray-300 fixed bottom-0 flex justify-center items-center">
            <div id="navbar-mobile" className="flex gap-16">
                <div className="flex flex-col justify-between items-center gap-2 text-xl">
                    <span>{icons.usuario}</span>
                    <span>Atletas</span>
                </div>
                <div className="flex flex-col justify-between items-center gap-2 text-xl">
                    <span>{icons.historico}</span>
                    <span>Histórico</span>
                </div>
                <div className="flex flex-col justify-between items-center gap-2 text-xl">
                    <span className="text-2xl">{icons.menu}</span>
                    <span>Menu</span>
                </div>
            </div>
        </div>
    )
}