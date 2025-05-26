import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { currentUser, logout } from "@/store/authSlice";
import { resetChatState } from "@/store/chatSlice";
import { persistor } from "@/store/store";
import { apiSlice } from "@/api/apiSlice";

const ProtectedRoute = ({ roles = [], children }) => {
  const { user, token, isAuthenticated, userType } = useSelector(currentUser);
  // const { data  , isLoading } = useGetMeQuery();

  // console.log("usertype",userType)
  // console.log("usertype",isAuhtenticated)
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }
  // If not logged in, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if route requires specific role
  if (roles.length > 0 && !roles.includes(userType)) {
    toast.error("You don't have permission to access this page");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("token-removed"));
    dispatch(logout());
    dispatch(resetChatState());
    persistor.purge();
    dispatch(apiSlice.util.resetApiState());
    return <Navigate to="/" replace />;
  }

  // Use Outlet for nested routes or children for direct components
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
