import { useEffect, useState } from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";
import { fetchWeather, type WeatherData } from "../services/weather";
import { FiPlay, FiSquare, FiCheck, FiArrowLeft, FiTrash, FiPlus, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { createAvaliacao } from "../services/api";

const getWeatherIcon = (code: number) => {
    if (code === 0) return <WiDaySunny className="w-10 h-10 text-yellow-400" />;
    if (code >= 1 && code <= 3) return <WiCloudy className="w-10 h-10 text-gray-400" />;
    if (code >= 45 && code <= 48) return <WiFog className="w-10 h-10 text-gray-500" />;
    if (code >= 51 && code <= 67) return <WiRain className="w-10 h-10 text-blue-500" />;
    if (code >= 71 && code <= 77) return <WiSnow className="w-10 h-10 text-blue-300" />;
    if (code >= 95) return <WiThunderstorm className="w-10 h-10 text-purple-600" />;
    return <WiCloudy className="w-10 h-10 text-gray-400" />;
};

const SPORTS_LIST = [
    { name: 'Futebol de Campo', isOutdoor: true },
    { name: 'Corrida de Rua / Corrida', isOutdoor: true },
    { name: 'Ciclismo', isOutdoor: true },
    { name: 'Natação (Mar Aberto)', isOutdoor: true },
    { name: 'Triatlo', isOutdoor: true },
    { name: 'Jiu-Jitsu', isOutdoor: false },
    { name: 'Futsal', isOutdoor: false },
    { name: 'Natação (Piscina)', isOutdoor: false },
    { name: 'Basquete', isOutdoor: false },
    { name: 'Musculação', isOutdoor: false },
    { name: 'Funcional', isOutdoor: false },
    { name: 'Crossfit', isOutdoor: false },
    { name: 'Vôlei', isOutdoor: false },
    { name: 'Outro (Ambiente Aberto)', isOutdoor: true },
    { name: 'Outro (Ambiente Fechado)', isOutdoor: false },
];

const URINE_COLORS = [
    { level: 1, color: '#F4EDB7', desc: 'Bem Hidratado' },
    { level: 2, color: '#F2DA3D', desc: 'Bem Hidratado' },
    { level: 3, color: '#F5C400', desc: 'Bem Hidratado' },
    { level: 4, color: 'rgb(230,175,0)', desc: 'Desidratado' },
    { level: 5, color: 'rgb(204,143,0)', desc: 'Desidratado' },
    { level: 6, color: '#A96A00', desc: 'Desidratado' },
    { level: 7, color: '#835012', desc: 'Severamente Desidratado' },
    { level: 8, color: 'rgb(111,71,23)', desc: 'Severamente Desidratado' }
];

interface FluidLog {
    id: string;
    amount: number;
    timeStr: string;
}

export default function NewActivity() {
    const navigate = useNavigate();
    const [status, setStatus] = useState<'pre' | 'running' | 'post'>('pre');
    const [time, setTime] = useState(0);
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const [modality, setModality] = useState('Corrida de Rua / Corrida');
    const [isOutdoor, setIsOutdoor] = useState(true);
    const [perceivedIntensity, setPerceivedIntensity] = useState<'LEVE' | 'MODERADA' | 'INTENSA'>('MODERADA');
    const [clothingType, setClothingType] = useState('Camiseta e Shorts');
    
    const [currentWeight, setCurrentWeight] = useState('');
    const [urineColor, setUrineColor] = useState<number>(3);
    const [thirstLevel, setThirstLevel] = useState<number>(2);
    const [preSymptoms, setPreSymptoms] = useState<string[]>([]);

    const [temperature, setTemperature] = useState('22');
    const [humidity, setHumidity] = useState('60');
    const [thermalSensation, setThermalSensation] = useState<'FRIO' | 'AGRADAVEL' | 'MORNO' | 'QUENTE' | 'MUITO_QUENTE'>('AGRADAVEL');
    const [windCondition, setWindCondition] = useState<'SEM_VENTO' | 'BRISA_LEVE' | 'VENTO_MODERADO' | 'VENTO_FORTE'>('BRISA_LEVE');
    const [solarExposure, setSolarExposure] = useState<'SOL_PLENO' | 'MEIA_SOMBRA' | 'SOMBRA' | 'COBERTO'>('SOL_PLENO');

    const [fluidLogs, setFluidLogs] = useState<FluidLog[]>([]);
    const [customFluid, setCustomFluid] = useState('');
    const [urineOutputML, setUrineOutputML] = useState('');

    const [finalWeight, setFinalWeight] = useState('');
    const [soakedClothing, setSoakedClothing] = useState(false);
    const [clothingChanged, setClothingChanged] = useState(false);
    const [postSymptoms, setPostSymptoms] = useState<string[]>([]);
    const [giTolerance, setGiTolerance] = useState<'EXCELENTE' | 'BOA' | 'MODERADA' | 'RUIM'>('BOA');
    const [observations, setObservations] = useState('');

    const [isSaving, setIsSaving] = useState(false);

    const handleModalityChange = (selectedSport: string) => {
        setModality(selectedSport);
        const sportObj = SPORTS_LIST.find(s => s.name === selectedSport);
        if (sportObj) {
            setIsOutdoor(sportObj.isOutdoor);
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const data = await fetchWeather(position.coords.latitude, position.coords.longitude);
                    if (data) {
                        setWeather(data);
                        setTemperature(String(Math.round(data.temperature)));
                        if (data.humidity !== undefined) {
                            setHumidity(String(data.humidity));
                        }
                        if (data.windSpeed !== undefined) {
                            const speed = data.windSpeed;
                            if (speed < 5) setWindCondition('SEM_VENTO');
                            else if (speed < 15) setWindCondition('BRISA_LEVE');
                            else if (speed < 28) setWindCondition('VENTO_MODERADO');
                            else setWindCondition('VENTO_FORTE');
                        }
                    }
                },
                async () => {
                    const data = await fetchWeather();
                    if (data) {
                        setWeather(data);
                        setTemperature(String(Math.round(data.temperature)));
                        if (data.humidity !== undefined) {
                            setHumidity(String(data.humidity));
                        }
                        if (data.windSpeed !== undefined) {
                            const speed = data.windSpeed;
                            if (speed < 5) setWindCondition('SEM_VENTO');
                            else if (speed < 15) setWindCondition('BRISA_LEVE');
                            else if (speed < 28) setWindCondition('VENTO_MODERADO');
                            else setWindCondition('VENTO_FORTE');
                        }
                    }
                }
            );
        } else {
            fetchWeather().then(data => {
                if (data) {
                    setWeather(data);
                    setTemperature(String(Math.round(data.temperature)));
                    if (data.humidity !== undefined) {
                        setHumidity(String(data.humidity));
                    }
                    if (data.windSpeed !== undefined) {
                        const speed = data.windSpeed;
                        if (speed < 5) setWindCondition('SEM_VENTO');
                        else if (speed < 15) setWindCondition('BRISA_LEVE');
                        else if (speed < 28) setWindCondition('VENTO_MODERADO');
                        else setWindCondition('VENTO_FORTE');
                    }
                }
            });
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

    // Log de fluidos durante
    const addFluid = (ml: number) => {
        const timestamp = new Date();
        const timeStr = `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}:${timestamp.getSeconds().toString().padStart(2, '0')}`;
        const newLog: FluidLog = {
            id: Math.random().toString(36).substr(2, 9),
            amount: ml,
            timeStr
        };
        setFluidLogs(prev => [newLog, ...prev]);
    };

    const removeFluid = (id: string) => {
        setFluidLogs(prev => prev.filter(log => log.id !== id));
    };

    const totalFluids = fluidLogs.reduce((sum, log) => sum + log.amount, 0);

    const togglePreSymptom = (symptom: string) => {
        setPreSymptoms(prev => 
            prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
        );
    };

    const togglePostSymptom = (symptom: string) => {
        setPostSymptoms(prev => 
            prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
        );
    };

    const handleSave = async () => {
        if (!currentWeight || !finalWeight) {
            alert("Peso pré e pós-exercício são obrigatórios para calcular a taxa de sudorese!");
            return;
        }

        setIsSaving(true);

        const payload = {
            currentWeight,
            finalWeight,
            liquidIngested: String(totalFluids),
            durationSeconds: time,
            urineColor: String(urineColor),
            thirstLevel: String(thirstLevel),
            preSymptoms,
            postSymptoms,
            observations,

            temperature,
            humidity: isOutdoor ? humidity : undefined,
            thermalSensation: isOutdoor ? thermalSensation : undefined,
            windCondition: isOutdoor ? windCondition : undefined,
            solarExposure: isOutdoor ? solarExposure : undefined,

            modality,
            perceivedIntensity,
            clothingType,

            foodIntakeWater: '0',
            urineOutputDuringML: urineOutputML || '0',

            soakedClothing,
            clothingChanged,
            giTolerance,

            isOutdoor
        };

        const response = await createAvaliacao(payload);

        setIsSaving(false);
        if (response.error) {
            alert("Erro ao salvar avaliação: " + response.error);
        } else {
            alert("Avaliação gravada e processada com sucesso no banco de dados!");
            navigate("/homepage");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] text-gray-800 font-sans flex flex-col items-center justify-center relative overflow-x-hidden">
            <header className="absolute top-0 left-0 right-0 w-full px-6 py-4 flex justify-between items-center bg-white border-b border-gray-150 shadow-sm z-20">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            if (status === 'running') {
                                setStatus('pre');
                            } else if (status === 'post') {
                                setStatus('running');
                            } else {
                                navigate('/homepage');
                            }
                        }}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <FiArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        {weather ? getWeatherIcon(weather.weathercode) : <WiCloudy className="w-10 h-10 text-gray-300 animate-pulse" />}
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider hidden sm:inline">{weather?.cityName || 'São Caetano do Sul'}</span>
                    </div>
                </div>
                <div className="text-right">
                    {weather ? (
                        <div className="text-3xl font-extrabold text-red-500">
                            {temperature}°C
                        </div>
                    ) : (
                        <div className="text-3xl font-bold text-gray-300 animate-pulse">--°C</div>
                    )}
                </div>
            </header>

            <main className="w-full max-w-2xl px-4 sm:px-6 pt-24 pb-20 z-10 flex-1 flex flex-col">
                
                {status === 'pre' && (
                    <div className="animate-fade-in space-y-6">
                        <div className="text-center mb-6 mt-4">
                            <h1 className="text-3xl font-black text-red-500 mb-1">Parâmetros Pré-Exercício</h1>
                            <p className="text-gray-500 text-sm">Preencha o protocolo médico-esportivo basal antes de iniciar.</p>
                        </div>
                        
                        <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl space-y-5">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                Atividade & Classificação de Ambiente
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Esporte (Modalidade)</label>
                                    <select 
                                        value={modality}
                                        onChange={(e) => handleModalityChange(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-350 rounded-xl px-3 py-3 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    >
                                        {SPORTS_LIST.map(sport => (
                                            <option key={sport.name} value={sport.name}>{sport.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tipo de Ambiente</label>
                                    <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200">
                                        <button
                                            type="button"
                                            onClick={() => setIsOutdoor(true)}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${isOutdoor ? 'bg-red-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                                        >
                                            Aberto (Outdoor)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsOutdoor(false)}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!isOutdoor ? 'bg-red-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                                        >
                                            Fechado (Indoor)
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-1">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Vestimenta & Equipamento</label>
                                <input 
                                    type="text" 
                                    value={clothingType}
                                    onChange={(e) => setClothingType(e.target.value)}
                                    placeholder="Ex: Camiseta + Shorts, Kimono..." 
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Intensidade Percebida</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['LEVE', 'MODERADA', 'INTENSA'] as const).map(intensity => (
                                        <button
                                            type="button"
                                            key={intensity}
                                            onClick={() => setPerceivedIntensity(intensity)}
                                            className={`py-3 text-xs font-extrabold rounded-xl transition-all border ${
                                                perceivedIntensity === intensity 
                                                ? 'bg-red-50 border-red-500 text-red-600 ring-2 ring-red-500/20' 
                                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {intensity}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                    Variáveis Ambientais
                                </h2>
                                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${isOutdoor ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {isOutdoor ? 'Automáticas do Clima' : 'Indoor Simplificado'}
                                </span>
                            </div>

                            {isOutdoor ? (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Temperatura (°C)</label>
                                            <input 
                                                type="number" 
                                                value={temperature}
                                                onChange={(e) => setTemperature(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Umidade Relativa do Ar (%)</label>
                                            <input 
                                                type="number" 
                                                value={humidity}
                                                onChange={(e) => setHumidity(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-855 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Condição do Vento</label>
                                            <select 
                                                value={windCondition}
                                                onChange={(e: any) => setWindCondition(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                            >
                                                <option value="SEM_VENTO">Sem Vento</option>
                                                <option value="BRISA_LEVE">Brisa Leve</option>
                                                <option value="VENTO_MODERADO">Vento Moderado</option>
                                                <option value="VENTO_FORTE">Vento Forte</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Exposição Solar</label>
                                            <select 
                                                value={solarExposure}
                                                onChange={(e: any) => setSolarExposure(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                            >
                                                <option value="SOL_PLENO">Sol Pleno</option>
                                                <option value="MEIA_SOMBRA">Meia Sombra</option>
                                                <option value="SOMBRA">Sombra</option>
                                                <option value="COBERTO">Coberto / Toldo</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sensação Térmica</label>
                                            <select 
                                                value={thermalSensation}
                                                onChange={(e: any) => setThermalSensation(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                            >
                                                <option value="FRIO">Frio</option>
                                                <option value="AGRADAVEL">Agradável</option>
                                                <option value="MORNO">Morno</option>
                                                <option value="QUENTE">Quente</option>
                                                <option value="MUITO_QUENTE">Muito Quente</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-fade-in py-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Temperatura do Recinto (°C)</label>
                                            <input 
                                                type="number" 
                                                value={temperature}
                                                onChange={(e) => setTemperature(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                            />
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-500">
                                            <strong>Esporte Fechado:</strong> Informações de umidade externa, vento e exposição solar foram desconsideradas e ocultadas para maior simplicidade e fidelidade clínica do protocolo.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                Medidas Basais & Estado Corporativo
                            </h2>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Massa Corporal Pré-Exercício (kg)</label>
                                <span className="text-[10px] text-gray-400 block mb-2">Realizar pesagem após esvaziamento vesical completo e com vestimenta padronizada.</span>
                                <input 
                                    type="number" 
                                    value={currentWeight}
                                    onChange={(e) => setCurrentWeight(e.target.value)}
                                    placeholder="Ex: 78.4" 
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                />
                            </div>

                           
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cor da Urina Basal (Escala Visual)</label>
                                <span className="text-[10px] text-gray-400 block mb-3">Toque na cor correspondente para selecionar:</span>
                                
                                <div className="grid grid-cols-8 gap-2 sm:gap-3 py-2">
                                    {URINE_COLORS.map(item => (
                                        <button
                                            type="button"
                                            key={item.level}
                                            onClick={() => setUrineColor(item.level)}
                                            style={{ backgroundColor: item.color }}
                                            className={`h-12 sm:h-16 rounded-xl relative transition-all duration-200 transform hover:scale-105 shadow-sm border ${
                                                urineColor === item.level 
                                                ? 'ring-4 ring-red-500 scale-102 border-white' 
                                                : 'border-gray-250 hover:brightness-95'
                                            }`}
                                            title={`Nível ${item.level}: ${item.desc}`}
                                        >
                                            <span className={`absolute inset-0 flex items-center justify-center font-bold text-xs ${item.level >= 6 ? 'text-white' : 'text-gray-800'}`}>
                                                {item.level}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4 p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all duration-300 bg-gray-50 border-gray-200">
                                    <div>
                                        <span className="text-gray-500">Classificação Basal:</span>
                                        <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider ${
                                            urineColor <= 3 ? 'bg-green-150 text-green-700' : urineColor <= 6 ? 'bg-yellow-150 text-yellow-700' : 'bg-red-150 text-red-700'
                                        }`}>
                                            {urineColor <= 3 ? 'BEM HIDRATADO' : urineColor <= 6 ? 'DESIDRATADO' : 'SEVERAMENTE DESIDRATADO'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 hidden sm:block">
                                        {urineColor <= 3 
                                            ? 'Excelente estado para iniciar!' 
                                            : urineColor <= 6 
                                            ? 'Recomenda-se tomar 350mL de água antes.' 
                                            : 'Alerta: Ingerir fluidos imediatamente!'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sensação Basal de Sede</label>
                                <div className="grid grid-cols-5 gap-1.5">
                                    {[1, 2, 3, 4, 5].map(level => (
                                        <button
                                            type="button"
                                            key={level}
                                            onClick={() => setThirstLevel(level)}
                                            className={`py-3 text-xs font-bold rounded-xl transition-all border ${
                                                thirstLevel === level 
                                                ? 'bg-red-50 border-red-500 text-red-600 ring-2 ring-red-500/20' 
                                                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                                            }`}
                                        >
                                            {level === 1 ? 'Nenhuma (1)' : level === 5 ? 'Extrema (5)' : level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sintomas Presentes (Basal)</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Dor de Cabeça', 'Tontura', 'Cansaço / Fadiga', 'Náusea', 'Cãibra muscular', 'Boca Seca'].map(symptom => {
                                        const active = preSymptoms.includes(symptom);
                                        return (
                                            <button
                                                type="button"
                                                key={symptom}
                                                onClick={() => togglePreSymptom(symptom)}
                                                className={`px-3 py-2 text-xs font-medium rounded-full transition-all border ${
                                                    active 
                                                    ? 'bg-red-500 border-transparent text-white shadow-sm' 
                                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {symptom}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setStatus('running')}
                            className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-all flex justify-center items-center gap-2 transform hover:-translate-y-1 cursor-pointer"
                        >
                            <FiPlay className="w-6 h-6 animate-pulse" /> Iniciar Atividade
                        </button>
                    </div>
                )}

                {status === 'running' && (
                    <div className="flex-1 flex flex-col animate-fade-in space-y-6">
                        <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/10 rounded-full animate-ping pointer-events-none"></div>
                            
                            <div className="relative z-10 w-44 h-44 bg-red-50/50 border-2 border-red-100 rounded-full flex flex-col items-center justify-center">
                                <span className="text-[10px] text-red-500 font-extrabold uppercase tracking-widest mb-1">Decorrendo</span>
                                <div className="text-4xl font-black text-gray-800 font-mono">
                                    {formatTime(time)}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl space-y-5">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                    Ingestão de Fluidos (mL)
                                </h2>
                                <span className="text-xl font-extrabold text-red-500 font-mono bg-red-50 px-3 py-1 rounded-xl">
                                    {totalFluids} mL
                                </span>
                            </div>

                            {/* ATALHOS RÁPIDOS */}
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => addFluid(200)}
                                    className="bg-gray-50 border border-gray-200 hover:bg-red-50 hover:border-red-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 transition-all group"
                                >
                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-red-500">Copo d'Água</span>
                                    <span className="text-lg font-extrabold text-gray-700 font-mono group-hover:text-red-600">+200 mL</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => addFluid(250)}
                                    className="bg-gray-50 border border-gray-200 hover:bg-red-50 hover:border-red-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 transition-all group"
                                >
                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-red-500">Squeeze / Garrafinha</span>
                                    <span className="text-lg font-extrabold text-gray-700 font-mono group-hover:text-red-600">+250 mL</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => addFluid(500)}
                                    className="bg-gray-50 border border-gray-200 hover:bg-red-50 hover:border-red-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 transition-all group"
                                >
                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-red-500">Garrafa Grande</span>
                                    <span className="text-lg font-extrabold text-gray-700 font-mono group-hover:text-red-600">+500 mL</span>
                                </button>
                            </div>

                            {/* INGESTÃO PERSONALIZADA */}
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={customFluid}
                                    onChange={(e) => setCustomFluid(e.target.value)}
                                    placeholder="Volume personalizado em mL"
                                    className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!customFluid) return;
                                        addFluid(Number(customFluid));
                                        setCustomFluid('');
                                    }}
                                    className="bg-gray-800 text-white font-bold px-5 rounded-xl text-xs hover:bg-gray-900 transition flex items-center gap-1 shrink-0"
                                >
                                    <FiPlus /> Registrar
                                </button>
                            </div>

                            {/* HISTÓRICO DE CLIQUES DENTRO DA SESSÃO */}
                            {fluidLogs.length > 0 && (
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150 space-y-2">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Histórico de Ingestões Deste Treino</p>
                                    <div className="max-h-28 overflow-y-auto space-y-1.5 pr-2 font-mono text-xs">
                                        {fluidLogs.map(log => (
                                            <div key={log.id} className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2">
                                                <span className="text-gray-700 font-semibold font-sans">+{log.amount} mL <span className="text-[10px] text-gray-400 font-mono">às {log.timeStr}</span></span>
                                                <button
                                                    onClick={() => removeFluid(log.id)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-1 transition"
                                                    title="Excluir entrada"
                                                >
                                                    <FiTrash className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* MÓDULO 2: EXCREÇÃO OCORRIDA (URINA) */}
                        <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl space-y-4">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                Nutrição & Excreção Ocorrida
                            </h2>

                            <div className="pt-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Volume Urinário Durante a Sessão (mL)</label>
                                <span className="text-[10px] text-gray-400 block mb-2">Se o atleta urinou durante o exercício, informe o volume estimado abaixo. Esse volume reduzirá a perda hídrica atribuída apenas ao suor.</span>
                                
                                {/* ATALHOS RÁPIDOS PARA URINA */}
                                <div className="grid grid-cols-4 gap-2 mb-3">
                                    {[100, 200, 300, 400].map(vol => {
                                        const isSelected = Number(urineOutputML) === vol;
                                        return (
                                            <button
                                                type="button"
                                                key={vol}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setUrineOutputML('');
                                                    } else {
                                                        setUrineOutputML(String(vol));
                                                    }
                                                }}
                                                className={`py-2 text-xs font-extrabold rounded-xl transition-all border ${
                                                    isSelected 
                                                    ? 'bg-red-50 border-red-500 text-red-650 ring-2 ring-red-500/20' 
                                                    : 'bg-gray-50 border-gray-200 text-gray-550 hover:bg-gray-100'
                                                }`}
                                            >
                                                {vol} mL
                                            </button>
                                        );
                                    })}
                                </div>

                                <input
                                    type="number"
                                    value={urineOutputML}
                                    onChange={(e) => setUrineOutputML(e.target.value)}
                                    placeholder="Ou digite o volume personalizado em mL"
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={() => setStatus('post')}
                            className="w-full mt-6 bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 hover:shadow-sm font-bold text-lg py-4 rounded-2xl transition-all flex justify-center items-center gap-2 cursor-pointer"
                        >
                            <FiSquare className="w-5 h-5 animate-pulse" /> Encerrar Atividade
                        </button>
                    </div>
                )}

                {status === 'post' && (
                    <div className="animate-fade-in space-y-6">
                        <div className="text-center mb-6 mt-4">
                            <h1 className="text-3xl font-black text-red-500 mb-1">Métricas Pós-Exercício</h1>
                            <p className="text-gray-500 text-sm">Treino encerrado! Tempo Total: <span className="text-gray-800 font-mono font-black">{formatTime(time)}</span></p>
                        </div>
                        
                      
                        <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl space-y-5">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                Pesagem Final
                            </h2>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Massa Corporal Pós-Exercício (kg)</label>
                                <span className="text-[10px] text-gray-400 block -mt-1 mb-2">Realizar nas mesmíssimas condições do pré (esvaziamento vesical e pele seca).</span>
                                <input 
                                    type="number" 
                                    value={finalWeight}
                                    onChange={(e) => setFinalWeight(e.target.value)}
                                    placeholder="Ex: 77.2" 
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-1">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="soakedClothing"
                                        checked={soakedClothing}
                                        onChange={(e) => setSoakedClothing(e.target.checked)}
                                        className="w-5 h-5 accent-red-500 border-gray-300 rounded focus:ring-red-400"
                                    />
                                    <label htmlFor="soakedClothing" className="text-xs font-bold text-gray-600 cursor-pointer">Roupas muito encharcadas?</label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="clothingChanged"
                                        checked={clothingChanged}
                                        onChange={(e) => setClothingChanged(e.target.checked)}
                                        className="w-5 h-5 accent-red-500 border-gray-300 rounded focus:ring-red-400"
                                    />
                                    <label htmlFor="clothingChanged" className="text-xs font-bold text-gray-600 cursor-pointer">Trocou de vestimenta p/ pesagem?</label>
                                </div>
                            </div>

                      
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 space-y-2 flex gap-3">
                                <FiInfo className="w-8 h-8 text-red-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-red-800 leading-relaxed">
                                    <strong className="block mb-1">Importante: Impacto no Erro da Medida</strong>
                                    Se o atleta estiver com roupas muito encharcadas e se pesar com elas sem trocá-las por roupas secas (ou se pesar sem roupas), a água retida nas fibras do tecido será incorretamente computada como peso corporal real. Isso mascarará a perda de massa real e subestimará gravemente a taxa de sudorese!
                                </div>
                            </div>
                        </div>

                      
                        <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                Sintomas Pós-Treino & Tolerância
                            </h2>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sintomas Gastrointestinais ou de Fadiga Experimentados</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Náusea', 'Cãibra Gastrointestinal', 'Fadiga Extrema', 'Cefaleia', 'Enjoos / Vômito', 'Tontura', 'Desconforto Gástrico'].map(symptom => {
                                        const active = postSymptoms.includes(symptom);
                                        return (
                                            <button
                                                type="button"
                                                key={symptom}
                                                onClick={() => togglePostSymptom(symptom)}
                                                className={`px-3 py-2 text-xs font-medium rounded-full transition-all border ${
                                                    active 
                                                    ? 'bg-red-500 border-transparent text-white shadow-sm' 
                                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {symptom}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tolerância Gastrointestinal ao Plano Hídrico</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {(['EXCELENTE', 'BOA', 'MODERADA', 'RUIM'] as const).map(level => (
                                        <button
                                            type="button"
                                            key={level}
                                            onClick={() => setGiTolerance(level)}
                                            className={`py-3 text-xs font-extrabold rounded-xl transition-all border ${
                                                giTolerance === level 
                                                ? 'bg-red-50 border-red-500 text-red-650 ring-2 ring-red-500/20' 
                                                : 'bg-gray-50 border-gray-200 text-gray-550 hover:bg-gray-100'
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Observações e Feedback Clínico</label>
                                <textarea 
                                    value={observations}
                                    onChange={(e) => setObservations(e.target.value)}
                                    placeholder="Registre impressões clínicas relevantes, dificuldades no plano ou observações do técnico/atleta." 
                                    rows={3}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`w-full mt-6 ${isSaving ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-all flex justify-center items-center gap-2 transform ${isSaving ? '' : 'hover:-translate-y-1'} cursor-pointer`}
                        >
                            {isSaving ? (
                                <span>Salvando e processando...</span>
                            ) : (
                                <>
                                    <FiCheck className="w-6 h-6" /> Concluir e Salvar Atividade
                                </>
                            )}
                        </button>
                    </div>
                )}

            </main>
        </div>
    );
}
