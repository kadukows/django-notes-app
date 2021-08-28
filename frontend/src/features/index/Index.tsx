import * as React from "react";
import AuthStateViewer from "../auth/AuthStateViewer";
import AlertWidget from "../alerts/AlertWidget";

const Index = () => {
    return (
        <>
            <h2>This is index page!</h2>
            <AuthStateViewer />
            <AlertWidget />
        </>
    );
};

export default Index;
