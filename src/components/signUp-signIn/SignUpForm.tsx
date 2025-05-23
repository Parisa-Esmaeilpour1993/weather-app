import { IconButton, Input } from "@chakra-ui/react";
import { useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import SocialLinks from "../../utils/SocialLinks";

export default function SignUpForm() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const isSignUpDisabled = !auth.username || !auth.email || !auth.password;

  return (
    <div className={`${auth.isSignUpMode ? "block" : "hidden"} text-center`}>
      <h2 className="text-3xl mb-4 font-semibold">Sign up</h2>
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
            value={auth.email}
            onChange={(e) => {
              auth.setEmail(e.target.value);
              auth.setError(null);
            }}
            onFocus={() => auth.setFocusedInput("email")}
            onBlur={() => auth.setFocusedInput(null)}
          />
          <label
            className={`input-label ${
              auth.focusedInput === "email" || auth.email ? "focused" : ""
            }`}
          >
            Enter your Email
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
      {auth.error && <p className="text-red-500 mb-4">{auth.error}</p>}
      <button
        className={`w-full bg-blue-500 text-white uppercase font-bold py-2.5 rounded-full transition duration-300 hover:bg-blue-700 active:scale-95 ${
          isSignUpDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={auth.handleRegister}
        disabled={isSignUpDisabled}
      >
        Sign up
      </button>
      <p className="py-4">Or Sign up with social platforms</p>
      <SocialLinks />
    </div>
  );
}
