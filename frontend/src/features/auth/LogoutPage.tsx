import * as React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { resetTokenAndUser } from "./authSlice";

const LogoutPage = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(resetTokenAndUser());
    }, []);
    return <Redirect to="/" />;
};

export default LogoutPage;
