interface IComboBox {
    texto: string;
    placeholder: string;
    options: Array<string>;
    value?: string;
    onChange?: (value: string) => void;
}

export default function ComboBox({ texto, placeholder, options, value, onChange }: IComboBox) {

    return (
        <div className="flex flex-col gap-2">
            <label className="text-md font-medium text-black  ">{texto}</label>

            <select 
                className="border border-gray-300 rounded-lg px-4 py-2 w-80 bg-white text-black" 
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            >
                {placeholder && <option value="" disabled>{placeholder}</option>}
                {options.map((option) => {
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                })}
            </select>
        </div>
    );
}
