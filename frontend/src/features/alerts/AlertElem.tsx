import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { AlertWithId, removeAlert } from "./alertsSlice";
import { makeStyles } from "@material-ui/core";
import { Alert as AlertMui } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3, 0),
    },
}));

const AlertElem = () => {
    const alerts = useSelector(
        (state: RootState) => state.alertsReducer.alerts
    );
    const classes = useStyles();

    const dispatch = useDispatch();

    function mapAlerts(alerts: AlertWithId[]) {
        let i = 0;
        return alerts.map((alert) => (
            <AlertMui
                key={i++}
                severity={alert.type}
                onClose={
                    alert.closeable
                        ? () => dispatch(removeAlert(alert.id))
                        : undefined
                }
            >
                {alert.message}
            </AlertMui>
        ));
    }

    return <div className={classes.root}>{mapAlerts(alerts)}</div>;
};

export default AlertElem;
