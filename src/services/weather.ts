export interface WeatherData {
    temperature: number;
    weathercode: number;
    humidity?: number;
    windSpeed?: number;
}

// Fallback to São Caetano do Sul coordinates
const DEFAULT_LAT = -23.6226;
const DEFAULT_LON = -46.5489;

export async function fetchWeather(lat?: number, lon?: number): Promise<WeatherData | null> {
    const latitude = lat ?? DEFAULT_LAT;
    const longitude = lon ?? DEFAULT_LON;

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );
        const data = await response.json();
        
        if (data && data.current) {
            return {
                temperature: data.current.temperature_2m,
                weathercode: data.current.weather_code,
                humidity: data.current.relative_humidity_2m,
                windSpeed: data.current.wind_speed_10m,
            };
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch weather data", error);
        return null;
    }
}

