import React, { useEffect, useState } from "react";
import "./index.css";

import Main from '../../pages/Main';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { upbitCoinList } from "../../constants/coins";

const getUpbitCoins = (coins) => {
  return coins.map(coin => `"KRW-${coin.symbol}"`)
}

function App () {
    const [miunte, setMinute] = useState('');
    const [currentCoins, setCurrentCoins] = useState({});
    const [fixedCoin, setFixedCoin] = useState([]);

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
          const nextCurrentCoins = {};
          nextCurrentCoins[coinInfo.code] = {
            closePrice: coinInfo.trade_price,
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