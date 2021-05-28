import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CreateEvent from "./pages/CreateEvent/CreateEvent";
import About from "./pages/About/About";
import Updates from "./pages/Updates/Updates";
import NotFound from "./pages/NotFound/NotFound";
import AppLayout from "./components/AppLayout/AppLayout";

interface AppProps {}
const App: React.FC<AppProps> = () => {
    return (
        <BrowserRouter>
            <AppLayout>
                <Switch>
                    <Route path="/" component={CreateEvent} exact />
                    <Route path="/about" component={About} exact />
                    <Route path="/updates" component={Updates} exact />
                    {/* <Route path='/event/:id' component={Event} exact /> */}
                    {/* 404 Catch all */}
                    <Route path="/" component={NotFound} />
                    {/* <Route path='/' render={() => <div>404</div>} /> */}
                </Switch>
            </AppLayout>
        </BrowserRouter>
    );
};

export default App;
