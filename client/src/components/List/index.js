import React, {useEffect, useRef, useState} from "react";
import "./index.css";
import ListItem from "../ListItem";
import { FaSearch } from "react-icons/fa";
import { symbolMapper } from "../../constants/coins";

const get1MchangeRate = (coin) => {
  return (coin.closePrice - coin.openPrice) / coin.closePrice * 100;
}


export default function List ({currentCoins, fixedCoin, onListItemFixedIconClick, minute}) {
    const [keyword, setKeyword] = useState('');
    const [nextCurrentCoins, setNextCurrentCoins] = useState({});

    useEffect(() => {
      console.log('reset');
      setNextCurrentCoins({});
    }, [minute])
    
    useEffect(() => {
      if(Object.keys(currentCoins).length === 0) {
        return;
      }
      const symbol = Object.keys(currentCoins)[0];
      const [,symbolShort] = symbol.split('-');
      const _nextCurrentCoins = {...nextCurrentCoins};
      
      if(!_nextCurrentCoins[symbol]) {
        _nextCurrentCoins[symbol] = {};
      }

      if(!_nextCurrentCoins[symbol].name) {
        _nextCurrentCoins[symbol].name = symbolMapper[symbolShort];
      }

      if(!_nextCurrentCoins[symbol].symbol) {
        _nextCurrentCoins[symbol].symbol = symbolShort;
      }

      _nextCurrentCoins[symbol].closePrice = currentCoins[symbol].closePrice;
      if(!_nextCurrentCoins[symbol].openPrice) {
        _nextCurrentCoins[symbol].openPrice = currentCoins[symbol].closePrice;
      }
      
      if(!_nextCurrentCoins[symbol].minPrice || _nextCurrentCoins[symbol].minPrice > currentCoins[symbol].closePrice) {
        _nextCurrentCoins[symbol].minPrice = currentCoins[symbol].closePrice; 
      }

      if(!_nextCurrentCoins[symbol].maxPrice || _nextCurrentCoins[symbol].maxPrice < currentCoins[symbol].closePrice) {
        _nextCurrentCoins[symbol].maxPrice = currentCoins[symbol].closePrice; 
      }

      setNextCurrentCoins(_nextCurrentCoins);
    }, [currentCoins])

    const filterCoinList = () => {
      const filteredCoins = Object.values(nextCurrentCoins)
      .filter(coin => coin.name.includes(keyword) || coin.symbol.includes(keyword))
      .filter(coin => get1MchangeRate(coin, currentCoins) > 0)
      .slice(0, 12);
      const sortedCoins = Object.values(filteredCoins).sort((a, b) => {
        return get1MchangeRate(b) - get1MchangeRate(a);
      })
      return sortedCoins && sortedCoins.map((coin) => {
        return (
          <ListItem
            key={coin.symbol}
            currentCoin={coin}
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