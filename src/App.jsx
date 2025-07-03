import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDone, setPaymentDone] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Card Fields
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Netbanking
  const [accountHolder, setAccountHolder] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  // Errors
  const [errors, setErrors] = useState({});

  const formatCardNumber = (value) =>
    value.replace(/\D/g, "").substring(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (value) => {
    const digitsOnly = value.replace(/\D/g, "").substring(0, 4);
    if (digitsOnly.length < 3) return digitsOnly;
    return `${digitsOnly.substring(0, 2)}/${digitsOnly.substring(2, 4)}`;
  };

  const isExpired = (expiryValue) => {
    const cleaned = expiryValue.replace("/", "");
    if (!/^(0[1-9]|1[0-2])\d{2}$/.test(cleaned)) return true;

    const [monthStr, yearStr] = expiryValue.split("/");
    const month = parseInt(monthStr);
    const year = parseInt("20" + yearStr);

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    return year < currentYear || (year === currentYear && month < currentMonth);
  };

  const validate = () => {
    const newErrors = {};
    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length !== 16) newErrors.cardNumber = "Invalid card number";
      if (!nameOnCard.trim()) newErrors.nameOnCard = "Required";
      if (expiry.length !== 5 || isExpired(expiry)) newErrors.expiry = "Invalid expiry";
      if (cvv.length !== 3) newErrors.cvv = "Invalid CVV";
    } else {
      if (!selectedBank || selectedBank === "Select your Bank") newErrors.selectedBank = "Select bank";
      if (!accountHolder.trim()) newErrors.accountHolder = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (!validate()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
    }, 1500);
  };

  const handleDownloadTicket = () => {
    const ticketContent = `
      <html>
        <head><title>Your Ticket</title></head>
        <body>
          <h1 style="text-align:center;">🎫 Movie Ticket</h1>
          <p style="text-align:center;">Thank you for booking with Event Craft!</p>
        </body>
      </html>
    `;
    const blob = new Blob([ticketContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ticket.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 rounded-xl shadow-md text-center"
        >
          <div className="text-purple-700 text-lg font-semibold mb-4">
            Processing your payment...
          </div>
          <motion.div
            className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
        </motion.div>
      </div>
    );
  }

  if (paymentDone) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-md text-center"
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
            Your payment has been processed securely.
          </p>
          <button
            onClick={handleDownloadTicket}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-medium transition"
          >
            Download Ticket
          </button>
        </motion.div>
      </div>
    );
  }

  if (!showPaymentPage) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl max-w-xl w-full p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Cart</h2>
          <div className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-700">🎬 Inception</p>
                <p className="text-sm text-gray-500">July 10, 2025 – 07:30 PM</p>
              </div>
              <p className="text-lg font-bold text-purple-700">₹ 680</p>
            </div>
          </div>
          <button
            onClick={() => setShowPaymentPage(true)}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden border border-gray-200">
        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Payment Request from Event Craft
          </h2>
          <div className="text-gray-700 text-sm space-y-2">
            <p><strong>Movie Name:</strong> Inception</p>
            <p><strong>Booking ID:</strong> #MOV2025</p>
            <p><strong>Show Time:</strong> July 10, 2025 (07:30 PM)</p>
            <p><strong>Ticket Price:</strong> ₹ 680.00</p>
          </div>

          <div className="mt-6 space-y-3">
            {paymentMethod === "card" ? (
              <>
                <p className="text-md font-semibold text-purple-700">Card Details</p>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="Card Number"
                  className={`w-full border rounded p-2 ${errors.cardNumber ? "border-red-500" : ""}`}
                />
                {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}

                <input
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="Name on Card"
                  className={`w-full border rounded p-2 ${errors.nameOnCard ? "border-red-500" : ""}`}
                />
                {errors.nameOnCard && <p className="text-xs text-red-500">{errors.nameOnCard}</p>}

                <div className="flex gap-3">
                  <div className="w-1/2">
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      className={`w-full border rounded p-2 ${errors.expiry ? "border-red-500" : ""}`}
                      maxLength={5}
                    />
                    {errors.expiry && <p className="text-xs text-red-500">{errors.expiry}</p>}
                  </div>
                  <div className="w-1/2">
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 3))}
                      placeholder="CVV"
                      className={`w-full border rounded p-2 ${errors.cvv ? "border-red-500" : ""}`}
                      maxLength={3}
                    />
                    {errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-md font-semibold text-purple-700">Netbanking Details</p>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className={`w-full border rounded p-2 ${errors.selectedBank ? "border-red-500" : ""}`}
                >
                  <option>Select your Bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
                {errors.selectedBank && <p className="text-xs text-red-500">{errors.selectedBank}</p>}

                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder="Account Holder Name"
                  className={`w-full border rounded p-2 ${errors.accountHolder ? "border-red-500" : ""}`}
                />
                {errors.accountHolder && <p className="text-xs text-red-500">{errors.accountHolder}</p>}
              </>
            )}
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Powered by <span className="text-purple-600 font-semibold">MockPay</span>
          </p>
        </div>

        <div className="w-full md:w-1/3 bg-purple-50 p-6 border-l border-purple-200 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-purple-800">Event Craft</h3>
            <p className="text-2xl font-bold text-purple-900 mt-1">₹ 680</p>
            <div className="mt-6 text-sm text-gray-700">
              <p><strong>Phone:</strong> 9999999998</p>
              <p><strong>Email:</strong> gaurav.kumar@example.com</p>
            </div>

            <div className="mt-6">
              <p className="mb-2 font-medium text-gray-700">Select a Payment Method</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setPaymentMethod("card");
                    setErrors({});
                  }}
                  className={`p-3 rounded font-medium transition ${
                    paymentMethod === "card"
                      ? "bg-purple-600 text-white"
                      : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  Card
                </button>
                <button
                  onClick={() => {
                    setPaymentMethod("netbanking");
                    setErrors({});
                  }}
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
              onClick={handleCheckout}
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
