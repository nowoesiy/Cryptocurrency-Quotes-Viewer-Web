import React from "react";
import "./index.css";
import axios from "axios";
import Main from '../../pages/Main';
import CoinInfo from '../../pages/CoinInfo';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {nameOfCoins, nameOfCoins2, nameOfCoins3} from '../../constants/coins';

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
