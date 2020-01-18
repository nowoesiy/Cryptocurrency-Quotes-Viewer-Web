import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { showRate, showDiff, showPrice } from "../../common";
function CreateCoinInfo({ title, notes, onclick }) {
  return (
    <div className="JumpCoinInfo">
      <div className="Info-title">
        <span>{title}</span>
      </div>
      <div className="Info-board">
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>코인명</th>
              <th>현재가</th>
              <th>등락폭</th>
              <th>등락률</th>
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
                  <td width="120">{showRate(changeRate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CreateFavoriteCoinInfo({ title, notes, fixedCoin, onclick }) {
  return (
    <div className="FavCoinInfo">
      <div className="Fav-title">
        <span>{title}</span>
      </div>
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
                        <Link
                          style={{ color: "#000000" }}
                          to={"/quote/" + name}
                        >
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
    const { notes, fixedCoin, onListItemClick } = this.props;
    console.log(notes.filter(note => fixedCoin.includes(note.id)));
    return (
      <div>
        <div className="Homecoininfo" style={{ display: "flex" }}>
          {priceJumpCoins.length != 0 && (
            <CreateCoinInfo
              title={"실시간 상승률 Top5"}
              notes={priceJumpCoins}
              onclick={onListItemClick}
            />
          )}
          {priceJumpCoins.length != 0 && (
            <CreateCoinInfo
              title={"실시간 하락률 Top5"}
              notes={priceSlumpCoins}
            />
          )}
        </div>
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
      </div>
    );
  }
}

export default Home;
