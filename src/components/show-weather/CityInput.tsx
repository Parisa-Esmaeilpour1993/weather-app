import { FaSearchLocation } from "react-icons/fa";
import { useWeather } from "../../context/Context";
import { useEffect, useRef } from "react";

export default function CityInput() {
  const { city, setCity, showCity, setError } = useWeather();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center ">
      <label className="font-semibold text-2xl text-white">
        <span className="animate-spin inline-block">🌍</span> Check Weather
      </label>
      <div className="flex gap-2 items-center border-2 border-gray-400 justify-between px-4 rounded-lg hover:border-white">
        <input
          ref={inputRef}
          type="text"
          className="outline-none py-1 bg-transparent text-white"
          placeholder="Enter Here..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && showCity()}
        />
        <FaSearchLocation
          onClick={showCity}
          className="cursor-pointer text-gray-300 active:scale-95 active:text-red-700"
        />
      </div>
    </div>
  );
}
