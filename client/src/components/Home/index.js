import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import RankingTable from '../Table/RankingTable';
import ReactionTable from '../Table/ReactionTable';
import { RISED_COIN, storage } from "../../utils/storage";
import TestTable from "../Table/testTable";

const Home = () => {
    const [risedCoin, setRisedCoin] = useState([]);
    const [risingCoinM3, setRisingCoinM3] = useState([]);
    const [risingCoinM5, setRisingCoinM5] = useState([]);
    const [risingCoinM10, setRisingCoinM10] = useState([]);

    const [risedCoinUpbit, setRisedCoinUpbit] = useState([]);
    const [risingCoinUpbitM3, setRisingCoinUpbitM3] = useState([]);
    const [risingCoinUpbitM5, setRisingCoinUpbitM5] = useState([]);
    const [risingCoinUpbitM10, setRisingCoinUpbitM10] = useState([]);

    const [streamCoin, setStreamCoin] = useState({});
    const [coinCommunityReaction, setCoinCommunityReaction] = useState([]);
  
  const getRisingCoinList = async () => {
    const [{data: risingCoinM3}, {data: risingCoinM5}, {data: risingCoinM10}, {data: risingCoinUpbitM3}, {data: risingCoinUpbitM5}, {data: risingCoinUpbitM10}] = await Promise.all(
      [{minute: 'M3', source: 'bithumb'}, {minute: 'M5', source: 'bithumb'}, {minute: 'M10', source: 'bithumb'},
      {minute: 'M3', source: 'upbit'}, {minute: 'M5', source: 'upbit'}, {minute: 'M10', source: 'upbit'}]
        .map(({minute, source}) => axios.get(`https://vc-fetch-server-union.herokuapp.com/coin/${source}/rising/${minute}`))
      );

      setRisingCoinM3(risingCoinM3);
      setRisingCoinM5(risingCoinM5);
      setRisingCoinM10(risingCoinM10);

      setRisingCoinUpbitM3(risingCoinUpbitM3);
      setRisingCoinUpbitM5(risingCoinUpbitM5);
      setRisingCoinUpbitM10(risingCoinUpbitM10);
  }

  const getCommunityRection = async () => {
    const {data} = await axios.get(`http://cowindo.herokuapp.com/api/crawl:coinpan`);
    setCoinCommunityReaction(data);
  }

  useEffect(()=> {
    setInterval(getRisingCoinList, 1000);
    setInterval(getCommunityRection, 1000);
  },[])

  useEffect(() => {
    const ws = new WebSocket('wss://api.upbit.com/websocket/v1');

    ws.addEventListener("open", event => {
      const upbitData = '[{"ticket":"v1v2v02"},{"type":"ticker","codes":["KRW-BTC", "KRW-ETH", "KRW-XRP", "KRW-EOS", "KRW-XLM"]}]';
      // const upbitData = '[{"ticket":"v1v2v02"},{"type":"ticker","codes":["KRW-BTC"]}]';

      ws.send(upbitData);
    });

    ws.onmessage = (event) => {
      const reader = new FileReader();

      reader.onload = () => {
          const coinList = JSON.parse(reader.result);
          const nextStreamCoin = {...streamCoin};
          nextStreamCoin[coinList.code] = coinList;
          setStreamCoin(streamCoin => ({
            ...streamCoin,
            ...nextStreamCoin,
          }));
      };

      reader.readAsText(event.data);
    };
  }, [])

  // useEffect(()=> {
  //   risingCoinM3.map(coin => {
  //     if(+coin.changeRate > 10) {
  //       if(risedCoin.find(savedCoin => savedCoin.name === coin.name)) {
  //         return;
  //       }
  //       setRisedCoin(risedCoin => [...risedCoin, coin]);
  //     }
  //   })
  // },[risingCoinM3])

  // useEffect(()=> {
  //   risingCoinUpbitM3.map(coin => {
  //     if(+coin.changeRate > 10) {
  //       if(risedCoinUpbit.find(savedCoin => savedCoin.name === coin.name)) {
  //         return;
  //       }
  //       setRisedCoin(risedCoinUpbit => [...risedCoinUpbit, coin]);
  //     }
  //   })
  // },[risingCoinUpbitM3])
  return (
    <div className="home_wrap">
      <div className="Homecoininfo">
        <TestTable coin={streamCoin}>
        </TestTable>
        <RankingTable
          title={"3분 실시간 상승률"}
          notes={risingCoinM3}
        />
        <RankingTable
          title={"5분 실시간 상승률"}
          notes={risingCoinM5}
        />
        <RankingTable
          title={"10분 실시간 상승률"}
          notes={risingCoinM10}
        />
        {/* <RankingTable
          title={"상승코인 로그"}
          notes={risedCoin}
        /> */}
      </div>
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
