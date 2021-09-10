import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

import Main from '../../pages/Main';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Axios from "axios";

const SOCKET_STATUS = {
  OPEN: 'open'
}

const getUpbitCoinLabel = (coins) => {
  return coins.map(coin => `"KRW-${coin.symbol}"`)
}

function App () {
  const [miunte, setMinute] = useState('');
  const [currentCoins, setCurrentCoins] = useState({});
  const [fixedCoin, setFixedCoin] = useState([]);
  let marketNameMapper = {};

  const handleListItemFixedIconClick = id => {
    setFixedCoin(
      fixedCoin => {
        let fixedCoinList = [...fixedCoin];
        fixedCoinList.includes(id)
          ? (fixedCoinList = fixedCoinList.filter(item => item != id))
          : fixedCoinList.push(id);

        return fixedCoinList;
      },
    );
    return false;
  };

  useEffect(() => {
    const UPBIT_SOCKET_URL = 'wss://api.upbit.com/websocket/v1';

    const getUpbitCoinList = async () => {
      const KRW = 'KRW';
      const URL = 'https://api.upbit.com/v1/market/all?isDetails=false';
  
      const {data: coinList} = await Axios.get(URL);
      const KrwTradeCoins = coinList.filter(coin => coin.market.slice(0, 3) === KRW);
  
      return KrwTradeCoins.map(coin => {
        return {...coin, symbol: coin.market.split('-')[1]}
      });
    };
  

    const ws = new WebSocket(UPBIT_SOCKET_URL);

    ws.addEventListener(SOCKET_STATUS.OPEN, async () => {
      const marketNameList = await getUpbitCoinList();
      marketNameMapper = Object.values(marketNameList).reduce((mapper, {symbol, korean_name}) => {
        mapper[symbol] = korean_name;
        return mapper;
      }, {});
      
      const upbitData = `[{"ticket":"v1v2v02"},{"type":"ticker","codes":[${'' + getUpbitCoinLabel(marketNameList)}]}]`;

      ws.send(upbitData);
    });

    ws.onmessage = (event) => {
      const reader = new FileReader();
  
      reader.onload = () => {
          const coinInfo = JSON.parse(reader.result);
          const nextCurrentCoins = {};

          nextCurrentCoins[coinInfo.code] = {
            closePrice: coinInfo.trade_price,
            name: marketNameMapper[coinInfo.code.split('-')[1]]
          };

          setCurrentCoins(nextCurrentCoins);
      };
  
      reader.readAsText(event.data);
    };
  }, [])

  useEffect(() => {
    setInterval(() => {
      setMinute(new Date().getMinutes());
    }, 1000);
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main
            currentCoins={currentCoins}
            fixedCoin={fixedCoin}
            handleListItemFixedIconClick={handleListItemFixedIconClick}
            minute={miunte}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;