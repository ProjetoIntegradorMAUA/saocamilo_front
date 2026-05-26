type SelectProps = {
    label: string;
    options: string[];
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({ label, options, value, onChange }: SelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-medium">{label}</label>

            <select 
                value={value}
                onChange={onChange}
                className="w-full h-12 rounded-2xl border border-gray-300 px-4 text-sm text-gray-600 outline-none focus:border-[#ff3b30]"
            >
                <option value="">Selecione</option>

                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}