import { IconButton, Input } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { AuthContext } from "../../context/AuthContext";

export default function SignInForm() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const isSignInDisabled = !auth.username || !auth.password;

  return (
    <div className={`${auth.isSignUpMode ? "hidden" : "block"} text-center`}>
      <h2 className="text-3xl mb-4 font-semibold">Sign in</h2>
      <div className="flex flex-col gap-4 mt-4">
        <div className="relative">
          <Input
            value={auth.username}
            onChange={(e) => {
              auth.setUsername(e.target.value);
              auth.setError(null);
              auth.setLoginError(null);
            }}
            onFocus={() => auth.setFocusedInput("username")}
            onBlur={() => auth.setFocusedInput(null)}
          />
          <label
            className={`input-label ${
              auth.focusedInput === "username" || auth.username ? "focused" : ""
            }`}
          >
            Enter your Username
          </label>
        </div>
        <div className="relative">
          <Input
            type={auth.showPassword ? "text" : "password"}
            value={auth.password}
            onChange={(e) => {
              auth.setPassword(e.target.value);
              auth.setError(null);
              auth.setLoginError(null);
            }}
            onFocus={() => auth.setFocusedInput("password")}
            onBlur={() => auth.setFocusedInput(null)}
          />
          <label
            className={`input-label-password ${
              auth.focusedInput === "password" || auth.password ? "focused" : ""
            }`}
          >
            Enter your Password
          </label>
          <IconButton
            icon={auth.showPassword ? <FaEye /> : <FaEyeSlash />}
            onClick={() => auth.setShowPassword(!auth.showPassword)}
            aria-label="Toggle password visibility"
            variant="link"
            className="absolute -right-[110px] -top-[30px]"
          />
        </div>
      </div>
      {auth.loginError && (
        <p className="text-red-500 mb-4">{auth.loginError}</p>
      )}
      <button
        className={`w-full bg-blue-500 text-white uppercase font-bold py-2.5 rounded-full transition duration-300 hover:bg-blue-700 active:scale-95 ${
          isSignInDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={auth.handleLogin}
        disabled={isSignInDisabled}
      >
        Sign in
      </button>
      <p className="py-4">Or Sign in with social platforms</p>
      <div className="flex gap-3 items-center justify-center">
        <a
          href="#"
          className="flex justify-center items-center p-2 border-2 border-black rounded-full hover:border-blue-500 hover:text-blue-500"
        >
          <FaFacebookF />
        </a>
        <a
          href="#"
          className="flex justify-center items-center p-2 border-2 border-black rounded-full hover:border-blue-500 hover:text-blue-500"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          className="flex justify-center items-center p-2 border-2 border-black rounded-full hover:border-blue-500 hover:text-blue-500"
        >
          <SiGmail />
        </a>
        <a
          href="#"
          className="flex justify-center items-center p-2 border-2 border-black rounded-full hover:border-blue-500 hover:text-blue-500"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
