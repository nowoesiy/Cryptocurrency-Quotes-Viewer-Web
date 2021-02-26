import React, {useState} from "react";
import "./index.css";
import ListItem from "../ListItem";
import { FaSearch } from "react-icons/fa";

export default function List ({coins, activeId, fixedCoin, onListItemClick, onListItemFixedIconClick}) {
    const [keyword, setKeyword] = useState('');

    const filterCoinList = () => {
      const filteredCoins = Object.values(coins).filter(coin => coin.name.includes(keyword) || coin.symbol.includes(keyword));
      return filteredCoins.map((coin) => {
        return (
          <ListItem
            key={coin.symbol}
            coin={coin}
            fixedCoin={fixedCoin}
            onClick={() => onListItemClick(coin.symbol)}
            onFixedIconClick={e => {
              e.stopPropagation();
              e.preventDefault();
              onListItemFixedIconClick(coin.symbol);
            }}
          />
        );
      });
    };

    return (
      <div className="list_wrap">
        <div
          className="coinsearch"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span className="search">
            <FaSearch size="20" />
          </span>
          <input
            type="text"
            name="keyword"
            value={keyword}
            placeholder="코인명/심볼검색"
            autoComplete="off"
            onChange={e => setKeyword(e.target.value)}
          ></input>
        </div>
        <div className="Coinlist">{filterCoinList()}</div>
      </div>
    );
}