import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { App } from "./components/pages/app";
import { store, history } from "./store/index";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-widgets/dist/css/react-widgets.css";
import "./index.scss";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);
