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
  { nameEng: "GXC", nameKor: "지엑스체인" }
];

const nameOfCoins2 = [
  { nameEng: "ETZ", nameKor: "이더제로" },
  { nameEng: "AMO", nameKor: "아모코인" },
  { nameEng: "MXC", nameKor: "머신익스체인지코인" },
  { nameEng: "VET", nameKor: "비체인" },
  { nameEng: "ZEC", nameKor: "제트캐시" },
  { nameEng: "WAVES", nameKor: "웨이브" },
  { nameEng: "INS", nameKor: "아이앤에스" },
  { nameEng: "OMG", nameKor: "오미세고" },
  { nameEng: "XVG", nameKor: "버지" },
  { nameEng: "ENJ", nameKor: "엔진코인" },
  { nameEng: "ABT", nameKor: "아크블록" },
  { nameEng: "PIVX", nameKor: "피벡스" },
  { nameEng: "LAMB", nameKor: "람다" },
  { nameEng: "CMT", nameKor: "사이버마일즈" },
  { nameEng: "SNT", nameKor: "스테이터스네트워크토큰" },
  { nameEng: "XMR", nameKor: "모네로" },
  { nameEng: "MCO", nameKor: "크립토닷컴" },
  { nameEng: "DAC", nameKor: "다빈치" },
  { nameEng: "ORBS", nameKor: "오브스" },
  { nameEng: "MBL", nameKor: "무비블록" },
  { nameEng: "ZRX", nameKor: "제로엑스" },
  { nameEng: "XEM", nameKor: "넴" },
  { nameEng: "BAT", nameKor: "베이직어텐션토큰" },
  { nameEng: "HDAC", nameKor: "에이치닥" },
  { nameEng: "HC", nameKor: "하이퍼캐시" },
  { nameEng: "BHP", nameKor: "비에이치피" },
  { nameEng: "MIX", nameKor: "믹스마블" },
  { nameEng: "STRAT", nameKor: "스트라티스" },
  { nameEng: "CTXC", nameKor: "코르텍스" }
];

const nameOfCoins3 = [
  { nameEng: "PLY", nameKor: "플레이코인" },
  { nameEng: "ICX", nameKor: "아이콘" },
  { nameEng: "NPXS", nameKor: "펀디엑스" },
  { nameEng: "POWR", nameKor: "파워렛저" },
  { nameEng: "IOST", nameKor: "이오스트" },
  { nameEng: "WAXP", nameKor: "왁스" },
  { nameEng: "FZZ", nameKor: "피즈토큰" },
  { nameEng: "TRUE", nameKor: "트루체인" },
  { nameEng: "WICC", nameKor: "웨이키체인" },
  { nameEng: "HYC", nameKor: "하이콘" },
  { nameEng: "BZNT", nameKor: "베잔트" },
  { nameEng: "WOM", nameKor: "왐토큰" },
  { nameEng: "FX", nameKor: "펑션엑스" },
  { nameEng: "PPT", nameKor: "파퓰러스" },
  { nameEng: "LBA", nameKor: "크레드" },
  { nameEng: "PAY", nameKor: "텐엑스" },
  { nameEng: "WET", nameKor: "위쇼토큰" },
  { nameEng: "OGO", nameKor: "오리고" },
  { nameEng: "LOOM", nameKor: "룸네트워크" },
  { nameEng: "ZIL", nameKor: "질리카" },
  { nameEng: "CHR", nameKor: "크로미아" },
  { nameEng: "ITC", nameKor: "아이오티체인" },
  { nameEng: "DVP", nameKor: "디브이피" },
  { nameEng: "ELF", nameKor: "엘프" },
  { nameEng: "RDN", nameKor: "레이든네트워크토큰" },
  { nameEng: "PCM", nameKor: "프레시움" },
  { nameEng: "KNC", nameKor: "카이버 네트워크" },
  { nameEng: "RNT", nameKor: "원루트 네트워크" },
  { nameEng: "ANKR", nameKor: "앵커" },
  { nameEng: "CRO", nameKor: "크립토닷컴체인" },
  { nameEng: "LRC", nameKor: "루프링" },
  { nameEng: "QKC", nameKor: "쿼크체인" },
  { nameEng: "SXP", nameKor: "스와이프" }
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
        changeRate: []
      };
    });

    const coinlist2 = nameOfCoins2.map(nameOfCoin => {
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
        changeRate: []
      };
    });

    const coinlist3 = nameOfCoins3.map(nameOfCoin => {
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
        changeRate: []
      };
    });

    this.setState({
      notes: [...coinlist, ...coinlist2, ...coinlist3]
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

  RequestPriceList2 = c => {
    axios.get(`http://cowindow.herokuapp.com/api/coin/${c}`).then(response => {
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

  RequestPriceList3 = c => {
    axios.get(`http://cowindoz.herokuapp.com/api/coin/${c}`).then(response => {
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

    nameOfCoins2.map(nameOfCoin => {
      this.RequestPriceList2(nameOfCoin.nameEng);
    });

    nameOfCoins3.map(nameOfCoin => {
      this.RequestPriceList3(nameOfCoin.nameEng);
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
