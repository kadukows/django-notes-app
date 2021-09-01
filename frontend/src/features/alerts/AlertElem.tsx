import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { AlertWithId, removeAlert } from "./alertsSlice";
import { Alert as AlertMui } from "@material-ui/lab";

function getAlertMui(alert: AlertWithId) {}

const AlertElem = () => {
    const alerts = useSelector(
        (state: RootState) => state.alertsReducer.alerts
    );

    const dispatch = useDispatch();

    return (
        <React.Fragment>
            {alerts.map((alert) => (
                <AlertMui
                    severity={alert.type}
                    onClose={
                        alert.closeable
                            ? () => dispatch(removeAlert(alert.id))
                            : undefined
                    }
                >
                    {alert.message}
                </AlertMui>
            ))}
        </React.Fragment>
    );
};

export default AlertElem;
