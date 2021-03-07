import React from 'react';

import Header from "../components/Header";
import List from "../components/List";
import Home from "../components/Home";

export default function Main ({currentCoins, keyword, fixedCoin, handleListItemFixedIconClick, minute}) {
    return (
        <div className="app">
        <Header
        />
        <div className="container">
          <List
            keyword={keyword}
            currentCoins={currentCoins}
            fixedCoin={fixedCoin}
            onListItemFixedIconClick={handleListItemFixedIconClick}
            minute={minute}
          />
        <div className="board">
            <Home />
          </div>
        </div>
      </div>
    )
}