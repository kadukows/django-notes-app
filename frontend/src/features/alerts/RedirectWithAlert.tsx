import * as React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { Alert, addAlertWithoutId } from "./alertsSlice";

interface Props {
    alert: Alert;
    to: string;
    [n: string]: any;
}

function RedirectWithAlert({ alert, ...rest }: Props): React.ReactElement {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(addAlertWithoutId(alert));
    }, []);

    return <Redirect {...rest} />;
}

export default RedirectWithAlert;
