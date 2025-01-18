import { useParams } from "react-router-dom";

const NotPremiumPage = () => {
  // const { connectionId } = useParams(); // Get the connection ID passed from the previous page

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">
        Oops! 😕 You need Premium to chat with professionals!
      </h2>
      <p className="text-lg text-gray-300 mb-4">
        To enjoy chatting with experts, please upgrade to Premium{" "}
        <span role="img" aria-label="trophy">🏆</span>
        <span role="img" aria-label="sparkles">✨</span>
      </p>
      <p className="text-lg text-gray-300 mb-4">
        Don’t worry, we know you’re awesome, but you need that extra sparkle ✨ to unlock those pro conversations! 🔓💬
      </p>
      <p className="text-lg text-gray-300 mb-4">
        Without Premium, you'll just be chatting with regular people like us... not too bad, right? 😅 But you can always aim higher!
      </p>
      <p className="text-lg text-gray-300 mb-4">
        Go Premium and chat with the pros, or stay here and continue being awesome with us! 😜
      </p>
      <p className="text-sm text-gray-400 mb-4">
        For assistance, contact us at:{" "}
        <span className="font-semibold text-blue-600">deeparyan345@gmail.com</span>
      </p>
      <p className="text-sm text-gray-400">
        Without Premium, chatting with professionals is not available. 😔
      </p>
    </div>
  );
};

export default NotPremiumPage;
