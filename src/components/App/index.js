import React from "react";
import "./index.css";
import Header from "../Header";
import List from "../List";
import Detail from "../Detail";
import Home from "../Home";
import axios from "axios";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";

const nameOfCoins = [
  { nameEng: "BTC", nameKor: "비트코인" },
  { nameEng: "ETH", nameKor: "이더리움" },
  { nameEng: "DASH", nameKor: "대시" },
  { nameEng: "LTC", nameKor: "라이트코인" },
  { nameEng: "ETC", nameKor: "이더리움 클래식" },
  { nameEng: "XRP", nameKor: "리플" },
  { nameEng: "BCH", nameKor: "비트코인 캐시" },
  { nameEng: "XMR", nameKor: "모네로" },
  { nameEng: "ZEC", nameKor: "지캐시" },
  { nameEng: "QTUM", nameKor: "퀀텀" },
  { nameEng: "BTG", nameKor: "비트코인 골드" },
  { nameEng: "EOS", nameKor: "이오스" },
  { nameEng: "OMG", nameKor: "비트코인 캐시" },
  { nameEng: "GNT", nameKor: "골렘" },
  { nameEng: "TRX", nameKor: "트론" },
  { nameEng: "VET", nameKor: "비체인" },
  { nameEng: "ICX", nameKor: "아이콘" },
  { nameEng: "ZIL", nameKor: "질리카" },
  { nameEng: "HC", nameKor: "하이퍼캐시" },
  { nameEng: "ELF", nameKor: "엘프" },
  { nameEng: "KNC", nameKor: "카이버네트워크" },
  { nameEng: "MCO", nameKor: "모나코" }
];

class App extends React.Component {
  state = {
    date: "",
    notes: [],
    activeId: "BTC",
    fixedCoin: ["BTC", "ETH"]
  };

  RequestCoinList = () => {
    const coinlist = nameOfCoins.map(nameOfCoin => {
      return {
        id: nameOfCoin.nameEng,
        name: nameOfCoin.nameEng,
        nameKor: nameOfCoin.nameKor,
        time: [],
        openPrice: [],
        endPrice: [],
        highPrice: [],
        lowPrice: [],
        volume: [],
        changeRate: ""
      };
    });

    this.setState({
      notes: [...coinlist]
    });
  };

  RequestPriceList = c => {
    axios
      .get(`https://api.bithumb.com/public/ticker/BTC_KRW`)
      .then(response => {
        console.log("API Call Start");
        let coinApi = [];
        if (response.data.status !== "0000") {
          console.log("Error API Call");
        } else {
          coinApi = response.data.data;
        }
        const notes = [...this.state.notes];
        const note = notes.find(coin => coin.id === c);
        var date = new Date(Number(coinApi.date));
        if (note.openPrice[0] == null) {
          note.time.unshift(date.getHours() + ":" + date.getMinutes());
          note.openPrice.unshift(coinApi.closing_price);
          note.highPrice.unshift(coinApi.closing_price);
          note.lowPrice.unshift(coinApi.closing_price);
          note.endPrice.unshift(coinApi.closing_price);
          note.volume.unshift(coinApi.units_traded_24H);
        }
        if (this.getSeconds() == "0") {
          note.time.unshift(date.getHours() + ":" + date.getMinutes());
          note.openPrice.unshift(coinApi.closing_price);
          note.highPrice.unshift(coinApi.closing_price);
          note.lowPrice.unshift(coinApi.closing_price);
          note.endPrice.unshift(coinApi.closing_price);
          note.volume.unshift(coinApi.units_traded_24H);
        }
        note.endPrice[0] = coinApi.closing_price;
        note.highPrice[0] < coinApi.closing_price
          ? (note.highPrice[0] = coinApi.closing_price)
          : null;
        note.lowPrice[0] > coinApi.closing_price
          ? (note.lowPrice[0] = coinApi.closing_price)
          : null;

        note.changeRate = (
          ((note.endPrice[0] - note.endPrice[2]) / note.endPrice[0]) *
          100
        ).toFixed(3);

        this.setState({
          notes
        });
      });
  };

  time = () => {
    nameOfCoins.map(nameOfCoin => {
      this.RequestPriceList(nameOfCoin.nameEng);
    });
    //this.state.notes.sort((a, b) => a.changeRate - b.changeRate).reverse();
    //등락률 순 정렬
  };

  getSeconds = () => {
    let d = new Date();
    return d.getSeconds();
  };
  getTime = () => {
    let d = new Date();
    this.setState({
      date: `${d.getHours()}:${
        d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
      }:${d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()}`
    });
  };

  handleListItemClick = id => {
    this.setState({ activeId: id });
  };

  handleListItemFixedIconClick = id => {
    this.setState(
      state => {
        let fixedCoinList = [...state.fixedCoin];
        fixedCoinList.includes(id)
          ? (fixedCoinList = fixedCoinList.filter(item => item != id))
          : fixedCoinList.push(id);

        return {
          fixedCoin: fixedCoinList
        };
      },
      () => {
        this.state.notes.sort((a, b) => {
          return (
            this.state.fixedCoin.includes(b.name) -
            this.state.fixedCoin.includes(a.name)
          );
        });
      }
    );
  };

  componentDidMount() {
    this.RequestCoinList();
    this.time();
    this.interval = setInterval(this.time, 1000);
    this.timeInterval = setInterval(this.getTime, 1000);
  }

  render() {
    const { notes, date, fixedCoin, activeId } = this.state;
    const activeNote = notes.filter(item => item.id === activeId)[0];
    return (
      <BrowserRouter>
        <div className="app">
          <Header date={date} />
          <div className="container">
            <List
              notes={notes}
              activeId={activeId}
              fixedCoin={fixedCoin}
              onListItemClick={this.handleListItemClick}
              onListItemFixedIconClick={this.handleListItemFixedIconClick}
            />
            <div className="board">
              <Switch>
                <Route path="/" exact component={() => <Home />}></Route>
                <Route
                  path="/stock"
                  component={() =>
                    notes.length !== 0 && <Detail note={activeNote} />
                  }
                ></Route>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
