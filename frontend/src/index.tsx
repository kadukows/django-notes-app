import * as React from "react";
import { render } from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App";
import { store } from "./store";

const WrappedApp = () => (
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
);

render(<WrappedApp />, document.querySelector("#root"));
