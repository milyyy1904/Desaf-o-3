const API_KEY = import.meta.env.API_CLIMA_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (capitalName) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${capitalName}&units=metric&lang=es&appid=${API_KEY}`);
    if (!response.ok) throw new Error('No se pudo obtener la información del clima');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};