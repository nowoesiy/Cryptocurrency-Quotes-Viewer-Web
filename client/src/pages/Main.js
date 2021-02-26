import React from 'react';

import Header from "../components/Header";
import List from "../components/List";
import Home from "../components/Home";

export default function Main ({coins, currentCoins, crawls, crawlNews, activeId, handleListItemClick, keyword, notes, fixedCoin, handleListItemFixedIconClick}) {
    return (
        <div className="app">
        <Header
          activeId={activeId}
        />
        <div className="container">
          <List
            keyword={keyword}
            coins={coins}
            currentCoins={currentCoins}
            activeId={activeId}
            fixedCoin={fixedCoin}
            onListItemClick={handleListItemClick}
            onListItemFixedIconClick={handleListItemFixedIconClick}
          />
        {/* <div className="board">
            <Home
            notes={notes}
            crawls={crawls}
            crawlNews={crawlNews}
            fixedCoin={fixedCoin}
            onListItemClick={handleListItemClick}
            />
          </div> */}
        </div>
      </div>
    )
}