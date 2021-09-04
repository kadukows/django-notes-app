import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { RootState } from "../../store";
import { Alert } from "../alerts/alertsSlice";
import Loader from "../loader/Loader";
import RedirectWithAlert from "../alerts/RedirectWithAlert";

interface Props {
    inverse?: boolean;
    previousPage?: string;
    name?: string;
    noAlert?: boolean;
    path: string;
    [n: string]: any;
}

function PrivateRoute({
    inverse,
    name,
    previousPage,
    children,
    noAlert,
    ...rest
}: React.PropsWithChildren<Props>): React.ReactElement {
    const useSlice = () => useSelector((state: RootState) => state.authReducer);
    const authIsLoaded = (state: RootState["authReducer"]) => !state.isLoading;
    const auth = useSelector((state: RootState) => state.authReducer);

    const passed = !inverse ? auth.isAuthenticated : !auth.isAuthenticated;

    let RedirectComponent: any;
    if (!noAlert) {
        const redirectAlert: Alert = {
            type: "warning",
            message: `You need to be ${
                !inverse ? "logged in" : "logged out"
            } in order to access ${name ? `"${name}"` : "that"} page.`,
            closeable: true,
        };

        RedirectComponent = (props: any) => (
            <RedirectWithAlert alert={redirectAlert} {...props} />
        );
    } else {
        RedirectComponent = (props: any) => <Redirect {...props} />;
    }

    const to = previousPage ? previousPage : "/";

    return (
        <Route {...rest}>
            <Loader useSlice={useSlice} precondition={authIsLoaded}>
                {passed ? children : <RedirectComponent to={to} />}
            </Loader>
        </Route>
    );
}

export default PrivateRoute;
