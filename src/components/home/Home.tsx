import { useNavigate } from "react-router";
import homeGif from "../../assets/svg/Animation-claud-sun.gif";
import Button from "../../shared/button/Button";
import { ROUTE } from "../../routes/Route";
import Theme from "../theme/Theme";

export default function Home() {
  const navigate = useNavigate();
  function btnHandler() {
    navigate(ROUTE.signUpSignIn);
  }
  return (
    <div
      className="home-container grid grid-cols-3 p-4 h-screen
    "
    >
      <Theme />
      <div className=" flex flex-col justify-between items-center py-6">
        <div className="flex flex-col items-center justify-center">
          <img src={homeGif} alt="weather_animation" />
          <h1 className="font-semibold text-xl fade-in-up">
            Welcome to Weather App
          </h1>
        </div>
        <Button
          children={"GetStarted"}
          type={"submit"}
          onClick={btnHandler}
          className={
            "blinking-button bg-orange-400 text-white px-4 py-3 text-xl rounded-lg active:scale-95 hover:bg-orange-600"
          }
        />
      </div>
    </div>
  );
}
