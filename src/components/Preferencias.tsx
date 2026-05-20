import { useState } from "react";
import type { ChangeEvent } from "react";
import { getStoredConfigs, type Theme, type Unidade, type Temperatura, useTheme } from "../contexts/ThemeContext";

export default function Preferencias() {
    const { theme, setTheme } = useTheme();
    const configs = getStoredConfigs();
    const [unidade, setUnidade] = useState<Unidade>(configs.unidade);
    const [temperatura, setTemperatura] = useState<Temperatura>(configs.temperatura);

    const handleTemaChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTema = e.target.value as Theme;
        setTheme(newTema);
        setLocalStorage(newTema, unidade, temperatura);
    };

    const handleUnidadeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUnidade = e.target.value as Unidade;
        setUnidade(newUnidade);
        setLocalStorage(theme, newUnidade, temperatura);
    };

    const handleTemperaturaChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTemperatura = e.target.value as Temperatura;
        setTemperatura(newTemperatura);
        setLocalStorage(theme, unidade, newTemperatura);
    };

    const setLocalStorage = (tema: Theme, unidade: Unidade, temperatura: Temperatura) => {
        localStorage.setItem("configs", JSON.stringify({ tema, unidade, temperatura }))
    }

    return (
        <div className="flex flex-col border border-gray-300 rounded-3xl bg-white w-full px-8 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Preferências
            </h2>

            <div className="flex flex-col md:grid md:grid-cols-[180px_1fr] items-start md:items-center py-4 border-t border-gray-200">
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

            <div className="flex flex-col md:grid md:grid-cols-[180px_1fr] items-start md:items-center py-4 border-t border-gray-200">
                <p className="text-gray-700 font-medium">Unidade de medida:</p>

                <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer min-w-20">
                        <input
                            type="radio"
                            name="unidade"
                            value="kg"
                            checked={unidade === "kg"}
                            onChange={handleUnidadeChange}
                            className="accent-red-600 w-4 h-4"
                        />
                        <span className="text-gray-700">kg</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer min-w-20">
                        <input
                            type="radio"
                            name="unidade"
                            value="lb"
                            checked={unidade === "lb"}
                            onChange={handleUnidadeChange}
                            className="accent-red-600 w-4 h-4"
                        />
                        <span className="text-gray-700">lb</span>
                    </label>
                </div>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-[180px_1fr] items-start md:items-center py-4 border-t border-gray-200">
                <p className="text-gray-700 font-medium">Temperatura:</p>

                <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer min-w-20">
                        <input
                            type="radio"
                            name="temperatura"
                            value="c"
                            checked={temperatura === "c"}
                            onChange={handleTemperaturaChange}
                            className="accent-red-600 w-4 h-4"
                        />
                        <span className="text-gray-700">°C</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer min-w-20">
                        <input
                            type="radio"
                            name="temperatura"
                            value="f"
                            checked={temperatura === "f"}
                            onChange={handleTemperaturaChange}
                            className="accent-red-600 w-4 h-4"
                        />
                        <span className="text-gray-700">°F</span>
                    </label>
                </div>
            </div>
        </div >
    );
}
