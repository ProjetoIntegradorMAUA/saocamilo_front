import { useState } from "react";
import { FaHistory, FaRegUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Navbar from "../components/Navbar";
import Botao from "../components/Botao";
import Input from "../components/Input";
import Select from "../components/Select";
import Textarea from "../components/TextArea";
import { authRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function EditarAtletas() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("Masculino");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [dehydrationHistory, setDehydrationHistory] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterAthlete = async () => {
        setError("");

        if (!name || !email || !password) {
            setError("Nome completo, e-mail e senha são obrigatórios.");
            alert("Nome completo, e-mail e senha são obrigatórios.");
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
                    gender,
                    height: height || undefined,
                    weight: weight || undefined,
                    dehydrationHistory,
                }),
            });

            if (response.error) {
                setError(response.error);
                alert(`Erro ao cadastrar atleta: ${response.error}`);
            } else {
                alert(`Atleta "${name}" cadastrado com sucesso!`);
                navigate("/atletas");
            }
        } catch (err) {
            console.error(err);
            setError("Ocorreu um erro ao cadastrar atleta.");
            alert("Ocorreu um erro ao cadastrar atleta.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row"> 
            <div className="hidden lg:block lg:w-60 lg:shrink-0">
                <Navbar index={1} />
            </div>
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
                <Navbar index={1} />
            </div>
            <div className="flex-1 bg-[#f5f5f5] lg:p-3 p-0 flex justify-center overflow-y-auto">
                <div
                    className=" w-full min-h-screen lg:h-[95vh] lg:max-w-387.5 bg-white lg:rounded-3xl border border-gray-200 shadow-sm px-5 py-6 pb-32 lg:pb-8 lg:p-8 overflow-y-auto
                "
                >
                    {/* titulo */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#1f2a44]">
                            Cadastrar Novo Atleta
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Insira as informações pessoais e o histórico do
                            atleta.
                        </p>
                    </div>

                    {/* erro */}
                    {error && (
                        <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* informações pessoais */}
                    <div className="border border-gray-200 rounded-3xl p-6 bg-white shadow-xs mb-6">
                        <div className="flex items-center gap-3 text-[#ff3b30] mb-4">
                            <FaRegUser className="text-xl" />

                            <h2 className="text-2xl font-bold">
                                Informações Pessoais
                            </h2>
                        </div>

                        <div className="w-full h-[2px] bg-[#ff3b30] rounded-full mb-8"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Input
                                label="Nome Completo:"
                                placeholder="Ex: Carlos Eduardo Silva"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                                label="E-mail:"
                                placeholder="atleta@email.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Senha de Acesso:"
                                placeholder="Defina uma senha"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled
                            />

                            <Input
                                placeholder=""
                                label="Data de nascimento:"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                disabled
                            />

                            <Select
                                label="Sexo:"
                                options={["Masculino", "Feminino"]}
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                disabled
                                
                            />

                            <Input
                                label="Altura (cm):"
                                placeholder="Ex: 175"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                disabled
                            />

                            <Input
                                label="Peso atual (kg):"
                                placeholder="Ex: 70.5"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* historico */}
                    <div className="border border-gray-200 rounded-3xl p-6 bg-white shadow-xs">
                        <div className="flex items-center gap-3 text-[#ff3b30] mb-4">
                            <FaHistory className="text-xl" />

                            <h2 className="text-2xl font-bold">Histórico</h2>
                        </div>

                        <div className="w-full h-[2px] bg-[#ff3b30] rounded-full mb-8"></div>

                        <Textarea
                            label="Histórico de desidratação:"
                            placeholder="Descreva o histórico de desidratação (ex: episódios prévios, internações)."
                            value={dehydrationHistory}
                            onChange={(e) =>
                                setDehydrationHistory(e.target.value)
                            }
                        />
                    </div>

                    {/* botao */}
                    <div className="flex justify-end gap-4 mt-8 pb-6">
                        <Botao
                            texto="Cancelar"
                            icone={<IoMdClose />}
                            tela="/atletas"
                        />

                        <div
                            onClick={handleRegisterAthlete}
                            className="cursor-pointer"
                        >
                            <Botao
                                texto={
                                    isLoading ? "Criando..." : "Criar Atleta"
                                }
                                icone={<FaRegUser />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

