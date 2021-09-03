import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../../store";
import { addAlertWithoutId } from "../alerts/alertsSlice";
import {
    CircularProgress,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";

interface BaseProps {
    inverse?: boolean;
    previousPage?: string;
    name?: string;
    component: React.ComponentType<any>;
    [n: string]: any;
}

//type BaseProps = BaseProps_ & any;

type ComponentState = "loading" | "redirect" | "passed";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "& > * + *": {
            marginLeft: theme.spacing(2),
        },
    },
}));

function useComponentState(
    auth: RootState["authReducer"],
    inverse: boolean
): ComponentState {
    if (auth.isLoading) {
        return "loading";
    }

    if (inverse ? !auth.isAuthenticated : auth.isAuthenticated) {
        return "passed";
    }

    return "redirect";
}

function PrivateRoute({
    inverse,
    previousPage,
    component,
    name,
    ...rest
}: BaseProps) {
    const auth = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch();
    const componentState = useComponentState(auth, !!inverse);
    const classes = useStyles();
    React.useEffect(() => {
        if (componentState === "redirect") {
            dispatch(
                addAlertWithoutId({
                    type: "warning",
                    message: `You need to be ${
                        !inverse ? "logged in" : "logged out"
                    } to access ${name ? `"${name}"` : "that"} page.`,
                    closeable: true,
                })
            );
        }
    }, [auth]);

    switch (componentState) {
        case "loading":
            return (
                <Route {...rest}>
                    <div className={classes.root}>
                        <CircularProgress />
                        <Typography>Loading...</Typography>
                    </div>
                </Route>
            );
        case "passed":
            return <Route {...rest} component={component} />;
        case "redirect":
            return (
                <Route {...rest}>
                    <Redirect to={previousPage ? previousPage : "/"} />
                </Route>
            );
    }

    return <></>;
}

export default PrivateRoute;
