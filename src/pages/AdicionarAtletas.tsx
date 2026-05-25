import { useState } from "react";
import { FaHeartbeat, FaHistory, FaRegUser } from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { GiRemedy } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Navbar from "../components/Navbar";
import Botao from "../components/Botao";
import Input from "../components/Input";
import Select from "../components/Select";
import Textarea from "../components/TextArea";
import logoEspiral from "../assets/logo_espiral.svg";
import { authRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdicionarAtletas() {
    const navigate = useNavigate();
    const [etapa, setEtapa] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("Masculino");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [saltySweat, setSaltySweat] = useState("Não");
    const [sweatPerception, setSweatPerception] = useState("Moderada");
    const [frequentCramps, setFrequentCramps] = useState("Não");
    const [saltStains, setSaltStains] = useState("Não");
    const [diuretics, setDiuretics] = useState("Não");
    const [hydrationStrategy, setHydrationStrategy] = useState("");
    const [relevantDiseases, setRelevantDiseases] = useState("");
    const [frequentSymptoms, setFrequentSymptoms] = useState("");
    const [dehydrationHistory, setDehydrationHistory] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function proximaEtapa() {
        if (etapa < 3) {
            setEtapa(etapa + 1);
        }
    }
    function voltarEtapa() {
        if (etapa > 1) {
            setEtapa(etapa - 1);
        }
    }

    const handleRegisterAthlete = async () => {
        setError("");
        if (!name || !email || !password) {
            setError("Nome completo, e-mail e senha são campos obrigatórios.");
            alert("Nome completo, e-mail e senha são campos obrigatórios.");
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
                    saltySweat,
                    sweatPerception,
                    frequentCramps,
                    saltStains,
                    diuretics,
                    dehydrationHistory,
                    hydrationStrategy,
                    relevantDiseases,
                    frequentSymptoms,
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
            setError("Ocorreu um erro ao cadastrar o atleta.");
            alert("Ocorreu um erro ao cadastrar o atleta.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-60 lg:shrink-0">
                <Navbar index={1} />
            </div>

            {/* Mobile Nav */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
                <Navbar index={1} />
            </div>

            {/* Conteudo geral */}
            <div className="flex-1 bg-[#f5f5f5] lg:p-3 p-0 flex justify-center overflow-y-auto">
                <div
                    className="
                        w-full
                        min-h-screen
                        lg:h-[95vh]
                        lg:max-w-387.5
                        bg-white
                        lg:rounded-3xl
                        border
                        border-gray-200
                        shadow-sm
                        px-5
                        py-6
                        lg:p-8
                        overflow-y-auto
                    "
                >
                    {/* Celular / Mobile View */}
                    <div className="lg:hidden pb-28">
                        <div className="flex justify-center mb-6">
                            <img
                                src={logoEspiral}
                                alt="Logo Espiral"
                                className="w-16"
                            />
                        </div>

                        {error && (
                            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                                ⚠️ {error}
                            </div>
                        )}

                        {/* Etapa 1 Mobile */}
                        {etapa === 1 && (
                            <div className="flex flex-col gap-4">
                                <h2 className="text-[#ff3b30] text-2xl font-bold flex items-center gap-3">
                                    <FaRegUser />
                                    Informações Pessoais
                                </h2>
                                <Input
                                    label="Nome Completo:"
                                    placeholder="Nome do atleta"
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
                                    placeholder="Senha de acesso"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    label="Data de nascimento:"
                                    placeholder="dd/mm/aaaa"
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                                <Select
                                    label="Sexo:"
                                    options={["Masculino", "Feminino"]}
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input 
                                        label="Altura (cm):" 
                                        placeholder="Ex: 175" 
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                    <Input
                                        label="Peso atual (kg):"
                                        placeholder="Ex: 70"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-3 mt-6 items-stretch">
                                    <div className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center">
                                        <Botao
                                            texto="Cancelar"
                                            tela="/atletas"
                                        />
                                    </div>
                                    <div
                                        className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center cursor-pointer"
                                        onClick={proximaEtapa}
                                    >
                                        <Botao texto="Próximo" />
                                    </div>
                                </div>

                                <div className="flex justify-center gap-3 mt-4">
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-gray-300" />
                                    <div className="w-20 h-2 rounded-full bg-gray-300" />
                                </div>
                            </div>
                        )}

                        {/* Etapa 2 Mobile */}
                        {etapa === 2 && (
                            <div className="flex flex-col gap-4">
                                <h2 className="text-[#ff3b30] text-2xl font-bold flex items-center gap-3">
                                    <FaHeartbeat />
                                    Dados Fisiológicos
                                </h2>
                                <Select
                                    label="Percepção de sudorese:"
                                    options={["Baixa", "Moderada", "Alta"]}
                                    value={sweatPerception}
                                    onChange={(e) => setSweatPerception(e.target.value)}
                                />
                                <Select
                                    label="Manchas de sal na roupa:"
                                    options={["Sim", "Não"]}
                                    value={saltStains}
                                    onChange={(e) => setSaltStains(e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Select
                                        label="Suor salgado:"
                                        options={["Sim", "Não"]}
                                        value={saltySweat}
                                        onChange={(e) => setSaltySweat(e.target.value)}
                                    />
                                    <Select
                                        label="Cãibras freq:"
                                        options={["Sim", "Não"]}
                                        value={frequentCramps}
                                        onChange={(e) => setFrequentCramps(e.target.value)}
                                    />
                                </div>
                                <Select
                                    label="Uso de medicamentos diuréticos:"
                                    options={["Sim", "Não"]}
                                    value={diuretics}
                                    onChange={(e) => setDiuretics(e.target.value)}
                                />

                                <div className="flex gap-3 mt-6 items-stretch">
                                    <div
                                        className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center cursor-pointer"
                                        onClick={voltarEtapa}
                                    >
                                        <Botao texto="Voltar" />
                                    </div>
                                    <div
                                        className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center cursor-pointer"
                                        onClick={proximaEtapa}
                                    >
                                        <Botao texto="Próximo" />
                                    </div>
                                </div>

                                <div className="flex justify-center gap-3 mt-4">
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-gray-300" />
                                </div>
                            </div>
                        )}

                        {/* Etapa 3 Mobile */}
                        {etapa === 3 && (
                            <div className="flex flex-col gap-4">
                                <h2 className="text-[#ff3b30] text-2xl font-bold flex items-center gap-3">
                                    <BsDroplet />
                                    Hidratação e Histórico
                                </h2>
                                <Textarea
                                    label="Estratégia atual de hidratação:"
                                    placeholder="Opcional"
                                    value={hydrationStrategy}
                                    onChange={(e) => setHydrationStrategy(e.target.value)}
                                />
                                <Textarea
                                    label="Doenças relevantes:"
                                    placeholder="Opcional"
                                    value={relevantDiseases}
                                    onChange={(e) => setRelevantDiseases(e.target.value)}
                                />
                                <Textarea
                                    label="Sintomas frequentes:"
                                    placeholder="Opcional"
                                    value={frequentSymptoms}
                                    onChange={(e) => setFrequentSymptoms(e.target.value)}
                                />
                                <Input
                                    label="Histórico de desidratação:"
                                    placeholder="Descreva se já teve episódios de desidratação."
                                    value={dehydrationHistory}
                                    onChange={(e) => setDehydrationHistory(e.target.value)}
                                />

                                <div className="flex gap-3 mt-6 items-stretch">
                                    <div
                                        className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center cursor-pointer"
                                        onClick={voltarEtapa}
                                    >
                                        <Botao texto="Voltar" />
                                    </div>
                                    <div 
                                        className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center cursor-pointer"
                                        onClick={handleRegisterAthlete}
                                    >
                                        <Botao texto={isLoading ? "Salvando..." : "Cadastrar Atleta"} />
                                    </div>
                                </div>

                                <div className="flex justify-center gap-3 mt-4">
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Computador / Desktop View */}
                    <div className="hidden lg:block">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">Cadastrar Novo Atleta</h1>
                            <p className="text-sm text-gray-500">Insira as informações fisiológicas e os dados de acesso do atleta.</p>
                        </div>

                        {error && (
                            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                                ⚠️ {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* 1 parte - Informações Pessoais */}
                            <div className="border border-gray-200 rounded-3xl p-6 flex flex-col gap-4 bg-white shadow-xs">
                                <h2 className="text-[#ff3b30] text-lg font-bold flex items-center gap-3 border-b pb-2">
                                    <FaRegUser />
                                    Informações Pessoais
                                </h2>
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
                                />
                                <Input
                                    label="Data de nascimento:"
                                    placeholder="dd/mm/aaaa"
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                                <Select
                                    label="Sexo:"
                                    options={["Masculino", "Feminino"]}
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <Input
                                    label="Altura (cm):"
                                    placeholder="Ex.: 175"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                                <Input
                                    label="Peso atual (kg):"
                                    placeholder="Ex.: 70.5"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>

                            {/* 2 parte - Fisiológico e Medicamentos */}
                            <div className="flex flex-col gap-6">
                                <div className="border border-gray-200 rounded-3xl p-6 flex flex-col gap-4 bg-white shadow-xs">
                                    <h2 className="text-[#ff3b30] text-lg font-bold flex items-center gap-3 border-b pb-2">
                                        <FaHeartbeat />
                                        Dados Fisiológicos
                                    </h2>
                                    <Select
                                        label="Suor salgado:"
                                        options={["Sim", "Não"]}
                                        value={saltySweat}
                                        onChange={(e) => setSaltySweat(e.target.value)}
                                    />
                                    <Select
                                        label="Percepção de sudorese:"
                                        options={["Baixa", "Moderada", "Alta"]}
                                        value={sweatPerception}
                                        onChange={(e) => setSweatPerception(e.target.value)}
                                    />
                                    <Select
                                        label="Cãibras Frequentes:"
                                        options={["Sim", "Não"]}
                                        value={frequentCramps}
                                        onChange={(e) => setFrequentCramps(e.target.value)}
                                    />
                                    <Select
                                        label="Manchas de sal na roupa:"
                                        options={["Sim", "Não"]}
                                        value={saltStains}
                                        onChange={(e) => setSaltStains(e.target.value)}
                                    />
                                </div>
                                <div className="border border-gray-200 rounded-3xl p-6 flex flex-col gap-4 bg-white shadow-xs">
                                    <h2 className="text-[#ff3b30] text-lg font-bold flex items-center gap-3 border-b pb-2">
                                        <GiRemedy />
                                        Medicação
                                    </h2>
                                    <Select
                                        label="Uso de medicamentos diuréticos:"
                                        options={["Sim", "Não"]}
                                        value={diuretics}
                                        onChange={(e) => setDiuretics(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* 3 parte - Hidratação */}
                            <div className="border border-gray-200 rounded-3xl p-6 flex flex-col gap-4 bg-white shadow-xs">
                                <h2 className="text-[#ff3b30] text-lg font-bold flex items-center gap-3 border-b pb-2">
                                    <BsDroplet />
                                    Hidratação
                                </h2>
                                <Textarea
                                    label="Estratégia atual de hidratação:"
                                    placeholder="Descreva a estratégia atual utilizada."
                                    value={hydrationStrategy}
                                    onChange={(e) => setHydrationStrategy(e.target.value)}
                                />
                                <Textarea
                                    label="Doenças relevantes:"
                                    placeholder="Informe quaisquer doenças relevantes."
                                    value={relevantDiseases}
                                    onChange={(e) => setRelevantDiseases(e.target.value)}
                                />
                                <Textarea
                                    label="Sintomas frequentes:"
                                    placeholder="Descreva os sintomas mais frequentes."
                                    value={frequentSymptoms}
                                    onChange={(e) => setFrequentSymptoms(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Histórico */}
                        <div className="border border-gray-200 rounded-3xl p-6 mt-6 flex flex-col lg:flex-row lg:items-center gap-4 bg-white shadow-xs">
                            <h2 className="text-[#ff3b30] text-lg font-bold flex items-center gap-3 min-w-fit">
                                <FaHistory />
                                Histórico
                            </h2>

                            <div className="w-full">
                                <label className="text-sm text-gray-700 font-medium block mb-2">
                                    Histórico de desidratação:
                                </label>
                                <input
                                    type="text"
                                    value={dehydrationHistory}
                                    onChange={(e) => setDehydrationHistory(e.target.value)}
                                    placeholder="Descreva o histórico de desidratação (ex: episódios prévios, internações)."
                                    className="
                                        w-full
                                        h-12
                                        rounded-2xl
                                        border
                                        border-gray-300
                                        px-4
                                        text-sm
                                        outline-none
                                        focus:border-[#ff3b30]
                                        transition-colors
                                    "
                                />
                            </div>
                        </div>

                        {/* Botões Desktop */}
                        <div className="flex justify-end gap-4 mt-6 pb-6">
                            <Botao
                                texto="Cancelar"
                                icone={<IoMdClose />}
                                tela="/atletas"
                            />
                            <div onClick={handleRegisterAthlete} className="cursor-pointer">
                                <Botao
                                    texto={isLoading ? "Criando..." : "Criar Atleta"}
                                    icone={<FaRegUser />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}