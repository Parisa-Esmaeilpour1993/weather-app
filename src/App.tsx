import { Route, Routes } from "react-router";
import { routArray } from "./routes/RouteIndex";

function App() {
  return (
    <div>
      <Routes>
        {routArray.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </div>
  );
}
export default App;
