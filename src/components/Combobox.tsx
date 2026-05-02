interface IComboBox {
    valor: string;
    onChange: (valor: string) => void;
    texto: string;
}

export default function ComboBox({ texto, valor, onChange }: IComboBox) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-md font-medium text-black  ">{texto}</label>

            <select value={valor} onChange={(e) => onChange(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 w-80  bg-white text-black" >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        </div>
    );
}
