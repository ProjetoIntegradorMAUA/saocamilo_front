import { icons } from "../utils/IconsJson";

export default function EscalaUrina() {
    return (
        <div>
            <div className="flex items-center gap-2 text-3xl  text-black mb-4">
                <span className="border rounded-3xl">{icons.estrela}</span>
                <p> Escala Visual </p>
            </div>
            <div className="border rounded-3xl gap-3 py-4 sm:py-8 w-full bg-white px-2 sm:px-8">
                <p className="text-center text-gray-600 text-xs sm:text-base mb-4 sm:mb-8">
                    Utilize para estimular o estado de hidratação basal do
                    atleta antes do início da sessão.
                </p>
                <div className="flex justify-center items-center gap-4 flex-wrap mb-8 ">
                    {/** compactar blocos em telas pequenas */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-28 h-10 sm:h-20 rounded-2xl bg-[#F4EDB7]"></div>
                        <p className="mt-1 text-xs sm:text-lg font-medium">Nível 1</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-28 h-10 sm:h-20 rounded-2xl bg-[#F2DA3D]"></div>
                        <p className="mt-1 text-xs sm:text-lg font-medium">Nível 2</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-28 h-10 sm:h-20 rounded-2xl bg-[#F5C400]"></div>
                        <p className="mt-1 text-xs sm:text-lg font-medium">Nível 3</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-28 h-10 sm:h-20 rounded-2xl bg-[rgb(230,175,0)]"></div>
                        <p className="mt-1 text-xs sm:text-lg font-medium">Nível 4</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-28 h-10 sm:h-20 rounded-2xl bg-[rgb(204,143,0)]"></div>
                        <p className="mt-1 text-xs sm:text-lg font-medium">Nível 5</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-28 h-10 sm:h-20 rounded-2xl bg-[#A96A00]"></div>
                        <p className="mt-1 text-xs sm:text-lg font-medium">Nível 6</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-28 h-10 sm:h-20 rounded-2xl bg-[#835012]"></div>
                        <p className="mt-1 text-xs sm:text-lg font-medium">Nível 7</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-28 h-10 sm:h-20 rounded-2xl bg-[rgb(111,71,23)]"></div>
                        <p className="mt-1 text-xs sm:text-lg font-medium">Nível 8</p>
                    </div>
                </div>
                <div className="w-full max-w-275 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 items-stretch">
                        <div className="bg-[#A7E7B6] border rounded-xl px-4 py-3 text-gray-800 font-medium text-center min-h-[56px] flex items-center justify-center text-sm sm:text-base">
                            Níveis 1-3: Bem Hidratado
                        </div>
                        <div className="bg-[#F5EDB5] border rounded-xl px-4 py-3 text-gray-800 font-medium text-center min-h-[56px] flex items-center justify-center text-sm sm:text-base">
                            Níveis 4-6: Desidratado
                        </div>
                        <div className="bg-[#F6A3A8] border rounded-xl px-4 py-3 text-gray-800 font-medium text-center min-h-[56px] flex items-center justify-center text-sm sm:text-base">
                            Níveis 7-8: Severamente Desidratado
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
