import React, { useState } from "react";

export default function Register() {
  const [year, setYear] = useState("");

  return (
    <div className="min-h-screen bg-bgDark flex flex-col items-center">
      {/* Page Title */}
      <div className="mt-10 text-center">
        <h1 className="font-shuriken text-beige text-4xl tracking-widest">
          REGISTER
        </h1>
        <p className="text-lightBeige mt-2 tracking-wide">Begin Your Journey</p>
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
          {/* Name */}
          <div>
            <label className="block text-beige text-sm mb-1 tracking-wide">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-bgDark border border-borderRed px-4 py-2 text-lightBeige
              outline-none focus:ring-1 focus:ring-primaryRed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-beige text-sm mb-1 tracking-wide">
              Email ID
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full bg-bgDark border border-borderRed px-4 py-2 text-lightBeige
              outline-none focus:ring-1 focus:ring-primaryRed"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-beige text-sm mb-1 tracking-wide">
              Contact Number
            </label>
            <input
              type="tel"
              placeholder="Enter contact number"
              className="w-full bg-bgDark border border-borderRed px-4 py-2 text-lightBeige
              outline-none focus:ring-1 focus:ring-primaryRed"
            />
          </div>

          {/* Admission Number */}
          <div>
            <label className="block text-beige text-sm mb-1 tracking-wide">
              Admission No.
            </label>
            <input
              type="text"
              placeholder="Enter admission number"
              className="w-full bg-bgDark border border-borderRed px-4 py-2 text-lightBeige
              outline-none focus:ring-1 focus:ring-primaryRed"
            />
          </div>
          {/* Year Radio */}
          <div>
            <label className="block text-beige text-sm mb-2 tracking-wide">
              Year
            </label>
            <div className="flex gap-6 text-lightBeige">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="year"
                  value="1"
                  checked={year === "1"}
                  onChange={() => setYear("1")}
                  className="accent-primaryRed"
                />
                1st
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="year"
                  value="2"
                  checked={year === "2"}
                  onChange={() => setYear("2")}
                  className="accent-primaryRed"
                />
                2nd
              </label>
            </div>
          </div>
          {/* password    */}

          <div>
            <label className="block text-beige text-sm mb-1 tracking-wide">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full bg-bgDark border border-borderRed px-4 py-2 text-lightBeige
              outline-none focus:ring-1 focus:ring-primaryRed"
            />
          </div>
          {/* Submit Button */}
          <div className=" text-center">
            {/* Redirect Line */}
            <p className="mt-6 text-sm text-lightBeige text-center tracking-wide">
              Already registered?{" "}
              <span className="text-primaryRed cursor-pointer hover:underline">
                Sign in
              </span>
            </p>

            <button
              type="submit"
              className="border mt-2 rounded-xl border-borderRed px-6 py-2 text-beige tracking-widest
              hover:bg-primaryRed hover:text-lightBeige transition duration-300"
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
