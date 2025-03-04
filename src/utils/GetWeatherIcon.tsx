import {
  WiCloud,
  WiCloudy,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

export default function GetWeatherIcon(description: string) {
  if (description.includes("clear"))
    return <WiDaySunny className="text-yellow-400 text-5xl" />;
  if (description.includes("clouds"))
    return <WiCloudy className="text-gray-400 text-5xl" />;
  if (description.includes("rain"))
    return <WiRain className="text-blue-500 text-5xl" />;
  if (description.includes("snow"))
    return <WiSnow className="text-blue-500 text-5xl" />;
  if (description.includes("thunderstorm"))
    return <WiThunderstorm className="text-purple-600 text-5xl" />;
  return <WiCloud className="text-gray-600 text-5xl" />;
}
