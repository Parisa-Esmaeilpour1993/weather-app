import { useWeather } from "../../context/Context";
import {
  FaStar,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaTint,
  FaWind,
} from "react-icons/fa";
import GetWeatherIcon from "../../utils/GetWeatherIcon";

export default function WeatherDisplay() {
  const { weather, favorites, toggleFavorite } = useWeather();
  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-500 to-blue-200 p-6 mt-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold text-red-700 animate-pulse">
            {weather?.name}
          </h1>
          <FaStar
            className={`text-xl cursor-pointer ${
              favorites.some((fav) => fav.name === weather?.name)
                ? "text-yellow-500"
                : "text-gray-200 opacity-60 hover:opacity-100"
            }`}
            onClick={toggleFavorite}
          />
        </div>
        <p className="text-xl text-red-700 font-semibold">
          {weather?.main.temp}°C
        </p>
      </div>
      <p className="flex justify-center items-center gap-1 my-4 text-md italic">
        {GetWeatherIcon(weather?.weather?.[0].description || "unknown")}"
        {weather?.weather[0].description}"
      </p>
      <div className="flex gap-4 my-3 text-gray-700 justify-between items-center">
        <div className="flex items-center gap-1">
          <FaTemperatureLow className="text-blue-700" />
          Min: {weather?.main.temp_min}°C
        </div>
        <div className="flex items-center gap-1">
          <FaTemperatureHigh className="text-red-600" />
          Max: {weather?.main.temp_max}°C
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <FaWind className="text-gray-600" />
        Wind: {weather?.wind.speed} m/s
      </div>
      <div className="flex items-center justify-center gap-2">
        <FaTint className="text-blue-700" />
        Humidity: {weather?.main.humidity}%
      </div>
    </div>
  );
}
