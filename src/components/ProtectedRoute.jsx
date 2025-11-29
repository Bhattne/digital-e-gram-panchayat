import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";  // Must have currentUser here

export default function ProtectedRoute({ children, adminOnly }) {
  const { currentUser, userProfile, loading } = useAuth();  // ⭐ FIX: userData → userProfile

  
  if (loading) return <p style={{color:"white"}}>Loading...</p>;

 
  if (!currentUser) return <Navigate to="/" replace />;

  
  if (adminOnly && userProfile?.role !== "admin") {     // ⭐ FIX applied automatically here
    return <Navigate to="/citizen-dashboard" replace />;
  }

  return children;
}
