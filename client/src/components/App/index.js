import React from "react";
import "./index.css";
import Header from "../Header";
import List from "../List";
import Detail from "../Detail";
import Home from "../Home";
import axios from "axios";
import { BrowserRouter, Route, Switch, Router, Link } from "react-router-dom";

let coinApi = [];

const nameOfCoins = [
  { nameEng: "BTC", nameKor: "비트코인" },
  { nameEng: "BSV", nameKor: "비트코인에스브이" },
  { nameEng: "BNP", nameKor: "베네핏" },
  { nameEng: "XRP", nameKor: "리플" },
  { nameEng: "BCH", nameKor: "비트코인 캐시" },
  { nameEng: "EOS", nameKor: "이오스" },
  { nameEng: "ETH", nameKor: "이더리움" },
  { nameEng: "WPX", nameKor: "더블유플러스" },
  { nameEng: "ETC", nameKor: "이더리움 클래식" },
  { nameEng: "XSR", nameKor: "젠서" },
  { nameEng: "BTG", nameKor: "비트코인 골드" },
  { nameEng: "TRX", nameKor: "트론" },
  { nameEng: "LTC", nameKor: "라이트코인" },
  { nameEng: "QTUM", nameKor: "퀀텀" },
  { nameEng: "SOC", nameKor: "소다코인" },
  { nameEng: "LUNA", nameKor: "루나" },
  { nameEng: "ADA", nameKor: "에이다" },
  { nameEng: "GNT", nameKor: "골렘" },
  { nameEng: "DAD", nameKor: "다드" },
  { nameEng: "IPX", nameKor: "타키온프로토콜" },
  { nameEng: "TRV", nameKor: "트러스트버스" },
  { nameEng: "XLM", nameKor: "스텔라루멘" },
  { nameEng: "BCD", nameKor: "비트코인 다이아몬드" },
  { nameEng: "MTL", nameKor: "메탈" },
  { nameEng: "AE", nameKor: "애터니티" },
  { nameEng: "LINK", nameKor: "체인링크" },
  { nameEng: "TMTG", nameKor: "더마이다스터치골드" },
  { nameEng: "STEEM", nameKor: "스팀" },
  { nameEng: "WTC", nameKor: "월튼체인" },
  { nameEng: "AOA", nameKor: "오로라" },
  { nameEng: "REP", nameKor: "어거" },
  { nameEng: "CON", nameKor: "코넌" },
  { nameEng: "FCT", nameKor: "피르마체인" },
  { nameEng: "DASH", nameKor: "대시" },
  { nameEng: "THETA", nameKor: "쎄타토큰" },
  { nameEng: "FNB", nameKor: "애프앤비프로토콜" },
  { nameEng: "FAB", nameKor: "패블릭" },
  { nameEng: "APIS", nameKor: "아피스" },
  { nameEng: "BTT", nameKor: "비트토렌트" },
  { nameEng: "VALOR", nameKor: "밸러토큰" },
  { nameEng: "GXC", nameKor: "지엑스체인" },
  { nameEng: "ETZ", nameKor: "이더제로" },
  { nameEng: "AMO", nameKor: "아모코인" },
  { nameEng: "MXC", nameKor: "머신익스체인지코인" },
  { nameEng: "VET", nameKor: "비체인" },
  { nameEng: "ZEC", nameKor: "제트캐시" },
  { nameEng: "WAVES", nameKor: "웨이브" },
  { nameEng: "INS", nameKor: "아이앤에스" },
  { nameEng: "OMG", nameKor: "오미세고" },
  { nameEng: "XVG", nameKor: "버지" }
];

class App extends React.Component {
  state = {
    date: "",
    notes: [],
    crawls: [],
    crawlNews: [],
    activeId: "BTC",
    fixedCoin: [],
    keyword: ""
  };

  setNotes = () => {
    console.log("1");
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

  setCrawls = () => {
    axios
      .get(`http://cowindo.herokuapp.com/api/crawl:coinpan`)
      .then(response => {
        const crawls = response.data;
        this.setState({
          crawls
        });
      });

    axios
      .get(`http://cowindo.herokuapp.com/api/crawl/investing`)
      .then(response => {
        const crawls = response.data;

        this.setState({
          crawlNews: crawls
        });
      });
  };

  setCrawlNew;
  RequestPriceList = c => {
    axios.get(`http://cowindo.herokuapp.com/api/coin/${c}`).then(response => {
      const coins = [...this.state.notes];
      const coin = coins.find(coin => coin.id == c);
      coin.time = [...response.data.time];
      coin.openPrice = [...response.data.openPrice];
      coin.endPrice = [...response.data.endPrice];
      coin.highPrice = [...response.data.highPrice];
      coin.lowPrice = [...response.data.lowPrice];
      coin.volume = [...response.data.volume];
      coin.changeRate = response.data.changeRate;

      this.setState({
        notes: [...coins]
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
    return false;
  };

  handleValueChange = e => {
    this.setState({ keyword: e.target.value });
  };

  componentDidMount() {
    this.setNotes();
    this.setCrawls();
    this.time();
    this.interval = setInterval(this.time, 5000);
    this.timeInterval = setInterval(this.getTime, 1000);
    this.crawlInterval = setInterval(this.setCrawls, 10000);
  }

  render() {
    const {
      notes,
      crawls,
      crawlNews,
      date,
      fixedCoin,
      activeId,
      keyword
    } = this.state;
    const activeNote = notes.filter(item => item.id === activeId)[0];
    return (
      <BrowserRouter>
        <div className="app">
          <Header
            activeId={activeId}
            date={date}
            onListItemClick={this.handleListItemClick}
          />
          <div className="container">
            <List
              keyword={keyword}
              notes={notes}
              activeId={activeId}
              fixedCoin={fixedCoin}
              onListItemClick={this.handleListItemClick}
              onListItemFixedIconClick={this.handleListItemFixedIconClick}
              onValueChange={this.handleValueChange}
            />
            <div className="board">
              <Switch>
                <Route path="/" exact>
                  {
                    <Home
                      notes={notes}
                      crawls={crawls}
                      crawlNews={crawlNews}
                      fixedCoin={fixedCoin}
                      onListItemClick={this.handleListItemClick}
                    />
                  }
                </Route>
                <Route path={"/quote/" + activeId}>
                  {notes.length !== 0 && <Detail note={activeNote} />}
                </Route>
                <Route path="/tradeinfo"></Route>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
