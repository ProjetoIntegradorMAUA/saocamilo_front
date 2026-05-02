interface ComboBoxProps {
    valor: string;
    onChange: (valor: string) => void;
    texto: string;
}


export default function ComboBox({ texto, valor, onChange }: ComboBoxProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">{texto}</label>


            <select
                value={valor}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        </div>
    );
}



