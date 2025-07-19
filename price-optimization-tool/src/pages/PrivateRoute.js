import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const token = localStorage.getItem("token"); // Check if token exists
    const role = localStorage.getItem("role");  // Check user role

    return (
        <Route
            {...rest}
            render={(props) =>
                token && (!allowedRoles || allowedRoles.includes(role)) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/error/403" />
                )
            }
        />
    );
};

export default PrivateRoute;
