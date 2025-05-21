// ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import isAdmin from "../../middleware/isAdmin";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!isAdmin()) {
        return <Navigate
            to="/auth/login"
            replace
            state={{ from: location, message: 'Please log in to continue.', styles: "bg-red-200 text-red-600" }}
        />;
    }

    return children;
};

export default ProtectedRoute;