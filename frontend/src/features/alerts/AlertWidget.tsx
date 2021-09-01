import * as React from "react";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { pushAlertAndPopAfterTimeout, addAlertWithoutId } from "./alertsSlice";
import { Alert } from "./alertsSlice";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1, 0),
        display: "flex",
        justifyContent: "center",
    },
    button: {
        margin: theme.spacing(2, 1),
    },
}));

const AlertWidget = () => {
    const classes = useStyles();

    const MyButton = (props: React.ComponentProps<typeof Button>) => (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            {...props}
        />
    );
    const dispatch = useDispatch();

    const onInfo = () => {
        dispatch(
            pushAlertAndPopAfterTimeout({
                type: "info",
                message: "This is simple info alert",
                closeable: false,
            })
        );
    };

    const onInfoCloseable = () => {
        dispatch(
            addAlertWithoutId({
                type: "info",
                message: "This is simple closeble info alert",
                closeable: true,
            })
        );
    };

    const onWarning = () => {
        dispatch(
            pushAlertAndPopAfterTimeout({
                type: "warning",
                message: "This is simple warnin alert",
                closeable: false,
            })
        );
    };

    return (
        <div className={classes.paper}>
            <MyButton onClick={onInfo}>Info</MyButton>
            <MyButton onClick={onWarning} color="secondary">
                Warning
            </MyButton>
            <MyButton onClick={onInfoCloseable}>Info c</MyButton>
        </div>
    );
};

export default AlertWidget;
