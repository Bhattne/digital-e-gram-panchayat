import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");

  const fade = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {screen === "landing" && (
          <motion.div
            key="landing"
            variants={fade}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-2xl w-full text-center bg-white shadow-2xl rounded-3xl p-12"
          >
            <h1 className="text-5xl font-extrabold mb-4 text-blue-700">
              Digital E-Gram Panchayat
            </h1>

            <p className="text-gray-600 mb-8 text-lg">
              Fast, secure & modern digital citizen services for your village.
            </p>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="w-40 mx-auto mb-6 opacity-90"
            />

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setScreen("login")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
              >
                Login
              </button>

              <button
                onClick={() => setScreen("register")}
                className="bg-white border px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-50 transition"
              >
                Register
              </button>
            </div>
          </motion.div>
        )}

        {screen === "login" && (
          <motion.div
            key="login"
            variants={fade}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-md w-full bg-white shadow-xl rounded-2xl p-10"
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-700">
              Welcome Back 👋
            </h2>

            <input
              placeholder="Email"
              className="w-full border p-3 rounded-xl mb-5"
            />

            <button
              onClick={() => setOtpModal(true)}
              className="bg-blue-600 text-white w-full p-3 rounded-xl mb-3 font-semibold"
            >
              Continue with OTP
            </button>

            <button
              onClick={() => alert("Google Login Placeholder")}
              className="bg-white border w-full p-3 rounded-xl font-semibold"
            >
              Continue with Google
            </button>

            <p
              className="text-center mt-4 underline cursor-pointer"
              onClick={() => setScreen("register")}
            >
              Create an account
            </p>
          </motion.div>
        )}

        {screen === "register" && (
          <motion.div
            key="register"
            variants={fade}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-md w-full bg-white shadow-xl rounded-2xl p-10"
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-700">
              Create Account ✨
            </h2>

            <input
              placeholder="Full Name"
              className="w-full border p-3 rounded-xl mb-4"
            />

            <input
              placeholder="Email"
              className="w-full border p-3 rounded-xl mb-5"
            />

            <button
              onClick={() => setOtpModal(true)}
              className="bg-blue-600 text-white w-full p-3 rounded-xl mb-3 font-semibold"
            >
              Register with OTP
            </button>

            <button
              onClick={() => alert("Google Signup Placeholder")}
              className="bg-white border w-full p-3 rounded-xl font-semibold"
            >
              Sign up with Google
            </button>

            <p
              className="text-center mt-4 underline cursor-pointer"
              onClick={() => setScreen("login")}
            >
              Already have an account?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP Modal */}
      <AnimatePresence>
        {otpModal && (
          <motion.div
            key="otp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-xl w-80"
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-700">Enter OTP</h3>

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className="w-full border p-3 rounded-xl mb-5"
              />

              <button
                onClick={() => {
                  alert("OTP verified");
                  setOtpModal(false);
                  setScreen("dashboard");
                }}
                className="bg-blue-600 text-white w-full p-3 rounded-xl font-semibold"
              >
                Verify
              </button>

              <p
                className="text-center mt-4 underline cursor-pointer"
                onClick={() => setOtpModal(false)}
              >
                Cancel
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {screen === "dashboard" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-10 text-center"
        >
          <h1 className="text-4xl font-bold text-blue-700">Dashboard</h1>
          <p className="text-gray-700">You are logged in.</p>
        </motion.div>
      )}
    </div>
  );
}
