import React from "react";
import GameScreen from "./components/GameScreen";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import GamePlayer from "./GamePlayer";

const Root = () => {
    return(
        <div>
            <HashRouter>
                <Route exact path="/" component={App} />
                <Route path="/player/:id" component={GamePlayer} />
            </HashRouter>
        </div>
    );
}


export default Root