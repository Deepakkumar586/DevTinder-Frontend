import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    // extract some data from order after call api
    const { amount, keyId, currency, notes, orderId } = order.data;

    // Open Razorpay Checkout
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Social Sparks",
      description: "Connect to other developer",
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
      },
      theme: {
        color: "#2b2d42",
      },
    };

    // now open razorpay dialog box
    const rzp = new window.Razorpay(options);
    rzp.open(); // this lines means open the dialog box of rezorpay
  };

  return (
    <div className="m-8 sm:m-16 lg:m-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row w-full gap-8 items-center"
      >
        {/* Silver Membership Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="card bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg p-8 text-center flex-grow"
        >
          <h1 className="font-extrabold text-2xl lg:text-3xl mb-6 text-blue-700">
            Silver Membership
          </h1>
          <ul className="list-none grid grid-cols-1 gap-2 text-gray-700 mb-8">
            <li>Unlimited access to premium features</li>
            <li>100 connection requests per day</li>
            <li>Chat with other people</li>
            <li>3 Months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
          >
            Buy Silver
          </button>
        </motion.div>

        {/* Divider for larger screens */}
        <div className="divider hidden lg:block w-px bg-gray-300 h-full mx-4"></div>

        {/* Gold Membership Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="card bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-lg rounded-lg p-8 text-center flex-grow"
        >
          <h1 className="font-extrabold text-2xl lg:text-3xl mb-6 text-yellow-700">
            Gold Membership
          </h1>
          <ul className="list-none grid grid-cols-1 gap-2 text-gray-700 mb-8">
            <li>Unlimited access to premium features</li>
            <li>Exclusive premium content</li>
            <li>Priority support and assistance</li>
            <li>Unlimited connections</li>
            <li>Blue Tick Verification</li>
            <li>Chat with other people</li>
            <li>Access to premium events and updates</li>
            <li>1 Year</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all"
          >
            Buy Gold
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Premium;
