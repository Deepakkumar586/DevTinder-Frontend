import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user);

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If the user is logged in, render the protected element
  return element;
};

export default ProtectedRoute;
