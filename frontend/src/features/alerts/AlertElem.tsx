import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Alert } from "./alertsSlice";
import { Alert as AlertMui } from "@material-ui/lab";

const AlertElem = () => {
    const alerts = useSelector(
        (state: RootState) => state.alertsReducer.alerts
    );

    return (
        <React.Fragment>
            {alerts.map((alert) => (
                <AlertMui severity={alert.type}>
                    {alert.message}: {alert.id}
                </AlertMui>
            ))}
        </React.Fragment>
    );
};

export default AlertElem;
