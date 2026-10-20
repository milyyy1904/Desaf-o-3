const API_URL =
  'https://api.restcountries.com/countries/v5?limit=100&response_fields=names.common,capitals,flag.url_png,population,region,codes.alpha_3';

export const fetchCountries = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: 'Bearer rc_live_demo',
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo conectar con Rest Countries');
    }

    const result = await response.json();

    const countries = (result.data?.objects || []).map((item) => ({
      name: {
        common: item.names?.common || 'Nombre desconocido',
      },
      capital: item.capitals?.map((capital) => capital.name) || [],
      flags: {
        png: item.flag?.url_png || '',
        svg: item.flag?.url_svg || '',
      },
      population: item.population || 0,
      region: item.region || 'No disponible',
      cca3: item.codes?.alpha_3 || '',
    }));

    if (countries.length === 0) {
      throw new Error('La API no devolvió países');
    }

    return {
      countries,
      usingBackup: false,
    };
  } catch (error) {
    console.error('Error de Rest Countries:', error);

    return {
      countries: [
        { name: { common: 'El Salvador' }, capital: ['San Salvador'], flags: { png: 'https://flagcdn.com/w320/sv.png' }, population: 6300000, region: 'Américas', cca3: 'SLV' },
        { name: { common: 'México' }, capital: ['Ciudad de México'], flags: { png: 'https://flagcdn.com/w320/mx.png' }, population: 126000000, region: 'Américas', cca3: 'MEX' },
        { name: { common: 'España' }, capital: ['Madrid'], flags: { png: 'https://flagcdn.com/w320/es.png' }, population: 48000000, region: 'Europa', cca3: 'ESP' },
        { name: { common: 'Argentina' }, capital: ['Buenos Aires'], flags: { png: 'https://flagcdn.com/w320/ar.png' }, population: 46000000, region: 'Américas', cca3: 'ARG' },
        { name: { common: 'Japón' }, capital: ['Tokio'], flags: { png: 'https://flagcdn.com/w320/jp.png' }, population: 124000000, region: 'Asia', cca3: 'JPN' },
      ],
      usingBackup: true,
    };
  }
};