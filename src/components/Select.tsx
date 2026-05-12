type SelectProps = {
    label: string;
    options: string[];
};

export default function Select({ label, options }: SelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-medium">{label}</label>

            <select className="w-full h-12 rounded-2xl border border-gray-300 px-4 text-sm text-gray-600 outline-none focus:border-[#ff3b30]">
                <option>Selecione</option>

                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}