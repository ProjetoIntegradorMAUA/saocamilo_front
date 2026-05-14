type TextareaProps = {
    label: string;
    placeholder: string;
};

export default function Textarea({ label, placeholder }: TextareaProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-medium">{label}</label>

            <div className="relative">
                <textarea
                    placeholder={placeholder}
                    maxLength={500}
                    className="w-full h-28 rounded-2xl border border-gray-300 p-4 text-sm resize-none outline-none focus:border-[#ff3b30]"
                />

                <span className="absolute bottom-4 right-4 text-gray-400 text-sm">
                    0/500
                </span>
            </div>
        </div>
    );
}