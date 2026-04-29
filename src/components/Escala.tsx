import type { ReactNode } from "react";

interface IEscalaUrina {
    texto: string;
}

export default function EscalaUrina({ texto }: IEscalaUrina) {
    return (
        <div>
            <p>Escala Visual</p>
            <div>
                <p>
                    Utilize para estimular o estado de hidratação basal do
                    atleta antes do início da sessão.
                </p>
                <div>
                    <div>Nível 1</div>
                    <div>Nível 2</div>
                    <div>Nível 3</div>
                    <div>Nível 4</div>
                    <div>Nível 5</div>
                    <div>Nível 6</div>
                    <div>Nível 7</div>
                    <div>Nível 8</div>
                </div>
                <div>
                    <div>Níveis 1-3: Bem Hidratado</div>
                    <div>Níveis 4-6: Desidratado</div>
                    <div>Níveis 7-8: Severamente Desidratado</div>
                </div>
            </div>
        </div>
    );
}
