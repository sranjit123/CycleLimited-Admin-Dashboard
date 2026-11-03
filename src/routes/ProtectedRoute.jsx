import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    // const rawUser=localStorage.getItem("currentUser");
    // const currentUser=rawUser?JSON.parse(rawUser):null;
const currentUser = JSON.parse(
  localStorage.getItem("currentUser")
)|| null;
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
