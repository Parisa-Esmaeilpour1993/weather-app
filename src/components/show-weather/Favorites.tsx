import { FaTrash } from "react-icons/fa";
import { useWeather } from "../../context/Context";
import GetWeatherIcon from "../../utils/GetWeatherIcon";

export default function Favorites() {
  const { favorites, removeFavorite } = useWeather();
  return (
    <div className="max-w-[80%] fixed bottom-6 mt-8 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-purple-400 to-blue-300 mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        ⭐ Favorite Cities
      </h2>
      <div className="flex items-center gap-4 pb-2 overflow-x-auto scrollbar-hide">
        {favorites.map((fav) => (
          <div
            key={fav.name}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              {GetWeatherIcon(fav.weather[0].description)}
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-lg font-bold">{fav.name}</h3>
                <p className="text-gray-600">{fav.main.temp}°C</p>
              </div>
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => removeFavorite(fav.name)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
