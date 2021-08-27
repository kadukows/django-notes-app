import * as React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";

import { RootState } from "../../store";
import { composeWithClassName } from "../helpers";
import LoginCard from "./LoginCard";

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
    },
});

const LoginPage = () => {
    const authState = useSelector((state: RootState) => state.authReducer);
    const classes = useStyles();

    if (authState.isAuthenticated) return <Redirect to="/" />;

    const MyGrid = composeWithClassName(Grid, classes.root);

    return (
        <MyGrid container justifyContent="center" direction="column">
            <Grid item container justifyContent="center">
                <Grid item>
                    <LoginCard />
                </Grid>
            </Grid>
        </MyGrid>
    );
};

export default LoginPage;
