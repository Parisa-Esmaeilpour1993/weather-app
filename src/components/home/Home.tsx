import { useNavigate } from "react-router";
import Button from "../../shared/Button";
import { ROUTE } from "../../routes/Route";

export default function Home() {
  const navigate = useNavigate();

  function btnHandler() {
    navigate(ROUTE.signUpSignIn);
  }
  return (
    <div className="home-container p-20 h-screen flex flex-col items-center justify-between">
      <h1 className="font-bold text-4xl fade-in-up text-white">
        Welcome to Weather App
      </h1>

      <div className="flex items-center justify-center">
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
