import type { ChangeEvent } from "react";
import { type Theme, useTheme } from "../contexts/ThemeContext";

export default function Preferencias() {
    const { theme, setTheme } = useTheme();

    const handleTemaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.value as Theme);
    };

    return (
        <div className="flex flex-col border border-gray-300 rounded-3xl bg-white w-full px-8 py-8 overflow-hidden">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Aparência
            </h2>

            <div className="flex flex-col md:grid md:grid-cols-[140px_1fr] items-start md:items-center py-4 border-t border-gray-200">
                <p className="text-gray-700 font-medium">Tema:</p>

                <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer min-w-20">
                        <input
                            type="radio"
                            name="tema"
                            value="claro"
                            checked={theme === "claro"}
                            onChange={handleTemaChange}
                            className="accent-red-600 w-4 h-4"
                        />
                        <span className="text-gray-700">Claro</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer min-w-20">
                        <input
                            type="radio"
                            name="tema"
                            value="escuro"
                            checked={theme === "escuro"}
                            onChange={handleTemaChange}
                            className="accent-red-600 w-4 h-4"
                        />
                        <span className="text-gray-700">Escuro</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
