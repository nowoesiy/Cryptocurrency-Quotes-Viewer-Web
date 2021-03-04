import React from 'react';

import Header from "../components/Header";
import List from "../components/List";
import Home from "../components/Home";

export default function Main ({coins, currentCoins, keyword, fixedCoin, handleListItemFixedIconClick}) {
  // console.log(currentCoins);
    return (
        <div className="app">
        <Header
        />
        <div className="container">
          <List
            keyword={keyword}
            coins={coins}
            currentCoins={currentCoins}
            fixedCoin={fixedCoin}
            onListItemFixedIconClick={handleListItemFixedIconClick}
          />
        <div className="board">
            <Home />
          </div>
        </div>
      </div>
    )
}