import React from 'react';

export const CountryCard = ({ country, onSelect }) => {
return (
<button
type="button"
onClick={() => onSelect(country)}
className="country-card"
>
<img
src={country.flags?.svg || country.flags?.png}
alt={"Bandera de ${country.name?.common || 'país'}"}
className="country-flag"
loading="lazy"
/>

  <div className="country-info">
    <h3>{country.name?.common || 'Nombre no disponible'}</h3>

    <p>
      Capital: {country.capital?.[0] || 'No disponible'}
    </p>

    <p>
      Región: {country.region || 'No disponible'}
    </p>
  </div>
</button>

);
};

export default CountryCard;