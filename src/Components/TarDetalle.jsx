import { useState, useEffect } from 'react';
import { getWeatherByCity } from '../api/ClimaApiApi';
import { WeatherInfo } from './InfoClima';
import { Loader } from './Loader';

export const CountryDetail = ({ country, onBack }) => {
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const capital = country.capital?.[0];
    if (!capital) {
      setWeatherError('Este país no cuenta con una capital registrada para consultar el clima.');
      return;
    }

    const fetchWeather = async () => {
      setLoadingWeather(true);
      setWeatherError(null);
      try {
        const data = await getWeatherByCity(capital);
        setWeather(data);
      } catch (err) {
        setWeatherError('No se pudo cargar el clima para esta capital.');
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, [country]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-200">
      <button 
        onClick={onBack}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        ← Volver a la lista
      </button>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img 
          src={country.flags?.svg || country.flags?.png} 
          alt={`Bandera de ${country.name?.common}`} 
          className="w-48 h-32 object-cover rounded-lg shadow-md border"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">{country.name?.common}</h2>
          <p className="text-lg text-gray-600 mt-1">Capital: <span className="font-medium text-gray-800">{country.capital?.[0] || 'N/A'}</span></p>
          <p className="text-sm text-gray-500 mt-1">Región: {country.region}</p>
          <p className="text-sm text-gray-500">Población: {country.population?.toLocaleString()}</p>
        </div>
      </div>

      {loadingWeather && <Loader />}
      {weatherError && <p className="text-red-500 text-center font-medium my-4">{weatherError}</p>}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
};