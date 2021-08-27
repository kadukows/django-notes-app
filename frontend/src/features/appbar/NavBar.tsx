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
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { composeWithClassName } from "../helpers";

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
            <MyButton disabled>Logout (NYI)</MyButton>
        </Typography>
    );
};

const NavBar = () => {
    const classes = useStyles();
    const auth = useSelector((state: RootState) => state.authReducer);
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
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
