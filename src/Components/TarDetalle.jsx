import React, { useState, useEffect } from 'react';
import { fetchWeatherByCapital } from '../api/ClimaApi';
import Loader from './Loader';
import WeatherInfo from './InfoClima';

export default function TarDetalle({ country, onClose }) {
const [weather, setWeather] = useState(null);
const [loadingWeather, setLoadingWeather] = useState(false);
const [errorWeather, setErrorWeather] = useState('');
const [retry, setRetry] = useState(0);

const capital = country?.capital?.[0] || '';

useEffect(() => {
if (!country) {
setWeather(null);
setErrorWeather('');
setLoadingWeather(false);
return;
}

let cancelled = false;

const loadWeather = async () => {
  setWeather(null);
  setErrorWeather('');

  if (!capital) {
    setLoadingWeather(false);
    setErrorWeather(
      'Este país no tiene una capital disponible.'
    );
    return;
  }

  setLoadingWeather(true);

  try {
    const data = await fetchWeatherByCapital(capital);

    if (!cancelled) {
      setWeather(data);
    }
  } catch (err) {
    if (!cancelled) {
      setErrorWeather(
        err.message || 'No fue posible consultar el clima.'
      );
    }
  } finally {
    if (!cancelled) {
      setLoadingWeather(false);
    }
  }
};

loadWeather();

return () => {
  cancelled = true;
};

}, [country, capital, retry]);

if (!country) {
return null;
}

const population =
typeof country.population === 'number'
? country.population.toLocaleString('es-SV')
: 'No disponible';

return (
<div
className="modal-overlay"
onClick={onClose}
>
<div
className="modal"
role="dialog"
aria-modal="true"
aria-labelledby="country-title"
onClick={(event) => event.stopPropagation()}
>
<button
type="button"
className="close-button"
onClick={onClose}
aria-label="Cerrar detalles"
>
×
</button>

    <div className="detail-header">
      <img
        src={country.flags?.svg || country.flags?.png}
        alt={`Bandera de ${country.name?.common || 'país'}`}
        className="country-flag"
      />

      <div className="country-info">
        <h2 id="country-title">
          {country.name?.common || 'País sin nombre'}
        </h2>

        <p>
          Región: {country.region || 'No disponible'}
        </p>
      </div>
    </div>

    <section className="detail-section">
      <p>
        <strong>Población:</strong> {population}
      </p>

      <p>
        <strong>Capital:</strong>{' '}
        {capital || 'No disponible'}
      </p>
    </section>

    <section className="detail-section">
      {loadingWeather ? (
        <>
          <h3>Clima en la capital</h3>
          <p>
            Consultando el clima de {capital}...
          </p>
          <Loader />
        </>
      ) : errorWeather ? (
        <div className="weather-box">
          <h3>No se pudo consultar el clima</h3>

          <p className="error-message">
            {errorWeather}
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => setRetry((value) => value + 1)}
          >
            Reintentar
          </button>
        </div>
      ) : weather ? (
        <WeatherInfo weather={weather} />
      ) : null}
    </section>
  </div>
</div>

);
}