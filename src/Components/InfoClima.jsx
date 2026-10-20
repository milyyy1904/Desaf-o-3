import React from 'react';

export const WeatherInfo = ({ weather }) => {
// Validar que existan los datos necesarios antes de mostrarlos.
if (
!weather ||
!weather.main ||
!weather.weather?.[0] ||
!weather.wind
) {
return null;
}

return (
<div className="weather-box">
<h3>Clima actual en la capital</h3>

  <div className="weather-grid">
    <p>
      <strong>Temperatura:</strong>{' '}
      {typeof weather.main.temp === 'number'
        ? `${Math.round(weather.main.temp)} °C`
        : 'No disponible'}
    </p>

    <p>
      <strong>Estado:</strong>{' '}
      <span className="capitalize">
        {weather.weather[0].description || 'No disponible'}
      </span>
    </p>

    <p>
      <strong>Humedad:</strong>{' '}
      {typeof weather.main.humidity === 'number'
        ? `${weather.main.humidity}%`
        : 'No disponible'}
    </p>

    <p>
      <strong>Viento:</strong>{' '}
      {typeof weather.wind.speed === 'number'
        ? `${weather.wind.speed} m/s`
        : 'No disponible'}
    </p>
  </div>
</div>

);
};

export default WeatherInfo;