import React from 'react';

import Header from "../components/Header";
import List from "../components/List";
import Detail from "../components/Detail";

export default function CoinInfo ({activeNote, activeId, handleListItemClick, keyword, notes, fixedCoin, handleListItemFixedIconClick}) {
    return (
        <div className="app">
        <Header
          activeId={activeId}
        />
        <div className="container">
          <List
            keyword={keyword}
            notes={notes}
            activeId={activeId}
            fixedCoin={fixedCoin}
            onListItemClick={handleListItemClick}
            onListItemFixedIconClick={handleListItemFixedIconClick}
          />
          <div className="board">
                {notes.length !== 0 && <Detail note={activeNote} />}
          </div>
        </div>
      </div>
    )
}