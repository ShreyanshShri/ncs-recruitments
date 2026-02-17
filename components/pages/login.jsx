import React from "react";
import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <div className="min-h-screen bg-bgDark flex flex-col items-center">
      {/* Page Title */}
      <div className="mt-28 text-center">
        <h1 className="font-shuriken text-beige text-4xl tracking-widest">
          SIGN IN
        </h1>
        <p className="text-lightBeige mt-2 tracking-wide">
          Continue Your Journey
        </p>
      </div>

      {/* Form Container */}
      <div
        className="mt-12 w-full max-w-md bg-bgDark/80 border-2 border-borderRed
        shadow-[0_0_35px_rgba(176,50,44,0.35)] px-8 py-10 relative overflow-hidden"
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />

        <form className="relative space-y-6">
          {/* Email */}
          <div>
            <label className="block text-beige text-sm mb-1 tracking-wide">
              Email ID
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-bgDark border border-borderRed px-4 py-2 text-lightBeige
              outline-none focus:ring-1 focus:ring-primaryRed"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-beige text-sm mb-1 tracking-wide">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-bgDark border border-borderRed px-4 py-2 text-lightBeige
              outline-none focus:ring-1 focus:ring-primaryRed"
            />
          </div>
          {/* Redirect Line */}

          {/* Sign In Button */}
          <div className=" text-center">
            <p className="mt-6 text-sm text-lightBeige text-center tracking-wide">
              New user?{" "}
              <span className="text-primaryRed cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
            <button
              type="submit"
              className="border mt-2 rounded-xl border-borderRed px-6 py-2 text-beige tracking-widest
              hover:bg-primaryRed hover:text-lightBeige transition duration-300"
            >
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
