import CityInput from "./CityInput";
import WeatherDisplay from "./WeatherDisplay";
import Favorites from "./Favorites";
import { useWeather } from "../../context/Context";
import { Spinner } from "@chakra-ui/react";

export default function ShowWeather() {
  const { weather, error, loading, favorites } = useWeather();
  return (
    <div className="flex flex-col items-center py-8 gap-4 relative min-h-screen weather_container bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="flex flex-col justify-center items-center z-10">
        <CityInput />
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && (
          <div className="text-white text-xl font-semibold mt-4 animate-bounce flex gap-2 ite">
            <Spinner />
            Loading...
          </div>
        )}
        {!loading && weather && <WeatherDisplay />}
        {favorites.length > 0 && <Favorites />}
      </div>
    </div>
  );
}
