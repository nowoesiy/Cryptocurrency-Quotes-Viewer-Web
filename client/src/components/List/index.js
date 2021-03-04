import React, {useState} from "react";
import "./index.css";
import ListItem from "../ListItem";
import { FaSearch } from "react-icons/fa";

const get1MchangeRate = (coin, currentCoins) => {
  const agoAClosePrice = coin.price[1].closePrice;
  const currentAClosePrice = currentCoins[`KRW-${coin.symbol}`].closePrice ? currentCoins[`KRW-${coin.symbol}`].closePrice : coin.price[0].closePrice;
  return (currentAClosePrice - agoAClosePrice) / currentAClosePrice * 100;
}

export default function List ({coins, currentCoins, fixedCoin, onListItemFixedIconClick}) {
    const [keyword, setKeyword] = useState('');

    const filterCoinList = () => {
      const filteredCoins = Object.values(coins).filter(coin => coin.name.includes(keyword) || coin.symbol.includes(keyword)).filter(coin => get1MchangeRate(coin, currentCoins) > 0);
      const sortedCoins = Object.values(filteredCoins).sort((a, b) => {
        return get1MchangeRate(b, currentCoins) - get1MchangeRate(a, currentCoins);
      })

      return sortedCoins.map((coin) => {
        return (
          <ListItem
            key={coin.symbol}
            coin={coin}
            currentCoin={currentCoins[`KRW-${coin.symbol}`]}
            fixedCoin={fixedCoin}
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