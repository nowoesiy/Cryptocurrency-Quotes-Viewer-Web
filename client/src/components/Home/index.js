import React from "react";
import "./index.css";
import coinpan_logo from "../../coinpan_logo.png";
import { Link } from "react-router-dom";
import { showRate, showDiff, showPrice } from "../../common";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";

function CreateCoinInfo({ title, notes, onclick }) {
  const board = (
    <div className="Info-board">
      <table>
        <thead>
          <tr>
            {/* <th>순위</th> */}
            <th>코인명</th>
            <th>현재가</th>
            <th>변동폭</th>
            <th>변동률</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(priceJumpCoin => {
            const { nameKor, name, endPrice, changeRate } = priceJumpCoin;
            return (
              <tr>
                {/* <td width="50">{i + 1}</td> */}

                <td width="320">
                  <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                    <span onClick={() => onclick(name)}>
                      {nameKor}({name})
                    </span>
                  </Link>
                </td>
                <td width="140">
                  {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                </td>
                <td width="100">
                  {showDiff(Number(endPrice[0] - endPrice[2]))}
                </td>
                <td width="100">{showRate(changeRate[0])}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="JumpCoinInfo">
      <div className="Table-title">
        <span>{title}</span>
      </div>
      {notes.length != 0 ? (
        board
      ) : (
        <div
          className="loading"
          style={{ minHeight: "218px", textAlign: "center" }}
        >
          <ClipLoader
            css={{
              marginTop: "75px"
            }}
            size={60}
            color={"#123abc"}
            loading={true}
          />
        </div>
      )}
    </div>
  );
}

function CreateFavoriteCoinInfo({ title, notes, fixedCoin, onclick }) {
  const board = (
    <div className="Fav-board">
      <table>
        {fixedCoin.length != 0 ? (
          <thead>
            <tr>
              <th rowspan="2">코인명</th>
              <th rowspan="2">현재가</th>
              <th colSpan="5" style={{ borderBottom: "1px solid" }}>
                변동률
              </th>
              {/* <th rowspan="2">고가</th>
              <th rowspan="2">저가</th> */}
              <th rowspan="2">거래금액(24H)</th>
            </tr>
            <tr style={{ fontSize: "1.5rem" }}>
              <th>3분</th>
              <th>5분</th>
              <th>10분</th>
              <th>30분</th>
              <th>60분</th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        <tbody>
          {fixedCoin.length != 0 ? (
            notes
              .filter(note => fixedCoin.includes(note.id))
              .map(note => {
                const {
                  nameKor,
                  name,
                  lowPrice,
                  highPrice,
                  endPrice,
                  changeRate,
                  volume
                } = note;
                return (
                  <tr>
                    <td width="300">
                      <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                        <span onClick={() => onclick(name)}>
                          {nameKor}({name})
                        </span>
                      </Link>
                    </td>
                    <td width="150">
                      {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                    </td>
                    <td width="100">{showRate(changeRate[0])}</td>
                    <td width="100">{showRate(changeRate[1])}</td>
                    <td width="100">{showRate(changeRate[2])}</td>
                    <td width="100">{showRate(changeRate[4])}</td>
                    <td width="100">{showRate(changeRate[5])}</td>
                    {/* <td width="120" style={{ color: "#d60000" }}>
                      \ {Number(highPrice[0]).toLocaleString()}
                    </td>
                    <td width="120" style={{ color: "#0051c7" }}>
                      \ {Number(lowPrice[0]).toLocaleString()}
                    </td> */}
                    <td width="180">
                      \{" "}
                      {Number(volume[0] * endPrice[0]).toLocaleString(
                        undefined,
                        { maximumFractionDigits: 0 }
                      )}
                    </td>
                  </tr>
                );
              })
          ) : (
            <h2
              style={{
                textAlign: "center",
                marginTop: "38px",
                color: "#808080"
              }}
            >
              관심 코인을 등록해주세요!
            </h2>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="FavCoinInfo">
      <div className="Table-title">
        <span>{title}</span>
      </div>
      {notes[notes.length - 1].openPrice[0] != null ? (
        board
      ) : (
        <div
          className="loading"
          style={{ minHeight: "100px", textAlign: "center" }}
        >
          <ClipLoader
            css={{
              marginTop: "20px"
            }}
            size={60}
            color={"#123abc"}
            loading={true}
          />
        </div>
      )}
    </div>
  );
}

function CreateVoluneJumpCoinInfo({ title, notes, onclick }) {
  const board = (
    <div className="Info-board">
      <table>
        <thead>
          <tr>
            {/* <th>순위</th> */}
            <th>코인명</th>
            <th>현재가</th>
            <th>거래금액</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(hotCoin => {
            const { nameKor, name, endPrice, volume } = hotCoin;
            return (
              <tr>
                {/* <td width="50">{i + 1}</td> */}

                <td width="260">
                  <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                    <span onClick={() => onclick(name)}>
                      {nameKor}({name})
                    </span>
                  </Link>
                </td>
                <td width="140">
                  {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                </td>
                <td width="190">
                  \{" "}
                  {Number(
                    (volume[0] - volume[9]) * endPrice[0]
                  ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="JumpCoinInfo">
      <div className="Table-title">
        <span>{title}</span>
      </div>
      {notes.length != 0 ? (
        board
      ) : (
        <div
          className="loading"
          style={{ minHeight: "218px", textAlign: "center" }}
        >
          <ClipLoader
            css={{
              marginTop: "75px"
            }}
            size={60}
            color={"#123abc"}
            loading={true}
          />
        </div>
      )}
    </div>
  );
}

function CreateHotCoinInfo({ title, notes, onclick }) {
  const board = (
    <div className="Info-board">
      <table>
        <thead>
          <tr>
            {/* <th>순위</th> */}
            <th rowSpan="2">코인명</th>
            <th rowSpan="2">현재가</th>
            <th colSpan="3" style={{ borderBottom: "1px solid" }}>
              변동률
            </th>
          </tr>
          <tr>
            <th>3분</th>
            <th>5분</th>
            <th>10분</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(hotCoin => {
            const { nameKor, name, endPrice, changeRate } = hotCoin;
            return (
              <tr>
                {/* <td width="50">{i + 1}</td> */}

                <td width="310">
                  <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                    <span onClick={() => onclick(name)}>
                      {nameKor}({name})
                    </span>
                  </Link>
                </td>
                <td width="140">
                  {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                </td>
                <td width="100">{showRate(changeRate[0])}</td>
                <td width="100">{showRate(changeRate[1])}</td>
                <td width="100">{showRate(changeRate[2])}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="JumpCoinInfo">
      <div className="Table-title">
        <span>{title}</span>
      </div>
      {notes.length != 0 ? (
        board
      ) : (
        <h2
          style={{
            textAlign: "center",
            marginTop: "100px",
            color: "#808080"
          }}
        >
          핫코인이 없군요 :(
        </h2>
      )}
    </div>
  );
}

function CreateCrawlInfo({ title, crawls }) {
  const board = (
    <div className="Fav-board">
      <table>
        <thead>
          <tr>
            <th>소스</th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {crawls.slice(0, 7).map(crawl => {
            const { title, url, date } = crawl;
            return (
              <tr>
                <td width="60">
                  <img id="coinpanlogo" width={60} src={coinpan_logo} />
                </td>
                <td id="titleCrawl" width="350">
                  <a
                    style={{ color: "#000000" }}
                    href={`https://coinpan.com${url}`}
                    target="_blank"
                  >
                    {title}
                  </a>
                </td>
                <td width="70">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="CrawlInfo">
      <div className="Table-title">
        <span>{title}</span>
      </div>
      {crawls.length != 0 ? (
        board
      ) : (
        <div
          className="loading"
          style={{ minHeight: "350px", textAlign: "center" }}
        >
          <ClipLoader
            css={{
              marginTop: "130px"
            }}
            size={60}
            color={"#123abc"}
            loading={true}
          />
        </div>
      )}
    </div>
  );
}

function CreateCrawlNews({ title, crawlNews }) {
  const board = (
    <div className="Fav-board">
      <table>
        <tbody>
          {crawlNews.slice(0, 9).map(crawl => {
            const { title, url, date } = crawl;
            return (
              <tr>
                <td id="titleCrawlNews" width="350">
                  <a
                    style={{ color: "#000000" }}
                    href={`https://kr.investing.com/${url}`}
                    target="_blank"
                  >
                    {title}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="CrawlInfo">
      <div className="Table-title">
        <span>{title}</span>
      </div>
      {crawlNews.length != 0 ? (
        board
      ) : (
        <div
          className="loading"
          style={{ minHeight: "350px", textAlign: "center" }}
        >
          <ClipLoader
            css={{
              marginTop: "130px"
            }}
            size={60}
            color={"#123abc"}
            loading={true}
          />
        </div>
      )}
    </div>
  );
}

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

    let slicepriceCoins = priceJumpCoins.slice(0, 5);
    let slicevolumeCoins = volumeJumpCoins.slice(0, 5);

    let hotCoins = notes
      .filter(
        coins =>
          (coins.changeRate[0] > 1.5 &&
            coins.changeRate[1] > 1.5 &&
            coins.changeRate[2] > 1.5) ||
          coins.changeRate[0] > 4
      )
      .slice(0, 4);

    this.setState({
      priceJumpCoins,
      priceSlumpCoins,
      volumeJumpCoins,
      hotCoins
    });
  };

  callFavCoinList = () => {
    const { notes } = this.props;
  };

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
          <CreateFavoriteCoinInfo
            title={"관심 코인"}
            notes={notes}
            fixedCoin={fixedCoin}
            onclick={onListItemClick}
          />
        )}
        <div className="Homecoininfo">
          <CreateCoinInfo
            title={"실시간 상승률 Top5"}
            notes={priceJumpCoins}
            onclick={onListItemClick}
          />
          <CreateCoinInfo
            title={"실시간 하락률 Top5"}
            notes={priceSlumpCoins}
            onclick={onListItemClick}
          />
        </div>
        <div className="Homecoininfo">
          <CreateVoluneJumpCoinInfo
            title={"실시간 거래금액 Top5"}
            notes={volumeJumpCoins}
            onclick={onListItemClick}
          />
          <CreateHotCoinInfo
            title={"실시간 핫코인"}
            notes={hotCoins}
            onclick={onListItemClick}
          />
        </div>
        <div style={{ display: "flex" }}>
          <CreateCrawlInfo title={"실시간 반응"} crawls={crawls} />
          <CreateCrawlNews title={"코인 뉴스"} crawlNews={crawlNews} />
        </div>
      </div>
    );
  }
}

export default Home;
