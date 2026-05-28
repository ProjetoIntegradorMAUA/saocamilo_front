type InputProps = {
    label: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
};

export default function Input({label, placeholder, type = "text", value, onChange, disabled = false,}: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-medium">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`
                    w-full h-12 rounded-2xl border px-4 text-sm outline-none transition
                    ${
                        disabled
                            ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                            : "border-gray-300 focus:border-[#ff3b30]"
                    }
                `}
            />
        </div>
    );
}