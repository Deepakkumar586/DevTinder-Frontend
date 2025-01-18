import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setisUserPremium] = useState("");
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const response = await axios.get(BASE_URL + "/verify-premium", {
      withCredentials: true,
    });

    setisUserPremium(response.data);
  };
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
      // whenever payment dialog is  closed then this function is called
      handler: verifyPremiumUser(),
    };

    // now open razorpay dialog box
    const rzp = new window.Razorpay(options);
    rzp.open(); // this lines means open the dialog box of rezorpay
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  return isUserPremium.isPremium === true ? (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Thank You for Going Premium! 🎉 - {isUserPremium.membershipType} 
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          You're now part of the exclusive club! Enjoy all the premium
          perks—faster access, exclusive features, and fewer headaches! We hope
          you're having an awesome experience (and maybe even showing off a
          little to your friends 😉).
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Remember, we're always here to help! If you're facing any issues or
          just want to say hi, reach out at:
        </p>
        <p className="text-md text-blue-600 font-semibold mb-6">
          📧 deeparyan345@gmail.com
        </p>
        <p className="text-sm text-gray-500">
          P.S. If you’re not using all the features, don’t worry—we still think
          you’re awesome! 😅 Keep rocking and happy exploring!
        </p>
      </div>
    </div>
  ) : (
    <div className="m-8 sm:m-16 lg:m-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row w-full mt-24 mb-24 gap-8 items-center"
      >
        {/* Silver Membership Card */}
        <motion.div
          whileHover={{ scale: 1.05, y: -10 }}
          className="relative bg-gradient-to-br  from-black-50 to-blue-200 shadow-lg rounded-lg p-8 text-center flex-grow border-4 animate-border-silver border-gradient-blue hover:border-gradient-active transition-all"
        >
          <h1 className="font-extrabold text-2xl lg:text-3xl mb-4 text-blue-700">
            Silver Membership
          </h1>
          <p className="text-gray-400 font-semibold mb-4">Price: ₹300</p>
          <ul className="list-none grid grid-cols-1 gap-2 text-gray-400 mb-8">
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

        {/* Divider */}

        <div className="divider lg:divider-horizontal">OR</div>
        {/* Gold Membership Card */}
        <motion.div
          whileHover={{ scale: 1.05, y: -10 }}
          className="relative bg-gradient-to-br from-black-50 to-yellow-200 shadow-lg rounded-lg p-8 text-center flex-grow border-4 animate-border-gold border-gradient-yellow hover:border-gradient-active transition-all"
        >
          <h1 className="font-extrabold text-2xl lg:text-3xl mb-4 text-yellow-700">
            Gold Membership
          </h1>
          <p className="text-gray-400 font-semibold mb-4">Price: ₹700</p>
          <ul className="list-none grid grid-cols-1 gap-2 text-gray-400 mb-8">
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
