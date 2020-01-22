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
            <th>순위</th>
            <th>코인명</th>
            <th>현재가</th>
            <th>등락폭</th>
            {/* <th>등락률</th> */}
          </tr>
        </thead>
        <tbody>
          {notes.map((priceJumpCoin, i) => {
            const { nameKor, name, endPrice, changeRate } = priceJumpCoin;
            return (
              <tr>
                <td width="50">{i + 1}</td>

                <td width="300">
                  <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                    <span onClick={() => onclick(name)}>
                      {nameKor}({name})
                    </span>
                  </Link>
                </td>
                <td width="140">
                  {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                </td>
                <td width="120">
                  {showDiff(Number(endPrice[0] - endPrice[2]))}
                </td>
                {/* <td width="120">{showRate(changeRate)}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="JumpCoinInfo">
      <div className="Info-title">
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
              <th>코인명</th>
              <th>현재가</th>
              <th>등락폭</th>
              <th>등락률</th>
              <th>고가</th>
              <th>저가</th>
              <th>거래량</th>
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
                    <td width="140">
                      <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                        <span onClick={() => onclick(name)}>
                          {nameKor}({name})
                        </span>
                      </Link>
                    </td>
                    <td width="140">
                      {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                    </td>
                    <td width="120">
                      {showDiff(Number(endPrice[0] - endPrice[2]))}
                    </td>
                    <td width="120">{showRate(changeRate)}</td>
                    <td width="120" style={{ color: "#d60000" }}>
                      \ {Number(highPrice[0]).toLocaleString()}
                    </td>
                    <td width="120" style={{ color: "#0051c7" }}>
                      \ {Number(lowPrice[0]).toLocaleString()}
                    </td>
                    <td width="120">{Number(volume[0]).toLocaleString()}</td>
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
      <div className="Fav-title">
        <span>{title}</span>
      </div>
      {notes[notes.length - 1].openPrice[0] != null ? (
        board
      ) : (
        <div
          className="loading"
          style={{ minHeight: "110px", textAlign: "center" }}
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
          {crawls.slice(0, 6).map(crawl => {
            const { title, url, date } = crawl;
            return (
              <tr>
                <td width="60">
                  <img width={60} src={coinpan_logo} />
                </td>
                <td width="350">
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
      <div className="Fav-title">
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
                <td width="350">
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
      <div className="Fav-title">
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
    priceSlumpCoins: []
  };

  callPumpCoinList = () => {
    const { notes } = this.props;
    let priceJumpCoins = notes.slice();
    let priceSlumpCoins = notes.slice();
    priceJumpCoins.sort((a, b) => a.changeRate - b.changeRate).reverse();
    priceSlumpCoins.sort((a, b) => a.changeRate - b.changeRate);
    priceJumpCoins = priceJumpCoins.slice(0, 5);
    priceSlumpCoins = priceSlumpCoins.slice(0, 5);

    this.setState({
      priceJumpCoins,
      priceSlumpCoins
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
    const { priceJumpCoins, priceSlumpCoins } = this.state;
    const { notes, crawls, crawlNews, fixedCoin, onListItemClick } = this.props;
    return (
      <div>
        <div className="Homefavcoininfo">
          {notes.length != 0 && (
            <CreateFavoriteCoinInfo
              title={"관심 코인"}
              notes={notes}
              fixedCoin={fixedCoin}
              onclick={onListItemClick}
            />
          )}
        </div>
        <div className="Homecoininfo" style={{ display: "flex" }}>
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
        <div style={{ display: "flex" }}>
          <CreateCrawlInfo title={"실시간 반응"} crawls={crawls} />
          <CreateCrawlNews title={"코인 뉴스"} crawlNews={crawlNews} />
        </div>
      </div>
    );
  }
}

export default Home;
