import { icons } from "../utils/IconsJson";


export default function Padronizacao() {
    return (
        <div>
            <div className="flex items-center gap-2 text-3xl  text-black mb-4">
                <span className="border rounded-3xl">{icons.check}</span>
                <p> Padronização de pesagem</p>
            </div>
            <div className="border rounded-3xl p-14 bg-white w-full min-h-75 flex flex-col gap-4">
                <div className="flex itens-center gap-4">
                    <p className="flex items-center justify-center rounded-full bg-red-700 text-white text-xl font-semibold w-7 h-7 ">1</p>
                    <p>Esvaziamento vesical obrigatório antes de ambas as pesagens.</p>
                </div>
                <div className="flex itens-center gap-4" >
                    <p className="flex items-center justify-center rounded-full bg-red-700 text-white text-x1 font-semibold w-7 h-7 ">2</p>
                    <p>Utilizar a mesma balança em superfície nivelada.</p>
                </div>
                <div className="flex itens-center gap-4" >
                    <p className="flex items-center justify-center rounded-full bg-red-700 text-white text-xl font-semibold w-7 h-7 " >3</p>
                    <div className="flex flex-col">
                        <p>Vestimenta mínima e consistente.</p>
                        <p>(preferencialmente apenas roupa íntima ou uniforme seco)</p>
                    </div>
                </div>
                <div className="flex itens-center gap-4">
                    <p className="flex items-center justify-center rounded-full bg-red-700 text-white text-xl font-semibold w-7 h-7 ">4</p>
                    <p>Secar o suor da pele com toalha antes da pesagem pós-exercício.</p>
                </div>
            </div>
        </div>
    );
}









