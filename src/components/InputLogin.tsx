import { useState } from "react";
import { icons } from "../utils/IconsJson";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface IInputLogin {
    placeholder: string;
    type: string;
    id: string;
}

export default function InputLogin({ placeholder, type, id }: IInputLogin) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === "password";
    const rightSlotClassName = "flex items-center justify-center px-4 text-xl w-12 shrink-0 transition-colors duration-200";

    return (
        <div
            className={`flex items-center gap-0 w-full sm:w-auto border-b-2 rounded-lg px-4 py-3 transition-all duration-300 ${isFocused
                ? "border-red-500 bg-red-50 shadow-md"
                : "border-red-300 bg-white hover:border-gray-400"
                }`}
        >
            <div className={`flex items-center justify-center text-xl shrink-0 transition-colors duration-200 ${isFocused ? "text-red-500" : "text-gray-500"
                }`}>
                {isPassword ? icons.senha : icons.usuario}
            </div>

            <input
                id={id}
                type={isPassword && !showPassword ? "password" : "text"}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 min-w-0 sm:w-56 md:w-64 bg-transparent outline-none text-gray-800 placeholder-gray-400 ml-2 transition-colors duration-200"
                style={{ fontSize: "1rem" }}
            />

            {isPassword && (
                <button
                    type="button"
                    className={`${rightSlotClassName} ${isFocused
                        ? "text-red-500 hover:text-red-600"
                        : "text-gray-500 hover:text-gray-600"
                        } cursor-pointer`}
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
            )}

            {!isPassword && (
                <div className={rightSlotClassName} aria-hidden="true" />
            )}
        </div>
    );
}