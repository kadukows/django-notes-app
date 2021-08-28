import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Alert } from "./alertsSlice";
import { Alert as AlertMui } from "@material-ui/lab";

interface AlertWithId extends Alert {
    id: number;
}

type State = Array<AlertWithId>;

const TIMEOUT = 3000;

const AlertElem = () => {
    const alerts = useSelector((state: RootState) => state.alertsReducer);
    const [state, setState] = React.useState<State>([]);
    const [id, setId] = React.useState(0);

    React.useEffect(() => {
        if (alerts.alert) {
            const myId = id + 1;
            setId(myId);

            const new_state = [...state, { id: myId, ...alerts.alert }];
            setState(new_state);

            setTimeout(() => {
                const new_state = state.filter((alert) => alert.id != myId);
                setState(new_state);
            }, TIMEOUT);
        }
    }, [alerts.alert]);

    let i = 0;
    return (
        <>
            {state.map((alert) => (
                <AlertMui severity={alert.type} key={i++}>
                    {alert.message} id: {alert.id}
                </AlertMui>
            ))}
        </>
    );
};

export default AlertElem;
