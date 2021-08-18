import * as React from "react";
import AuthStateViewer from "./features/auth/AuthStateViewer";
import ToggleGetUserUponLoading from "./features/auth/ToggleGetUserUponLoading";

const App = () => {
    return (
        <>
            <ToggleGetUserUponLoading />
            <h1>Hello react</h1>
            <AuthStateViewer />
        </>
    );
};

export default App;
