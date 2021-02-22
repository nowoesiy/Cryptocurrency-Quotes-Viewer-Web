import React from "react";
import "./index.css";
import axios from "axios";
import FavoriteTable from '../Table/FavoriteTable';
import RankingTable from '../Table/RankingTable';
import VolumeTable from '../Table/VolumeTable';
import HotTable from '../Table/HotTable';
import ReactionTable from '../Table/ReactionTable';
import NewsTable from '../Table/NewsTable';

class Home extends React.Component {
  state = {
    risingCoinM3: [],
    risingCoinM5: [],
    risingCoinM10: [],
  };

  getRisingCoinList = async () => {
    const [{data: risingCoinM3}, {data: risingCoinM5}, {data: risingCoinM10}] = await Promise.all(
      ['M3', 'M5', 'M10']
        .map(minute => axios.get(`https://vc-fetch-server-union.herokuapp.com/coin/rising/${minute}`))
      );

    this.setState({
      risingCoinM3,
      risingCoinM5,
      risingCoinM10,
    });
  }

  componentDidMount() {
    this.time = setInterval(this.getRisingCoinList, 1000);
  }

  render() {
    const {
      risingCoinM3, risingCoinM5, risingCoinM10
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
            title={"3분 실시간 상승률"}
            notes={risingCoinM3}
            onclick={onListItemClick}
          />
          <RankingTable
            title={"5분 실시간 상승률"}
            notes={risingCoinM5}
            onclick={onListItemClick}
          />
          <RankingTable
            title={"10분 실시간 상승률"}
            notes={risingCoinM10}
            onclick={onListItemClick}
          />
        </div>
        <div className="Homecoininfo">
          {/* <VolumeTable
            title={"실시간 거래금액 Top5"}
            notes={volumeJumpCoins}
            onclick={onListItemClick}
          />
          <HotTable
            title={"실시간 핫코인"}
            notes={hotCoins}
            onclick={onListItemClick}
          /> */}
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
