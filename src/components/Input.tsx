type InputProps = {
    label: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ label, placeholder, type = "text", value, onChange }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-medium">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full h-12 rounded-2xl border border-gray-300 px-4 text-sm outline-none focus:border-[#ff3b30]"
            />
        </div>
    );
}