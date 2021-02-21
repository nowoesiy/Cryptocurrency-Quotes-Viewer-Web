import React from "react";
import "./index.css";

import FavoriteTable from '../Table/FavoriteTable';
import RankingTable from '../Table/RankingTable';
import VolumeTable from '../Table/VolumeTable';
import HotTable from '../Table/HotTable';
import ReactionTable from '../Table/ReactionTable';
import NewsTable from '../Table/NewsTable';

class Home extends React.Component {
  state = {
    priceJumpCoins: [],
    priceSlumpCoins: [],
    volumeJumpCoins: [],
    hotCoins: []
  };

  callPumpCoinList = () => {
    const { notes } = this.props;
    let priceJumpCoins = notes.slice();
    let priceSlumpCoins = notes.slice();
    let volumeJumpCoins = notes.slice();

    priceJumpCoins.sort((a, b) => a.changeRate[0] - b.changeRate[0]).reverse();
    priceSlumpCoins.sort((a, b) => a.changeRate[0] - b.changeRate[0]);
    volumeJumpCoins
      .sort(
        (a, b) =>
          (a.volume[0] - a.volume[9]) * a.endPrice[0] -
          (b.volume[0] - b.volume[9]) * b.endPrice[0]
      )
      .reverse();

    priceJumpCoins = priceJumpCoins.slice(0, 5);
    priceSlumpCoins = priceSlumpCoins.slice(0, 5);
    volumeJumpCoins = volumeJumpCoins.slice(0, 5);

    let hotCoins = notes
      .filter(
        coins =>
          (coins.changeRate[0] > 1.5 &&
            coins.changeRate[1] > 1.5 &&
            coins.changeRate[2] > 1.5) ||
          coins.changeRate[0] > 3
      )
      .slice(0, 4);

    this.setState({
      priceJumpCoins,
      priceSlumpCoins,
      volumeJumpCoins,
      hotCoins
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const {notes} = nextProps;

    if(notes !== this.props.notes) {
      return false;
    }
    return true;
  }
  componentDidMount() {
    this.callPumpCoinList();
    this.time = setInterval(this.callPumpCoinList, 5000);
  }

  render() {
    const {
      priceJumpCoins,
      priceSlumpCoins,
      volumeJumpCoins,
      hotCoins
    } = this.state;
    const { notes, crawls, crawlNews, fixedCoin, onListItemClick } = this.props;

    return (
      <div className="home_wrap">
        {notes.length != 0 && (
          <FavoriteTable
            title={"관심 코인"}
            notes={notes}
            fixedCoin={fixedCoin}
            onclick={onListItemClick}
          />
        )}
        <div className="Homecoininfo">
          <RankingTable
            title={"실시간 상승률 Top5"}
            notes={priceJumpCoins}
            onclick={onListItemClick}
          />
          <RankingTable
            title={"실시간 하락률 Top5"}
            notes={priceSlumpCoins}
            onclick={onListItemClick}
          />
        </div>
        <div className="Homecoininfo">
          <VolumeTable
            title={"실시간 거래금액 Top5"}
            notes={volumeJumpCoins}
            onclick={onListItemClick}
          />
          <HotTable
            title={"실시간 핫코인"}
            notes={hotCoins}
            onclick={onListItemClick}
          />
        </div>
        <div style={{ display: "flex" }}>
          <ReactionTable title={"실시간 반응"} crawls={crawls} />
          <NewsTable title={"코인 뉴스"} crawlNews={crawlNews} />
        </div>
      </div>
    );
  }
}

export default Home;
