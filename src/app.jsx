import React, { useState, useEffect } from 'react';
import { fetchCountries } from './api/PaisesApi';
import Loader from './Components/Loader';
import CountryCard from './Components/TarPais';
import TarDetalle from './Components/TarDetalle';

export default function App() {
const [countries, setCountries] = useState([]);
const [search, setSearch] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [selectedCountry, setSelectedCountry] = useState(null);

const [usingBackup, setUsingBackup] = useState(false);


useEffect(() => {
let cancelled = false;

const loadCountries = async () => {
setLoading(true);
setError('');

try {
const result = await fetchCountries();

if (
  !result ||
  !Array.isArray(result.countries)
) {
  throw new Error('La respuesta de países no es válida.');
}

if (!cancelled) {
  setCountries(result.countries);
  setUsingBackup(result.usingBackup);
}

} catch (err) {
if (!cancelled) {
setError(
err.message || 'No se pudo cargar la lista de países.'
);
}
} finally {
if (!cancelled) {
setLoading(false);
}
}
};

loadCountries();

return () => {
  cancelled = true;
};

}, []);

// Normaliza el texto para permitir búsquedas sin tildes.
const normalizeText = (text) =>
(text || '')
.normalize('NFD')
.replace(/[\u0300-\u036f]/g, '')
.toLocaleLowerCase('es')
.trim();

// Busca por nombre del país o nombre de su capital.
const query = normalizeText(search);

const filteredCountries = countries.filter((country) => {
const name = normalizeText(country.name?.common);
const capital = normalizeText(country.capital?.[0]);

return name.includes(query) || capital.includes(query);

});

if (loading) {
return (
<main className="app-container">
<div className="content">
<div className="header">
<h1>Portal de Países y Clima</h1>
<p>Cargando información de los países...</p>
</div>
<Loader />
</div>
</main>
);
}

if (error) {
return (
<main className="app-container">
<div className="content message">
<p className="error-message">{error}</p>

      <button
        type="button"
        className="primary-button"
        onClick={() => window.location.reload()}
      >
        Volver a intentar
      </button>
    </div>
  </main>
);

}

return (
<main className="app-container">
<div className="content">
<header className="header">
<h1>Portal de Países y Clima</h1>
<p>
Explora los países del mundo y consulta el clima
actual de sus capitales.
</p>
</header>

    <section className="search-container">
      <label htmlFor="country-search">
        Buscar por país o capital
      </label>

      <input
        id="country-search"
        type="search"
        className="search-input"
        placeholder="Ejemplo: El Salvador, Mexico, San Salvador..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <p className="results-count">
        Países encontrados: {filteredCountries.length}
      </p>
    </section>

    {usingBackup && (
  <p className="message">
    No se pudo conectar con Rest Countries.
    Se muestran cinco países de respaldo.
    Comprueba tu conexión a Internet.
  </p>
)}

    {filteredCountries.length === 0 ? (
      <div className="message">
        <p>No se encontraron países o capitales.</p>
        <p>Prueba con otro nombre.</p>
      </div>
    ) : (
      <section
        className="country-grid"
        aria-label="Lista de países"
      >
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3 || country.name?.common}
            country={country}
            onSelect={setSelectedCountry}
          />
        ))}
      </section>
    )}

    <TarDetalle
      country={selectedCountry}
      onClose={() => setSelectedCountry(null)}
    />
  </div>
</main>

);
}