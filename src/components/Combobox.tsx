interface IComboBox {
    texto: string;
    placeholder: string;
    options: Array<string>;
}

export default function ComboBox({ texto, placeholder, options }: IComboBox) {

    return (
        <div className="flex flex-col gap-2">
            <label className="text-md font-medium text-black  ">{texto}</label>

            <select className="border border-gray-300 rounded-lg px-4 py-2 w-80 bg-white text-black" defaultValue="">
                <option value="" disabled>{placeholder}</option>
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.toLowerCase()}>{option}</option>
                    )
                })}
            </select>
        </div>
    );
}
