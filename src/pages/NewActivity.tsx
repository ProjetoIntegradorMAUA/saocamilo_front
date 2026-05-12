import { useEffect, useState } from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";
import { fetchWeather, type WeatherData } from "../services/weather";
import { FiPlay, FiSquare, FiCheck, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const getWeatherIcon = (code: number) => {
    if (code === 0) return <WiDaySunny className="w-10 h-10 text-yellow-400" />;
    if (code >= 1 && code <= 3) return <WiCloudy className="w-10 h-10 text-gray-200" />;
    if (code >= 45 && code <= 48) return <WiFog className="w-10 h-10 text-gray-400" />;
    if (code >= 51 && code <= 67) return <WiRain className="w-10 h-10 text-blue-400" />;
    if (code >= 71 && code <= 77) return <WiSnow className="w-10 h-10 text-blue-200" />;
    if (code >= 95) return <WiThunderstorm className="w-10 h-10 text-purple-500" />;
    return <WiCloudy className="w-10 h-10 text-gray-200" />;
};

export default function NewActivity() {
    const [status, setStatus] = useState<'pre' | 'running' | 'post'>('pre');
    const [time, setTime] = useState(0);
    const [weather, setWeather] = useState<WeatherData | null>(null);

    // Pre-workout form
    const [currentWeight, setCurrentWeight] = useState('');
    const [urineColor, setUrineColor] = useState('');
    const [thirstLevel, setThirstLevel] = useState('');
    const [symptoms, setSymptoms] = useState('');

    // Post-workout form
    const [finalWeight, setFinalWeight] = useState('');
    const [liquidIngested, setLiquidIngested] = useState('');
    const [observations, setObservations] = useState('');

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const data = await fetchWeather(position.coords.latitude, position.coords.longitude);
                    setWeather(data);
                },
                async () => {
                    const data = await fetchWeather();
                    setWeather(data);
                }
            );
        } else {
            fetchWeather().then(setWeather);
        }
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (status === 'running') {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSave = () => {
        // Save logic here
        alert("Atividade salva com sucesso!");
        window.location.href = "/homepage";
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 w-full px-6 py-5 flex justify-between items-center bg-white/5 backdrop-blur-xl border-b border-white/10 z-20">
                <div className="flex items-center gap-4">
                    <Link to="/homepage" className="text-gray-400 hover:text-white transition-colors">
                        <FiArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-3">
                        {weather ? getWeatherIcon(weather.weathercode) : <WiCloudy className="w-10 h-10 text-gray-600 animate-pulse" />}
                    </div>
                </div>
                <div className="text-right">
                    {weather ? (
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                            {Math.round(weather.temperature)}°C
                        </div>
                    ) : (
                        <div className="text-3xl font-bold text-gray-600 animate-pulse">--°C</div>
                    )}
                </div>
            </header>

            <main className="w-full max-w-lg px-6 pt-32 pb-20 z-10 flex-1 flex flex-col">
                
                {status === 'pre' && (
                    <div className="animate-fade-in space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Nova Atividade</h1>
                            <p className="text-gray-400">Preencha os dados iniciais antes de começar o treino.</p>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Peso Atual (kg)</label>
                                <input 
                                    type="number" 
                                    value={currentWeight}
                                    onChange={(e) => setCurrentWeight(e.target.value)}
                                    placeholder="Ex: 75.5" 
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Cor da Urina (1 a 8)</label>
                                <select 
                                    value={urineColor}
                                    onChange={(e) => setUrineColor(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                                >
                                    <option value="" disabled>Selecione a cor...</option>
                                    {[1,2,3,4,5,6,7,8].map(num => (
                                        <option key={num} value={num}>Nível {num} {num <= 3 ? '(Hidratado)' : num <= 6 ? '(Desidratado)' : '(Muito Desidratado)'}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Nível de Sede</label>
                                <select 
                                    value={thirstLevel}
                                    onChange={(e) => setThirstLevel(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                                >
                                    <option value="" disabled>Selecione o nível...</option>
                                    <option value="nenhuma">Nenhuma</option>
                                    <option value="leve">Leve</option>
                                    <option value="moderada">Moderada</option>
                                    <option value="intensa">Intensa</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Sintomas (opcional)</label>
                                <textarea 
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    placeholder="Ex: dor de cabeça, cansaço..." 
                                    rows={3}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <button 
                            onClick={() => setStatus('running')}
                            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all flex justify-center items-center gap-2 transform hover:-translate-y-1"
                        >
                            <FiPlay className="w-6 h-6" /> Iniciar Atividade
                        </button>
                    </div>
                )}

                {status === 'running' && (
                    <div className="flex-1 flex flex-col items-center justify-center animate-fade-in relative">
                        {/* Pulse Ring */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full animate-ping pointer-events-none"></div>
                        
                        <div className="relative z-10 w-64 h-64 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-2">Tempo Decorrido</span>
                            <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 font-mono">
                                {formatTime(time)}
                            </div>
                        </div>

                        <button 
                            onClick={() => setStatus('post')}
                            className="relative z-10 mt-16 w-full max-w-xs bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white font-bold text-lg py-4 rounded-2xl transition-all flex justify-center items-center gap-2 cursor-pointer"
                        >
                            <FiSquare className="w-5 h-5" /> Encerrar Atividade
                        </button>
                    </div>
                )}

                {status === 'post' && (
                    <div className="animate-fade-in space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Fim de Treino</h1>
                            <p className="text-gray-400">Tempo total: <span className="text-white font-mono">{formatTime(time)}</span></p>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Peso Final (kg)</label>
                                <input 
                                    type="number" 
                                    value={finalWeight}
                                    onChange={(e) => setFinalWeight(e.target.value)}
                                    placeholder="Ex: 74.2" 
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Líquido Ingerido (ml)</label>
                                <input 
                                    type="number" 
                                    value={liquidIngested}
                                    onChange={(e) => setLiquidIngested(e.target.value)}
                                    placeholder="Ex: 1000" 
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Observações (opcional)</label>
                                <textarea 
                                    value={observations}
                                    onChange={(e) => setObservations(e.target.value)}
                                    placeholder="Como foi o treino? Dificuldades?" 
                                    rows={3}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <button 
                            onClick={handleSave}
                            className="w-full mt-8 bg-emerald-600 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex justify-center items-center gap-2 transform hover:-translate-y-1"
                        >
                            <FiCheck className="w-6 h-6" /> Salvar Atividade
                        </button>
                    </div>
                )}

            </main>
        </div>
    );
}
