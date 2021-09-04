import * as React from "react";
import {
    Grid,
    makeStyles,
    AppBar,
    Container,
    CssBaseline,
} from "@material-ui/core";
import {
    HashRouter as Router,
    Switch,
    Route,
    HashRouter,
} from "react-router-dom";

import PrivateRoute from "./features/auth/PrivateRoute";

import NavBar from "./features/appbar/NavBar";
import Index from "./features/index/Index";
import LoginPage from "./features/login/LoginPage";
import LoginHookForm from "./features/loginHookForm/LoginHookForm";
import LogoutPage from "./features/auth/LogoutPage";
import AlertElem from "./features/alerts/AlertElem";
import NoteForm from "./features/notes/NoteForm";
import NotePage from "./features/notes/NotePage";

import "./App.css";
import ToggleGetUserUponLoading from "./features/auth/ToggleGetUserUponLoading";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import NoteDetailEdit from "./features/notes/NoteDetailEdit";
import NewNote from "./features/notes/NewNote";

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
    const notes = useSelector((state: RootState) => state.notesReducer);

    return (
        <HashRouter>
            <CssBaseline />
            <NavBar />
            <div className={classes.appBarSpacer} />
            <Container className={classes.container}>
                <AlertElem />
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>

                    <PrivateRoute inverse exact path="/login" noAlert>
                        <LoginHookForm />
                    </PrivateRoute>

                    <Route exact path="/logout">
                        <LogoutPage />
                    </Route>

                    <PrivateRoute exact path="/notes" name="Notes">
                        <NotePage />
                    </PrivateRoute>

                    <PrivateRoute exact path="/notes/new" name="New Note">
                        <NewNote />
                    </PrivateRoute>

                    <PrivateRoute exact path="/notes/:id" name="Note Detail">
                        <NoteDetailEdit />
                    </PrivateRoute>
                </Switch>
            </Container>
            <ToggleGetUserUponLoading />
        </HashRouter>
    );
};

export default App;
