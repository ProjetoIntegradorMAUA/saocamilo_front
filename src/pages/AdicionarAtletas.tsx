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

export default function AdicionarAtletas() {
    const [etapa, setEtapa] = useState(1);

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

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-60 lg:shrink-0">
                <Navbar index={1} />
            </div>

            {/* Mobile */}
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
                        lg:p-4
                        overflow-y-auto
                    "
                >
                    {/* Celular */}
                    <div className="lg:hidden pb-28">
                        <div className="flex justify-center mb-10">
                            <img
                                src={logoEspiral}
                                alt="Logo Espiral"
                                className="w-24"
                            />
                        </div>

                        {/* 1 pagina */}

                        {etapa === 1 && (
                            <div className="flex flex-col gap-5">
                                <h2 className="text-[#ff3b30] text-2xl font-bold flex items-center gap-3">
                                    <FaRegUser />
                                    Informações Pessoais
                                </h2>
                                <Input
                                    label="Nome:"
                                    placeholder="Nome Completo."
                                />
                                <Input
                                    label="Data de nascimento:"
                                    placeholder="dd/mm/aaaa"
                                    type="date"
                                />
                                <Select
                                    label="Sexo:"
                                    options={["Masculino", "Feminino", "PNI"]}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Altura:" placeholder="Cm" />
                                    <Input
                                        label="Peso atual:"
                                        placeholder="Kg"
                                    />
                                </div>

                                {/* botao */}
                                <div className="flex gap-3 mt-4 items-stretch ">
                                    <div className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center">
                                        <Botao
                                            texto="Cancelar"
                                            tela="/atletas"
                                        />
                                    </div>
                                    <div
                                        className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center"
                                        onClick={proximaEtapa}
                                    >
                                        <Botao texto="Próximo" />
                                    </div>
                                </div>

                                {/* barrinha */}
                                <div className="flex justify-center gap-3 mt-2">
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-gray-300" />
                                    <div className="w-20 h-2 rounded-full bg-gray-300" />
                                </div>
                            </div>
                        )}

                        {/* 2 pagina */}

                        {etapa === 2 && (
                            <div className="flex flex-col gap-5">
                                <h2 className="text-[#ff3b30] text-2xl font-bold flex items-center gap-3">
                                    <FaHeartbeat />
                                    Dados Fisiológicos
                                </h2>
                                <Select
                                    label="Percepção de sudorese:"
                                    options={["Baixa", "Moderada", "Alta"]}
                                />
                                <Select
                                    label="Manchas de sal na roupa:"
                                    options={["Sim", "Não"]}
                                />
                                <Textarea
                                    label="Estratégia atual de hidratação:"
                                    placeholder="Opcional"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Select
                                        label="Suor salgado:"
                                        options={["Sim", "Não"]}
                                    />
                                    <Select
                                        label="Cãibras freq:"
                                        options={["Sim", "Não"]}
                                    />
                                </div>

                                {/* botao */}
                                <div className="flex gap-3 mt-4 items-stretch">
                                    <div
                                        className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center"
                                        onClick={voltarEtapa}
                                    >
                                        <Botao texto="Voltar" />
                                    </div>
                                    <div
                                        className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center"
                                        onClick={proximaEtapa}
                                    >
                                        <Botao texto="Próximo" />
                                    </div>
                                </div>

                                {/* barrinha */}
                                <div className="flex justify-center gap-3 mt-2">
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-gray-300" />
                                </div>
                            </div>
                        )}

                        {/* 3 pagina */}

                        {etapa === 3 && (
                            <div className="flex flex-col gap-5">
                                <h2 className="text-[#ff3b30] text-2xl font-bold flex items-center gap-3">
                                    <BsDroplet />
                                    Hidratação
                                </h2>
                                <Select
                                    label="Uso de medicamentos diuréticos:"
                                    options={["Sim", "Não"]}
                                />
                                <Textarea
                                    label="Doenças relevantes:"
                                    placeholder="Opcional"
                                />
                                <Select
                                    label="Histórico de desidratação:"
                                    options={["Sim", "Não"]}
                                />
                                <Textarea
                                    label="Sintomas frequentes:"
                                    placeholder="Opcional"
                                />

                                {/* botao */}
                                <div className="flex gap-3 mt-4 items-stretch ">
                                    <div
                                        className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center"
                                        onClick={voltarEtapa}
                                    >
                                        <Botao texto="Voltar" />
                                    </div>
                                    <div className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:justify-center">
                                        <Botao texto="Cadastrar" />
                                    </div>
                                </div>

                                {/* barrinha */}
                                <div className="flex justify-center gap-3 mt-2">
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                    <div className="w-20 h-2 rounded-full bg-[#ff3b30]" />
                                </div>
                            </div>
                        )
                    }
                            </div>

                        {/* Computador */}

                        <div className="hidden lg:block">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {/* 1 parte */}
                                <div className="border border-gray-200 rounded-3xl p-4 flex flex-col gap-4">
                                    <h2 className="text-[#ff3b30] text-sm font-semibold flex items-center gap-3">
                                        <FaRegUser />
                                        Informações Pessoais
                                    </h2>
                                    <Input
                                        label="Nome:"
                                        placeholder="Nome Completo."
                                    />
                                    <Input
                                        label="Data de nascimento:"
                                        placeholder="dd/mm/aaaa"
                                        type="date"
                                    />
                                    <Select
                                        label="Sexo:"
                                        options={["Masculino", "Feminino"]}
                                    />
                                    <Input
                                        label="Altura (cm):"
                                        placeholder="Ex.: 175"
                                    />
                                    <Input
                                        label="Peso atual (kg):"
                                        placeholder="Ex.: 70,5"
                                    />
                                </div>

                                {/* 2 parte */}
                                <div className="flex flex-col gap-4">
                                    <div className="border border-gray-200 rounded-3xl p-4 flex flex-col gap-4">
                                        <h2 className="text-[#ff3b30] text-sm font-semibold flex items-center gap-3">
                                            <FaHeartbeat />
                                            Dados Fisiológicos
                                        </h2>
                                        <Select
                                            label="Suor salgado:"
                                            options={["Sim", "Não"]}
                                        />
                                        <Select
                                            label="Percepção de sudorese:"
                                            options={[
                                                "Baixa",
                                                "Moderada",
                                                "Alta",
                                            ]}
                                        />
                                        <Select
                                            label="Cãibras Frequentes:"
                                            options={["Sim", "Não"]}
                                        />
                                        <Select
                                            label="Manchas de sal na roupa:"
                                            options={["Sim", "Não"]}
                                        />
                                    </div>
                                    <div className="border border-gray-200 rounded-3xl p-4 flex flex-col gap-4">
                                        <h2 className="text-[#ff3b30] text-sm font-semibold flex items-center gap-3">
                                            <GiRemedy />
                                            Medicação
                                        </h2>
                                        <Select
                                            label="Uso de medicamentos diuréticos:"
                                            options={["Sim", "Não"]}
                                        />
                                    </div>
                                </div>

                                {/* 3 parte */}
                                <div className="border border-gray-200 rounded-3xl p-4 flex flex-col gap-4">
                                    <h2 className="text-[#ff3b30] text-sm font-semibold flex items-center gap-3">
                                        <BsDroplet />
                                        Hidratação
                                    </h2>
                                    <Textarea
                                        label="Estratégia atual de hidratação:"
                                        placeholder="Descreva a estratégia atual utilizada."
                                    />
                                    <Textarea
                                        label="Doenças relevantes:"
                                        placeholder="Informe quaisquer doenças relevantes."
                                    />
                                    <Textarea
                                        label="Sintomas frequentes:"
                                        placeholder="Descreva os sintomas mais frequentes."
                                    />
                                </div>
                            </div>

                            {/* historico */}
                            <div className="border border-gray-200 rounded-3xl p-4 mt-6 flex flex-col lg:flex-row lg:items-center gap-4">
                                <h2 className="text-[#ff3b30] text-sm font-semibold flex items-center gap-3 min-w-fit">
                                    <FaHistory />
                                    Histórico
                                </h2>

                                <div className="w-full">
                                    <label className="text-sm text-gray-700 font-medium block mb-2">
                                        Histórico de desidratação:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Descreva o histórico de desidratação."
                                        className="
                                        w-full
                                        h-11
                                        rounded-2xl
                                        border
                                        border-gray-300
                                        px-4
                                        text-sm
                                        outline-none
                                        focus:border-[#ff3b30]
                                    "
                                    />
                                </div>
                            </div>

                            {/* botao */}
                            <div className="flex justify-end gap-4 mt-4">
                                <Botao
                                    texto="Cancelar"
                                    icone={<IoMdClose />}
                                    tela="/atletas"
                                />
                                <Botao
                                    texto="Criar Atleta"
                                    icone={<FaRegUser />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )     
}