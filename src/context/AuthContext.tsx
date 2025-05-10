import React, { createContext, useState } from "react";
import { base_Url } from "../constant/Constants";
import { toast } from "react-toastify";
import ValidateInput from "../utils/ValidateInput";
import { useNavigate } from "react-router";

interface User {
  username: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  username: string;
  email: string;
  password: string;
  isSignUpMode: boolean;
  loginError: string | null;
  error: string | null;
  showPassword: boolean;
  focusedInput: string | null;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsSignUpMode: (isSignUp: boolean) => void;
  setLoginError: (error: string | null) => void;
  setError: (error: string | null) => void;
  setShowPassword: (show: boolean) => void;
  setFocusedInput: (input: string | null) => void;
  handleLogin: () => Promise<void>;
  handleRegister: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin() {
    if (!username || !password) {
      setLoginError("Username and password are required");
      return;
    }
    try {
      const response = await fetch(`${base_Url}/user`);
      const users = await response.json();

      const user = users.find(
        (user: User) => user.username === username && user.password === password
      );

      if (user) {
        toast.success("Login successful");
        navigate("/showWeather");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (err) {
      setLoginError("An error occurred. Please try again.");
    }
  }

  async function handleRegister() {
    const isValid = ValidateInput(username, email, password);
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(`${base_Url}/user`);
      const users = await response.json();
      const isUsernameTaken = users.some(
        (user: User) => user.username === username
      );
      const isEmailTaken = users.some((user: User) => user.email === email);
      if (isUsernameTaken) {
        setError("Username is already taken");
        return;
      }
      if (isEmailTaken) {
        setError("Email is already taken");
        return;
      }
      const newUser = {
        username,
        email,
        password,
      };
      const registerResponse = await fetch(`${base_Url}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (registerResponse.ok) {
        toast.success("Registration successful");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        username,
        email,
        password,
        isSignUpMode,
        loginError,
        error,
        showPassword,
        focusedInput,
        setUsername,
        setEmail,
        setPassword,
        setIsSignUpMode,
        setLoginError,
        setError,
        setShowPassword,
        setFocusedInput,
        handleLogin,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
