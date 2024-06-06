import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    /*
        <Outlet /> represents all the children inside the RequireAuth component.
        If the user is authenticated, the children are rendered.
        If the user is not authenticated, the user is redirected to the login page.

        The location object is passed to the Navigate component as the state prop.
        This allows the user to be redirected back to the page they were trying to access after logging in because the user did not ask to be in the login page but got redirected to it because he was logged out.
    */

    return (
        auth?.accessToken
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;