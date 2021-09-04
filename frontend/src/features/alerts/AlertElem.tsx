import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { AlertWithId, removeAlert } from "./alertsSlice";
import { makeStyles, Collapse } from "@material-ui/core";
import { Alert as AlertMui } from "@material-ui/lab";

import CloseableAlert from "./CloseableAlert";

const AlertElem = () => {
    const alerts = useSelector(
        (state: RootState) => state.alertsReducer.alerts
    );
    const dispatch = useDispatch();

    return (
        <>
            {alerts.map((alert) => (
                <CloseableAlert
                    onExit={() => dispatch(removeAlert(alert.id))}
                    alert={alert}
                    key={alert.id}
                />
            ))}
        </>
    );
};

export default AlertElem;
