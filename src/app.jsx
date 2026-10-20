import { useState, useEffect } from 'react';
import { getAllCountries } from './api/PaisesApi';
import { CountryCard } from './Components/TarPaís';
import { CountryDetail } from './Components/TarDetalle';
import { Loader } from './Components/Loader';

export function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
      } catch (err) {
        setError('Error al cargar la lista de países. Por favor, verifique su conexión.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  //Filtra países por búsqueda
  const filteredCountries = countries.filter(country => 
    country.name?.common.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-xl">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900">Portal de Países y Clima</h1>
          <p className="text-gray-600 mt-2">Explora los países del mundo y consulta el clima de sus capitales</p>
        </header>

        {selectedCountry ? (
          <CountryDetail country={selectedCountry} onBack={() => setSelectedCountry(null)} />
        ) : (
          <div>
            <div className="mb-6 flex justify-center">
              <input 
                type="text" 
                placeholder="Buscar país..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCountries.map((country) => (
                <CountryCard 
                  key={country.cca3 || country.name.common} 
                  country={country} 
                  onSelect={setSelectedCountry} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;