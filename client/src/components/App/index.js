import React from "react";
import "./index.css";

import axios from "axios";
import Main from '../../pages/Main';
import CoinInfo from '../../pages/CoinInfo';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import {nameOfCoins, nameOfCoins2, nameOfCoins3} from '../../constants/coins';

class App extends React.Component {
  state = {
    notes: [],
    crawls: [],
    crawlNews: [],
    activeId: "BTC",
    fixedCoin: [],
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

  componentDidMount() {
    this.setNotes();
    this.setCrawls();
    this.time();
    this.interval = setInterval(this.time, 5000);
    this.crawlInterval = setInterval(this.setCrawls, 10000);
  }

  render() {
    const {
      notes,
      crawls,
      crawlNews,
      fixedCoin,
      activeId,
    } = this.state;
    const activeNote = notes.filter(item => item.id === activeId)[0];
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Main 
              crawls={crawls}
              crawlNews={crawlNews}
              activeId={activeId}
              handleListItemClick={this.handleListItemClick}
              notes={notes}
              fixedCoin={fixedCoin}
              handleListItemFixedIconClick={this.handleListItemFixedIconClick}
            />
          </Route>
          <Route path={"/quote/" + activeId}>
            <CoinInfo 
                activeNote={activeNote}
                activeId={activeId}
                handleListItemClick={this.handleListItemClick}
                notes={notes}
                fixedCoin={fixedCoin}
                handleListItemFixedIconClick={this.handleListItemFixedIconClick}
              />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
