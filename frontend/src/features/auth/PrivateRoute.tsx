import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../../store";

const PrivateRoute = ({ inverse, ...rest }: any) => {
    const auth = useSelector((state: RootState) => state.authReducer);
    inverse = !!inverse;

    if (inverse ? auth.isAuthenticated : !auth.isAuthenticated) {
        return <Redirect to="/" />;
    }

    return <Route {...rest} />;
};
