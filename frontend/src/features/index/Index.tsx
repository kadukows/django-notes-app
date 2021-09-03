import * as React from "react";
import { Paper, makeStyles } from "@material-ui/core";

import AuthStateViewer from "../auth/AuthStateViewer";
import AlertWidget from "../alerts/AlertWidget";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

const Index = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <h2>This is index page!</h2>
            <AuthStateViewer />
            <AlertWidget />
        </Paper>
    );
};

export default Index;
