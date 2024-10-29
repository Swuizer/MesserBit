import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  // Check if the user is authenticated and is an admin
  console.log("User Type and Token: ", user?.accountType, token);
  if (token && user?.accountType === "Admin") {
    return children;
  } else {
    // Redirect non-admin users to the dashboard or another page
    return <Navigate to="/" />;
  }
}

export default AdminRoute;
