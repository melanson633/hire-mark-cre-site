import { Navigate } from "react-router-dom";

function RedirectTo({ to }) {
  return <Navigate to={to} replace />;
}

export default RedirectTo;
