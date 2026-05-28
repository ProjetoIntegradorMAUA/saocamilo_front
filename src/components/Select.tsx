type SelectProps = {
    label: string;
    options: string[];
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
};

export default function Select({label, options, value, onChange, disabled = false,}: SelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-medium">
                {label}
            </label>

            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`
                    w-full h-12 rounded-2xl border px-4 text-sm outline-none transition
                    ${
                        disabled
                            ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                            : "border-gray-300 text-gray-600 focus:border-[#ff3b30]"
                    }
                `}
            >
                <option value="">Selecione</option>

                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}