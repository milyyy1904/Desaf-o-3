const BACKUP_COUNTRIES = [
{
cca3: 'SLV',
name: { common: 'El Salvador' },
capital: ['San Salvador'],
region: 'Americas',
population: 6314000,
flags: { svg: 'https://flagcdn.com/sv.svg' }
},
{
cca3: 'MEX',
name: { common: 'México' },
capital: ['Ciudad de México'],
region: 'Americas',
population: 128455000,
flags: { svg: 'https://flagcdn.com/mx.svg' }
},
{
cca3: 'ESP',
name: { common: 'España' },
capital: ['Madrid'],
region: 'Europe',
population: 47415000,
flags: { svg: 'https://flagcdn.com/es.svg' }
},
{
cca3: 'ARG',
name: { common: 'Argentina' },
capital: ['Buenos Aires'],
region: 'Americas',
population: 45377000,
flags: { svg: 'https://flagcdn.com/ar.svg' }
},
{
cca3: 'JPN',
name: { common: 'Japón' },
capital: ['Tokio'],
region: 'Asia',
population: 125835000,
flags: { svg: 'https://flagcdn.com/jp.svg' }
}
];

export const fetchCountries = async () => {
try {
const response = await fetch(
'https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,cca3'
);

if (!response.ok) {
  throw new Error(`Error del servidor: ${response.status}`);
}

const data = await response.json();

if (!Array.isArray(data) || data.length === 0) {
  throw new Error('La API no devolvió países válidos.');
}

return {
  countries: data.filter(
    (country) => country.name?.common && country.cca3
  ),
  usingBackup: false
};

} catch (error) {
console.error('Error al consultar Rest Countries:', error);

return {
  countries: BACKUP_COUNTRIES,
  usingBackup: true
};

}
};