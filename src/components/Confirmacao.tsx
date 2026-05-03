import type { ReactNode } from "react";

interface iConfirmacao {
    texto: string;
}

export default function Confirmacao({ texto} : iConfirmacao) {
    return (<div>
            <div>
                {texto}
            </div>
            <div>
                <button></button>
                <button></button>
            </div>
    </div>
    )
}