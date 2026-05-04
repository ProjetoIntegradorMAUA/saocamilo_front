import { useState } from "react";
import { icons } from "../utils/IconsJson";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface IInputLogin {
    placeholder: string;
    type: string;
    id: number;
}

export default function InputLogin({ placeholder, type, id }: IInputLogin) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const rightSlotClassName = "flex items-center justify-center px-3 text-2xl w-12 shrink-0";

    return (
        <div className="flex border border-gray-400 w-fit rounded-2xl">
            <div className="flex items-center justify-center px-3 text-2xl">
                {isPassword ? icons.senha : icons.usuario}
            </div>

            <input
                id={String(id)}
                type={isPassword && !showPassword ? "password" : "text"}
                placeholder={placeholder}
                className=" w-40 sm:w-56 md:w-64"
                style={{ fontSize: "1.3rem" }}
            />

            {isPassword && (
                <div
                    className={`${rightSlotClassName} cursor-pointer`}
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
            )}

            {!isPassword && (
                <div className={rightSlotClassName} aria-hidden="true" />
            )}
        </div>
    );
}