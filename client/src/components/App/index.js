import React from "react";
import "./index.css";
import Main from '../../pages/Main';
import {BrowserRouter, Route, Switch} from "react-router-dom";

const App = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    );
}
export default App;
