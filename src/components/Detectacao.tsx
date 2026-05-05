import { icons } from "../utils/IconsJson";

export default function Detectacao() {
    return (
        <div>
            <div className="flex items-center gap-2 text-3xl  text-black mb-4">
                <span className="border rounded-3xl">{icons.negativo}</span>
                <p> Detectação de Inconsistências </p>
            </div>
            <div className="border rounded-3xl p-6 bg-white w-full min-h-[300px] flex flex-col gap-4 justify-center ">
                <div className="border border-red-500 rounded-2xl text-red-500 text-center py-3">
                    <p>Taxa de sudorese &gt; 2.5 L/h </p>
                </div>
                <div className="border border-red-500 rounded-2xl text-red-500 text-center py-3">
                    <p>Variação de massa corporal &gt; 2% </p>
                    <p>(Risco de desidratação clínica)</p>
                </div>
                <div className="border border-red-500 rounded-2xl text-red-500 text-center py-3">
                    <p>Balanço hídrico positivo</p>
                    <p>(Risco de hiponatremia por superingestão)</p>
                </div>
        
            </div>
        </div>
    );
}



