import * as React from "react";
import {
    AppBar,
    Toolbar,
    makeStyles,
    IconButton,
    Typography,
    Link as MuiLink,
    styled,
    Button,
} from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { composeWithClassName } from "../helpers";
import { toggleDarkMode } from "../darkThemeProvider/darkThemeProviderSlice";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    lastLink: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
    },
}));

const NoAuthLinks = () => {
    const classes = useStyles();
    const MyButton = composeWithClassName(
        (props) => <Button color="inherit" component={RouterLink} {...props} />,
        classes.menuButton
    );
    return (
        <>
            <MyButton to="/">Index</MyButton>
            <MyButton to="/login">Login</MyButton>
            <MyButton to="/register">Register</MyButton>
        </>
    );
};

const AuthLinks = () => {
    const classes = useStyles();
    const MyButton = composeWithClassName(
        (props) => <Button color="inherit" component={RouterLink} {...props} />,
        classes.menuButton
    );
    return (
        <Typography variant="h6">
            <MyButton to="/">Index</MyButton>
            <MyButton to="/notes">Notes</MyButton>
            <MyButton to="/logout">Logout</MyButton>
        </Typography>
    );
};

const NavBar = () => {
    const classes = useStyles();
    const auth = useSelector((state: RootState) => state.authReducer);
    const darkMode = useSelector(
        (state: RootState) => state.darkThemeProviderReducer.darkMode
    );
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <AppBar position="absolute">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>

                    {auth.isAuthenticated ? <AuthLinks /> : <NoAuthLinks />}
                    <div style={{ flexGrow: 1 }} />
                    <Button
                        color="inherit"
                        onClick={() => dispatch(toggleDarkMode())}
                    >
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
