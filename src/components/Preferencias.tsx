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
        <div>
            <h2>Preferências</h2>

            <p>Tema</p>
            <label>
                <input
                    type="radio"
                    name="tema"
                    value="claro"
                    checked={tema === "claro"}
                    onChange={handleTemaChange}
                />
                Claro
            </label>
            <label>
                <input
                    type="radio"
                    name="tema"
                    value="escuro"
                    checked={tema === "escuro"}
                    onChange={handleTemaChange}
                />
                Escuro
            </label>

            <p>Unidade de medida</p>
            <label>
                <input
                    type="radio"
                    name="unidade"
                    value="kg"
                    checked={unidade === "kg"}
                    onChange={handleUnidadeChange}
                />
                kg
            </label>
            <label>
                <input
                    type="radio"
                    name="unidade"
                    value="lb"
                    checked={unidade === "lb"}
                    onChange={handleUnidadeChange}
                />
                lb
            </label>

            <p>Temperatura</p>
            <label>
                <input
                    type="radio"
                    name="temperatura"
                    value="c"
                    checked={temperatura === "c"}
                    onChange={handleTemperaturaChange}
                />
                °C
            </label>
            <label>
                <input
                    type="radio"
                    name="temperatura"
                    value="f"
                    checked={temperatura === "f"}
                    onChange={handleTemperaturaChange}
                />
                °F
            </label>
        </div>
    );
}
