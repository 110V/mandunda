import React from "react";
import GameScreen from "./components/GameScreen";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import GamePlayer from "./GamePlayer";

const Root = () => {
    return(
        <div>
            <BrowserRouter>
                <Route exact path="/" component={App} />
                <Route path="/player/:id" component={GamePlayer} />
            </BrowserRouter>
        </div>
    );
}


export default Root