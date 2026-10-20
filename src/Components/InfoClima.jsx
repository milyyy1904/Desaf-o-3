export const WeatherInfo = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="bg-blue-50 rounded-xl p-6 shadow-inner mt-4 border border-blue-100">
      <h4 className="text-xl font-bold text-blue-900 mb-3">Clima actual en la capital</h4>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Temperatura:</span>
          <span>{Math.round(weather.main?.temp)} °C</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Estado:</span>
          <span className="capitalize">{weather.weather?.[0]?.description}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Humedad:</span>
          <span>{weather.main?.humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Viento:</span>
          <span>{weather.wind?.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};