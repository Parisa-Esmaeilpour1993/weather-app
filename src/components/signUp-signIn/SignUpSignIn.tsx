import { useContext } from "react";
import registerImg from "../../assets/svg/undraw_maker-launch.svg";
import signInImg from "../../assets/svg/undraw_remotely.svg";
import { AuthContext } from "../../context/AuthContext";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function SignUpSignIn() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  function toggleMode() {
    if (auth) {
      auth.setIsSignUpMode(!auth.isSignUpMode);
      auth.setUsername("");
      auth.setPassword("");
      auth.setError(null);
      auth.setLoginError(null);
    }
  }

  return (
    <div className="relative w-full bg-white min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className={`absolute top-[-12%] right-[50%] transform translate-y-[-50%] w-[1600px] h-[1600px] bg-gradient-to-br from-blue-600 to-blue-400 rounded-full transition-transform duration-1000 ease-in-out z-0 ${
          auth.isSignUpMode ? "translate-x-full" : ""
        }`}
      ></div>

      <div className="relative w-full max-w-5xl h-screen flex rounded-lg overflow-hidden">
        {/* Forms */}
        <div
          className={`w-1/2 p-10 flex justify-center items-center transition-all duration-500 ${
            auth.isSignUpMode ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <SignInForm />
          <SignUpForm />
        </div>

        {/* Side Panels */}
        <div
          className={`absolute w-1/2 h-full flex items-center justify-center text-black transition-transform duration-700 ${
            auth.isSignUpMode ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="text-center">
            {auth.isSignUpMode ? (
              <div className="flex flex-col gap-4">
                <div className="fixed top-32 ">
                  <h3 className="text-3xl font-semibold">One of us?</h3>
                  <p className="text-lg">Welcome back! Please login.</p>
                  <button
                    onClick={toggleMode}
                    className="bg-white px-3 py-2 rounded-lg my-4 active:scale-95"
                  >
                    Sign in
                  </button>
                </div>
                <img src={signInImg} className="h-96 fixed bottom-0 right-16" />
              </div>
            ) : (
              <div className="flex flex-col gap-4 ">
                <div className="fixed top-32 left-12">
                  <h3 className="text-3xl font-semibold">New here?</h3>
                  <p className="text-lg">
                    Join us now and enjoy all our features!
                  </p>
                  <button
                    onClick={toggleMode}
                    className="bg-white px-3 py-2 rounded-lg my-4 active:scale-95"
                  >
                    Sign Up
                  </button>
                </div>
                <img src={registerImg} className="h-96 fixed bottom-0 left-0" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
