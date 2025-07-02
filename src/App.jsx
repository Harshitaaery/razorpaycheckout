import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDone, setPaymentDone] = useState(false);

  if (paymentDone) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-md text-center z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 mb-4 bg-purple-100 text-purple-700 flex items-center justify-center rounded-full text-3xl font-bold"
          >
            ✔
          </motion.div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Transaction Successful
          </h2>
          <p className="text-gray-600 mb-6">
            Your payment has been processed securely via Razorpay.
          </p>
          <button
            onClick={() => alert("Ticket download initiated")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-medium transition"
          >
            Download Ticket
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden border border-gray-200">
        {/* Left Section */}
        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Payment Request from Event Craft
          </h2>
          <div className="text-gray-700 text-sm space-y-2">
            <p>
              <strong>Movie Name:</strong> Inception
            </p>
            <p>
              <strong>Booking ID:</strong> #MOV2025
            </p>
            <p>
              <strong>Show Time:</strong> July 10, 2025 (07:30 PM)
            </p>
            <p>
              <strong>Ticket Price:</strong> ₹ 680.00
            </p>
          </div>

          <div className="mt-6">
            {paymentMethod === "card" ? (
              <div className="space-y-3">
                <p className="text-md font-semibold text-purple-700">
                  Card Details
                </p>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="w-full border rounded p-2"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 border rounded p-2"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 border rounded p-2"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-md font-semibold text-purple-700">
                  Netbanking Details
                </p>
                <select className="w-full border rounded p-2">
                  <option>Select your Bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
                <input
                  type="text"
                  placeholder="Account Holder Name"
                  className="w-full border rounded p-2"
                />
              </div>
            )}
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Powered by{" "}
            <span className="text-purple-600 font-semibold">Razorpay</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 bg-purple-50 p-6 border-l border-purple-200 flex flex-col justify-between">
          <div>
            <img
              src="https://placehold.co/64x64?text=Logo"
              alt="Event Craft Logo"
              className="w-12 h-12 rounded mb-3"
            />
            <h3 className="text-lg font-semibold text-purple-800">
              Event Craft
            </h3>
            <p className="text-2xl font-bold text-purple-900 mt-1">₹ 680</p>

            <div className="mt-6 text-sm text-gray-700">
              <p>
                <strong>Phone:</strong> 9999999998
              </p>
              <p>
                <strong>Email:</strong> gaurav.kumar@example.com
              </p>
            </div>

            <div className="mt-6">
              <p className="mb-2 font-medium text-gray-700">
                Select a Payment Method
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded font-medium transition ${
                    paymentMethod === "card"
                      ? "bg-purple-600 text-white"
                      : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  Card
                </button>
                <button
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`p-3 rounded font-medium transition ${
                    paymentMethod === "netbanking"
                      ? "bg-purple-600 text-white"
                      : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  Netbanking
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setPaymentDone(true)}
              className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
