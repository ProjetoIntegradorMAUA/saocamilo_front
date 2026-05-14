import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { authRequest } from "../services/api";

interface NewAthleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function NewAthleteModal({ isOpen, onClose, onSuccess }: NewAthleteModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password || !birthDate || !gender) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await authRequest("/api/athletes", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    birthDate,
                    gender
                })
            });

            if (response.error) {
                setError(response.error);
                return;
            }

            onSuccess();
            onClose();
        } catch (err) {
            setError("Ocorreu um erro ao cadastrar. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden animate-fade-in">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Cadastrar Novo Atleta</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
                        <IoCloseOutline size={30} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                            placeholder="Ex: Carlos Silva"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail (Acesso do Atleta) *</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                            placeholder="atleta@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Senha Provisória *</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                            placeholder="Senha de acesso"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gênero *</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none"
                            >
                                <option value="" disabled>Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-3 rounded-xl font-medium text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? "Salvando..." : "Cadastrar Atleta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
