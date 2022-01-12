import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let user = JSON.parse(localStorage.getItem("user"))

  return (
    <div>
      {user ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
