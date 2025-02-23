import { ReactNode } from "react";
import HomePage from "../pages/home/Home";
import ShowWeatherPage from "../pages/show-weather/ShowWeather";
import SignUpSignInPage from "../pages/signUp-signIn/SignUpSignIn";
import { ROUTE } from "../routes/Route";

interface RoutArrayProps {
  path: string;
  element: ReactNode;
}
export const routArray: RoutArrayProps[] = [
  {
    path: ROUTE.home,
    element: <HomePage />,
  },
  {
    path: ROUTE.signUpSignIn,
    element: <SignUpSignInPage />,
  },
  {
    path: ROUTE.showWeather,
    element: <ShowWeatherPage />,
  },
];
