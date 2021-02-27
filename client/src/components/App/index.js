import React, { useEffect, useState } from "react";
import "./index.css";

import axios from "axios";
import Main from '../../pages/Main';
import CoinInfo from '../../pages/CoinInfo';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { upbitCoinList } from "../../constants/coins";

const getUpbitCoins = (coins) => {
  return coins.map(coin => `"KRW-${coin.symbol}"`)
}

function App () {
    const [miunte, setMinute] = useState('');
    const [coins, setCoins] = useState({});
    const [currentCoins, setCurrentCoins] = useState({});
    const [fixedCoin, setFixedCoin] = useState([]);

  const getCoins = async () => {
    const response = await axios.get('https://vc-fetch-server-union.herokuapp.com/coin/upbit/15');
    setCoins(response.data);
  }

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
    const ws = new WebSocket('wss://api.upbit.com/websocket/v1');

    ws.addEventListener("open", event => {
      const upbitData = `[{"ticket":"v1v2v02"},{"type":"ticker","codes":[${'' + getUpbitCoins(upbitCoinList)}]}]`;

      ws.send(upbitData);
    });

    ws.onmessage = (event) => {
      const reader = new FileReader();

      reader.onload = () => {
          const coinInfo = JSON.parse(reader.result);
          const nextCurrentCoins = {...currentCoins};

          if(nextCurrentCoins[coinInfo.code] === undefined) {
            nextCurrentCoins[coinInfo.code] = {
              date: '',
              openPrice: coinInfo.trade_price,
              closePrice: coinInfo.trade_price,
              maxPrice: coinInfo.trade_price,
              minPrice: coinInfo.trade_price,
            };
          }

          nextCurrentCoins[coinInfo.code].closePrice = coinInfo.trade_price;
          
          if(miunte === '0') {
            nextCurrentCoins[coinInfo.code].openPrice = coinInfo.trade_price;
          }

          if(nextCurrentCoins[coinInfo.code].maxPrice < coinInfo.trade_price) {
             nextCurrentCoins[coinInfo.code].maxPrice = coinInfo.trade_price;
          }

          if(nextCurrentCoins[coinInfo.code].minPrice > coinInfo.trade_price) {
             nextCurrentCoins[coinInfo.code].minPrice = coinInfo.trade_price;
          }

          setCurrentCoins({
            ...currentCoins,
            ...nextCurrentCoins,
          });
      };

      reader.readAsText(event.data);
    };
  }, [])

  useEffect(() => {
    getCoins();
  }, [miunte])

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
            coins={coins}
            currentCoins={currentCoins}
            fixedCoin={fixedCoin}
            handleListItemFixedIconClick={handleListItemFixedIconClick}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
