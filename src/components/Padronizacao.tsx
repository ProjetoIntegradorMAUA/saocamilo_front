import { icons } from "../utils/IconsJson";


export default function Padronizacao() {
    return (
        <div>
            <div className="flex items-center gap-2 text-3xl  text-black mb-4">
                <span className="border rounded-3xl">{icons.check}</span>
                <p> Padronização de pesagem</p>
            </div>
            <div className="border rounded-3xl p-6 bg-white w-175 flex flex-col gap-4">
                <div>
                    <p>1</p>
                    <p>Esvaziamento vesical obrigatório antes de ambas as pesagens.</p>
                </div>
                <div>
                    <p>2</p>
                    <p>Utilizar a mesma balança em superfície nivelada.</p>
                </div>
                <div>
                    <p>3</p>
                    <p>Vestimenta mínima e consistente</p>
                    <p>(preferencialmente apenas roupa íntima ou uniforme seco)</p>
                </div>
                <div>
                    <p>4</p>
                    <p>Secar o suor da pele com toalha antes da pesagem pós-exercício.</p>
                </div>
            </div>
        </div>
    );
}









