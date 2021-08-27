import * as React from "react";
import { Grid, makeStyles, AppBar, Container } from "@material-ui/core";
import {
    HashRouter as Router,
    Switch,
    Route,
    HashRouter,
} from "react-router-dom";

import NavBar from "./features/appbar/NavBar";
import Index from "./features/index/Index";
import LoginPage from "./features/login/LoginPage";

import "./App.css";
import ToggleGetUserUponLoading from "./features/auth/ToggleGetUserUponLoading";

const useStyles = makeStyles((theme) => ({
    grid: {
        width: "100%",
        marginTop: theme.spacing(2),
    },
    container: {
        marginTop: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
}));

const App = () => {
    const classes = useStyles();

    return (
        <HashRouter>
            <NavBar />
            <div className={classes.appBarSpacer} />
            <Container className={classes.container}>
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                </Switch>
            </Container>
            <ToggleGetUserUponLoading />
        </HashRouter>
    );
};

export default App;
