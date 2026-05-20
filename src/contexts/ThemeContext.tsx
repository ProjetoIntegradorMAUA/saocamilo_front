/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "claro" | "escuro";
export type Unidade = "kg" | "lb";
export type Temperatura = "c" | "f";

type Configs = {
    tema: Theme;
    unidade: Unidade;
    temperatura: Temperatura;
};

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const DEFAULT_CONFIGS: Configs = {
    tema: "claro",
    unidade: "kg",
    temperatura: "c",
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function getStoredConfigs(): Configs {
    try {
        const raw = localStorage.getItem("configs");
        if (!raw) {
            return DEFAULT_CONFIGS;
        }
        const parsed = JSON.parse(raw) as Partial<Configs>;
        return {
            tema: parsed.tema === "escuro" ? "escuro" : "claro",
            unidade: parsed.unidade === "lb" ? "lb" : "kg",
            temperatura: parsed.temperatura === "f" ? "f" : "c",
        };
    } catch {
        return DEFAULT_CONFIGS;
    }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => getStoredConfigs().tema);

    const setTheme = (nextTheme: Theme) => {
        setThemeState(nextTheme);
        const stored = getStoredConfigs();
        localStorage.setItem(
            "configs",
            JSON.stringify({ ...stored, tema: nextTheme })
        );
    };

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("theme-dark", theme === "escuro");
        root.classList.toggle("theme-light", theme === "claro");
        root.style.colorScheme = theme === "escuro" ? "dark" : "light";
    }, [theme]);

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}
