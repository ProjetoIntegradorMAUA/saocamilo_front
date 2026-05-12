import { FaHeartbeat, FaHistory, FaRegUser } from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { GiRemedy } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Navbar from "../components/Navbar";
import Botao from "../components/Botao";
import Input from "../components/Input";
import Select from "../components/Select";
import Textarea from "../components/TextArea";

export default function AdicionarAtletas() {
    return (
        <>
            <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
                <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                    <Navbar index={1} />
                </div>

                <div className="flex-1 h-screen bg-[#f5f5f5] p-3 flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-[1550px] h-[95vh] bg-white rounded-3xl border border-gray-200 shadow-sm p-4 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="border border-gray-200 rounded-3xl p-4 flex flex-col gap-4">
                                <h2 className="text-[#ff3b30] text-sm font-semibold flex items-center gap-3">
                                    <span>
                                        <FaRegUser />
                                    </span>
                                    Informações Pessoais
                                </h2>

                                <Input label="Nome:" placeholder="Nome Completo." />

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
                            <div className="flex flex-col gap-4">
                                <div className="border border-gray-200 rounded-3xl p-4 flex flex-col gap-4">
                                    <h2 className="text-[#ff3b30] text-sm font-semibold flex items-center gap-3">
                                        <span>
                                            <FaHeartbeat />
                                        </span>
                                        Dados Fisiológicos
                                    </h2>

                                    <Select
                                        label="Suor salgado:"
                                        options={["Sim", "Não"]}
                                    />

                                    <Select
                                        label="Percepção de sudorese:"
                                        options={["Baixa", "Moderada", "Alta"]}
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
                                        <span>
                                            <GiRemedy />
                                        </span>
                                        Medicação
                                    </h2>

                                    <Select
                                        label="Uso de medicamentos diuréticos:"
                                        options={["Sim", "Não"]}
                                    />
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-3xl p-4 flex flex-col gap-4">
                                <h2 className="text-[#ff3b30] text-sm font-semibold flex items-center gap-3">
                                    <span>
                                        <BsDroplet />
                                    </span>
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

                        <div className="border border-gray-200 rounded-3xl p-4 mt-6 flex flex-col lg:flex-row lg:items-center gap-4">
                            <h2 className="text-[#ff3b30] text-sm font-semibold flex items-center gap-3 min-w-fit">
                                <span>
                                    <FaHistory />
                                </span>
                                Histórico
                            </h2>

                            <div className="w-full">
                                <label className="text-sm text-gray-700 font-medium block mb-2">
                                    Histórico de desidratação:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Descreva o histórico de desidratação."
                                    className="w-full h-11 rounded-2xl border border-gray-300 px-4 text-sm outline-none focus:border-[#ff3b30]"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-4">
                            <button className="h-11 px-8 text-gray-700 text-sm font-medium">
                                <Botao texto="Cancelar" icone={<IoMdClose />} tela="/atletas"/>
                            </button>

                            <button className="h-11 px-8 rounded-2xl text-white text-sm font-medium">
                                <Botao
                                    texto="Criar Atleta"
                                    icone={<FaRegUser />}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

