import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import RankingTable from '../Table/RankingTable';
import ReactionTable from '../Table/ReactionTable';

const Home = () => {
    const [risingCoinUpbitM3, setRisingCoinUpbitM3] = useState([]);
    const [risingCoinUpbitM5, setRisingCoinUpbitM5] = useState([]);
    const [risingCoinUpbitM10, setRisingCoinUpbitM10] = useState([]);

    const [coinCommunityReaction, setCoinCommunityReaction] = useState([]);
  
  const getRisingCoinList = async () => {
    const [{data: risingCoinUpbitM3}, {data: risingCoinUpbitM5}, {data: risingCoinUpbitM10}] = await Promise.all(
      [{minute: 'M3', source: 'upbit'}, {minute: 'M5', source: 'upbit'}, {minute: 'M10', source: 'upbit'}]
        .map(({minute, source}) => axios.get(`https://vc-fetch-server-union.herokuapp.com/coin/${source}/rising/${minute}`))
      );

      setRisingCoinUpbitM3(risingCoinUpbitM3);
      setRisingCoinUpbitM5(risingCoinUpbitM5);
      setRisingCoinUpbitM10(risingCoinUpbitM10);
  }

  const getCommunityRection = async () => {
    const {data} = await axios.get(`http://cowindo.herokuapp.com/api/crawl:coinpan`);
    setCoinCommunityReaction(data);
  }

  useEffect(()=> {
    setInterval(getRisingCoinList, 3000);
    setInterval(getCommunityRection, 3000);
  },[])

  return (
    <div className="home_wrap">
      <div className="Homecoininfo">
        <RankingTable
          title={"3분 실시간 상승률"}
          notes={risingCoinUpbitM3}
        />
        <RankingTable
          title={"5분 실시간 상승률"}
          notes={risingCoinUpbitM5}
        />
        <RankingTable
          title={"10분 실시간 상승률"}
          notes={risingCoinUpbitM10}
        />
        {/* <RankingTable
          title={"상승코인 로그"}
          notes={risedCoin}
        /> */}
      </div>
      <div>
        <ReactionTable title={"실시간 반응"}
        crawls={coinCommunityReaction} />
      </div>
    </div>
  );
}

export default Home;