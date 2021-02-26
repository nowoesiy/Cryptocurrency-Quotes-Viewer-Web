import React from "react";
import "./index.css";

import axios from "axios";
import Main from '../../pages/Main';
import CoinInfo from '../../pages/CoinInfo';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import {nameOfCoins, nameOfCoins2, nameOfCoins3} from '../../constants/coins';

class App extends React.Component {
  state = {
    coins: {},
    crawls: [],
    crawlNews: [],
    activeId: "BTC",
    fixedCoin: [],
  };

  getCoins = async () => {
    const response = await axios.get('https://vc-fetch-server-union.herokuapp.com/coin/upbit');
    this.setState({coins: response.data});
  }

  setCrawls = () => {
    axios
      .get(`http://cowindo.herokuapp.com/api/crawl:coinpan`)
      .then(response => {
        const crawls = response.data;
        this.setState({
          crawls
        });
      });
  }

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
      // () => {
      //   this.state.notes.sort((a, b) => {
      //     return (
      //       this.state.fixedCoin.includes(b.name) -
      //       this.state.fixedCoin.includes(a.name)
      //     );
      //   });
      // }
    );
    return false;
  };

  componentDidMount() {
    setInterval(async () => { this.getCoins()} , 5000);
    setInterval(this.setCrawls, 10000);
  }

  render() {
    const {
      notes,
      crawls,
      crawlNews,
      fixedCoin,
      activeId,
      coins
    } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Main 
              crawls={crawls}
              crawlNews={crawlNews}
              activeId={activeId}
              handleListItemClick={this.handleListItemClick}
              coins={coins}
              fixedCoin={fixedCoin}
              handleListItemFixedIconClick={this.handleListItemFixedIconClick}
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
}

export default App;
