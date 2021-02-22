import React, {useState} from "react";
import "./index.css";
import ListItem from "../ListItem";
import { FaSearch } from "react-icons/fa";

export default function List ({notes, activeId, fixedCoin, onListItemClick}) {
    const [keyword, setKeyword] = useState('');

    const filterCoinList = key => {
      key = key.filter(c => {
        return c.nameKor.indexOf(keyword) > -1 || c.name.indexOf(keyword) > -1;
      });

      return key.map(({id, name, nameKor, time, openPrice, endPrice, highPrice, lowPrice, changeRate, volume }) => {
        return (
          <ListItem
            key={id}
            id={id}
            time={time}
            active={id === activeId}
            name={name}
            nameKor={nameKor}
            openPrice={openPrice}
            endPrice={endPrice}
            highPrice={highPrice}
            lowPrice={lowPrice}
            changeRate={changeRate}
            volume={volume}
            fixedCoin={fixedCoin}
            onClick={() => onListItemClick(id)}
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
        <div className="Coinlist">{filterCoinList(notes)}</div>
      </div>
    );
}