import React, { useState } from "react";
import type { ChangeEvent } from "react";

type Tema = "claro" | "escuro";
type Unidade = "kg" | "lb";
type Temperatura = "c" | "f";

export default function Preferencias() {
    const [tema, setTema] = useState<Tema>("claro");
    const [unidade, setUnidade] = useState<Unidade>("kg");
    const [temperatura, setTemperatura] = useState<Temperatura>("c");

    const handleTemaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTema(e.target.value as Tema);
    };

    const handleUnidadeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUnidade(e.target.value as Unidade);
    };

    const handleTemperaturaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTemperatura(e.target.value as Temperatura);
    };

    return (
        <div className="flex flex-col border border-black-300 rounded-2xl bg-white w-full max-w-md px-8 py-8 ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Preferências
            </h2>

            <div className="grid grid-cols-[180px_1fr] items-center py-4 border-t border-gray-200">
                <p className="text-gray-700 font-medium">Tema</p>

                <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer min-w-20">
                        <input
                            type="radio"
                            name="tema"
                            value="claro"
                            checked={tema === "claro"}
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
                            checked={tema === "escuro"}
                            onChange={handleTemaChange}
                            className="accent-red-600 w-4 h-4"
                        />
                        <span className="text-gray-700">Escuro</span>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center py-4 border-t border-gray-200">
                <p className="text-gray-700 font-medium">Unidade de medida</p>

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

            <div className="grid grid-cols-[180px_1fr] items-center py-4 border-t border-gray-200">
                <p className="text-gray-700 font-medium">Temperatura</p>

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
        </div>
    );
}
