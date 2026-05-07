import { icons } from "../utils/IconsJson";


export default function Padronizacao() {
    return (
        <div>
            <div className="flex items-center gap-2 text-3xl  text-black mb-4">
                <span className="border rounded-3xl">{icons.check}</span>
                <p> Padronização de pesagem</p>
            </div>
            <div className="border rounded-3xl p-4 sm:p-8 bg-white w-full min-h-37.5 sm:min-h-55 flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center gap-4">
                    <p className="flex items-center justify-center rounded-full bg-red-700 text-white font-semibold w-8 h-8 sm:w-7 sm:h-7 shrink-0 text-sm sm:text-xl leading-none">1</p>
                    <p className="text-sm sm:text-base">Esvaziamento vesical obrigatório antes de ambas as pesagens.</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="flex items-center justify-center rounded-full bg-red-700 text-white font-semibold w-8 h-8 sm:w-7 sm:h-7 shrink-0 text-sm sm:text-xl leading-none">2</p>
                    <p className="text-sm sm:text-base">Utilizar a mesma balança em superfície nivelada.</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="flex items-center justify-center rounded-full bg-red-700 text-white font-semibold w-8 h-8 sm:w-7 sm:h-7 shrink-0 text-sm sm:text-xl leading-none">3</p>
                    <div className="flex flex-col text-sm sm:text-base">
                        <p>Vestimenta mínima e consistente.</p>
                        <p>(preferencialmente apenas roupa íntima ou uniforme seco)</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="flex items-center justify-center rounded-full bg-red-700 text-white font-semibold w-8 h-8 sm:w-7 sm:h-7 shrink-0 text-sm sm:text-xl leading-none">4</p>
                    <p className="text-sm sm:text-base">Secar o suor da pele com toalha antes da pesagem pós-exercício.</p>
                </div>
            </div>
        </div>
    );
}









