
interface iSessao {
    PreDurantePos: string;
    Pergunta1: string;
    Pergunta2: string;
    Pergunta3: string;
    Pergunta4: string;
}


export default function Sessao({ PreDurantePos, Pergunta1, Pergunta2, Pergunta3, Pergunta4}: iSessao) {
    return (
    <div>
        <span>{PreDurantePos} Sessão:</span>
        <div>
            <span>{Pergunta1}</span>
            <input type="text" />
            <span>{Pergunta2}</span>
            <input type="text" />
            <span>{Pergunta3}</span>
            <input type="text" />
            <span>{Pergunta4}</span>
            <input type="text" />
        </div>
    </div>
    );
    
}