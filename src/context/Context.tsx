import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { weather_api_Key } from "../constant/Constants";

interface WeatherProps {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: { description: string; icon: string }[];
}

interface WeatherContextProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  weather: WeatherProps | null;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  favorites: WeatherProps[];
  setFavorites: React.Dispatch<React.SetStateAction<WeatherProps[]>>;
  showCity: () => void;
  toggleFavorite: () => void;
  removeFavorite: (cityName: string) => void;
}

const WeatherContext = createContext<WeatherContextProps | null>(null);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<WeatherProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteCities");
    if (storedFavorites) {
      try {
        const parsedFavorites: WeatherProps[] = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favoriteCities", JSON.stringify(favorites));
    }
  }, [favorites]);

  async function showCity() {
    if (!city) {
      setError("Enter the city name.");
      return;
    }
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api_Key}&units=metric`
      );
      if (!response.ok) {
        throw new Error("This City is noy found.");
      }
      const data = await response.json();
      setWeather(data);
      setCity("");
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite() {
    if (!weather) return;
    const isExist = favorites.some((fav) => fav.name === weather.name);
    if (isExist) {
      toast.error("City is already in favorites!");
      return;
    }
    setFavorites([...favorites, weather]);
    setError(null);
  }

  function removeFavorite(cityName: string) {
    const updatedFavorites = favorites.filter((fav) => fav.name !== cityName);
    setFavorites(updatedFavorites);
  }
  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weather,
        error,
        setError,
        loading,
        favorites,
        setFavorites,
        showCity,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
