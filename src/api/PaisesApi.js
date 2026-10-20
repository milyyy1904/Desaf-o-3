const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=name,capital,flags,population,region`);
    if (!response.ok) throw new Error('Error al obtener la lista de países');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};