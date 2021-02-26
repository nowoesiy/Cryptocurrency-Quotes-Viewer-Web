import React, { useEffect, useState } from "react";
import "./index.css";

import axios from "axios";
import Main from '../../pages/Main';
import CoinInfo from '../../pages/CoinInfo';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App () {
    const [miunte, setMinute] = useState('');
    const [coins, setCoins] = useState({});
    const [currentCoins, setCurrentCoins] = useState({});
    const [crawls, setCrawls] = useState([]);
    const [activeId, setActiveId] = useState([]);
    const [fixedCoin, setFixedCoin] = useState([]);

  const getCoins = async () => {
    const response = await axios.get('https://vc-fetch-server-union.herokuapp.com/coin/upbit');
    setCoins(response.data);
  }

  const getCrawls = () => {
    axios
      .get(`http://cowindo.herokuapp.com/api/crawl:coinpan`)
      .then(response => {
        const crawls = response.data;
        setCrawls(crawls);
      });
  }

  const handleListItemClick = (id) => setActiveId(id);

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
      const upbitData = '[{"ticket":"v1v2v02"},{"type":"ticker","codes":["KRW-KMD", "KRW-TFUEL", "KRW-DKA", "KRW-T", "KRW-PCI"]}]';
      // const upbitData = '[{"ticket":"v1v2v02"},{"type":"ticker","codes":["KRW-BTC"]}]';

      ws.send(upbitData);
    });

    ws.onmessage = (event) => {
      const reader = new FileReader();

      reader.onload = () => {
          const coinInfo = JSON.parse(reader.result);
          console.log(coinInfo);
          const nextCurrentCoins = {...currentCoins};
          nextCurrentCoins[coinInfo.code] = coinInfo
          // nextCurrentCoins[coinInfo.code] = {
          //   date: coinInfo.date,
          //   openPrice: coinInfo.opening_price,
          //   closePrice: coinInfo.trade_price,
          //   maxPrice: coinInfo.high_price,
          //   minPrice: coinInfo.low_price,
          // };
          console.log(nextCurrentCoins);
          setCurrentCoins(currentCoins => ({
            ...nextCurrentCoins,
            currentCoins,
          }));
          console.log(currentCoins);
      };

      reader.readAsText(event.data);
    };
  }, [])

  useEffect(() => {
    getCoins();
    getCrawls();
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
            crawls={crawls}
            activeId={activeId}
            handleListItemClick={handleListItemClick}
            coins={coins}
            fixedCoin={fixedCoin}
            handleListItemFixedIconClick={handleListItemFixedIconClick}
          />
        </Route>
        {/* <Route path={"/quote/" + activeId}>
          <CoinInfo 
              activeNote={activeNote}
              activeId={activeId}
              handleListItemClick={this.handleListItemClick}
              notes={notes}
              fixedCoin={fixedCoin}
              handleListItemFixedIconClick={this.handleListItemFixedIconClick}
            />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
