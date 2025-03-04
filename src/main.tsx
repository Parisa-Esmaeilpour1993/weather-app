import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { WeatherProvider } from "./context/Context.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <WeatherProvider>
            <App />
          </WeatherProvider>
        </AuthProvider>

        <ToastContainer />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
