import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { RootState } from "../../store";
import { resetTokenAndUser, loginUser } from "./authSlice";

import "./auth.css";

interface Props {}

const AuthStateViewer = (props: Props) => {
    const auth = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch();

    return (
        <div className="auth-container">
            <table className="my-table">
                <tbody>
                    <tr>
                        <td>token</td>
                        <td>{auth.token}</td>
                    </tr>
                    <tr>
                        <td>isLoading</td>
                        <td>{auth.isLoading.toString()}</td>
                    </tr>
                    <tr>
                        <td>isAuthenticated</td>
                        <td>{auth.isAuthenticated.toString()}</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td>{auth.user?.username}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => dispatch(resetTokenAndUser())}>Reset</button>
            <button
                onClick={() => dispatch(loginUser("foo", "foo"))}
                disabled={auth.isAuthenticated}
            >
                Login foo!
            </button>
        </div>
    );
};

export default AuthStateViewer;
