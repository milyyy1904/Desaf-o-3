export const CountryCard = ({ country, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(country)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow p-4 flex items-center space-x-4 border border-gray-100"
    >
      <img 
        src={country.flags?.svg || country.flags?.png} 
        alt={`Bandera de ${country.name?.common}`} 
        className="w-16 h-10 object-cover rounded shadow-sm"
      />
      <div>
        <h3 className="font-bold text-lg text-gray-800">{country.name?.common}</h3>
        <p className="text-sm text-gray-500">Capital: {country.capital?.[0] || 'No disponible'}</p>
      </div>
    </div>
  );
};