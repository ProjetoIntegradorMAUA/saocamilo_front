import type { ReactNode } from "react";


interface IDetectacao {
    texto: string;
    icone?: ReactNode;
}


export default function Detectacao({ texto, icone }: IDetectacao) {
    return (
        <div>
            <div className="flex items-center gap-2 text-3xl  text-black mb-4">
                <span>{icone}</span>
                <p> Detectação de Inconscistências </p>
            </div>
            <div className="border-1 rounded-3xl gap-3 py-8 w-300 bg-white">
                <div>
                    <p>Taxa de sudorese &gt; 2.5 L/h </p>
                </div>
                <div>
                    <p>Variação de massa corporal &gt; 2% </p>
                    <p>(Risco de desidratação clínica)</p>
                </div>
                <div>
                    <p>Balanço hídrico positivo</p>
                    <p>(Risco de hiponatremia por superingestão)</p>
                </div>
        
            </div>
        </div>
    );
}



