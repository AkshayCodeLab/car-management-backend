import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "../Hooks/useLogin";
import { validateLogin } from "../Utils/validateLogin.js";
import { setLoginErr } from "../Utils/errorSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const loginErr = useSelector((state) => state.error.loginErr);
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = validateLogin(name, pass, mail);
    if (message) {
      dispatch(setLoginErr(message));
      return;
    }
    await login(name, mail, pass, isSignUp);
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
    dispatch(setLoginErr(""));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black p-8 rounded-md shadow-md w-3/6 max-w-md opacity-95">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
          />
          {isSignUp && (
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        {loginErr && (
          <div className="mt-4 text-red-500 text-center">
            <p>{loginErr}</p>
          </div>
        )}
        <div className="mt-6 text-center text-white">
          {isSignUp ? "Already a User? " : "New User? "}
          <button
            type="button"
            onClick={toggleSignUp}
            className="text-blue-400 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
