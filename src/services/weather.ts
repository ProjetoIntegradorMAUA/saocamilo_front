export interface WeatherData {
    temperature: number;
    weathercode: number;
}

// Fallback to São Caetano do Sul coordinates
const DEFAULT_LAT = -23.6226;
const DEFAULT_LON = -46.5489;

export async function fetchWeather(lat?: number, lon?: number): Promise<WeatherData | null> {
    const latitude = lat ?? DEFAULT_LAT;
    const longitude = lon ?? DEFAULT_LON;

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await response.json();
        
        if (data && data.current_weather) {
            return {
                temperature: data.current_weather.temperature,
                weathercode: data.current_weather.weathercode,
            };
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch weather data", error);
        return null;
    }
}
