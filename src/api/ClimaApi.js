const API_KEY = import.meta.env.VITE_API_CLIMA_KEY;

export const fetchWeatherByCapital = async (capital) => {
if (!capital) {
throw new Error('Este país no tiene una capital disponible.');
}

if (!API_KEY) {
throw new Error(
'Falta configurar VITE_API_CLIMA_KEY en el archivo .env.'
);
}

const url =
"https://api.openweathermap.org/data/2.5/weather" +
"?q=${encodeURIComponent(capital)}" +
"&units=metric&lang=es&appid=${API_KEY}";

const response = await fetch(url);

if (!response.ok) {
if (response.status === 401) {
throw new Error(
'La clave de OpenWeatherMap no es válida o todavía no está activa.'
);
}

if (response.status === 404) {
  throw new Error(
    'No se encontró el clima para esta capital.'
  );
}

throw new Error(
  `Error al consultar el clima: ${response.status}.`
);

}

return await response.json();
};