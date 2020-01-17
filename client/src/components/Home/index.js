import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
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
              <th>등락폭(3M)</th>
              <th>등락률</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((priceJumpCoin, i) => {
              const { nameKor, name, endPrice, changeRate } = priceJumpCoin;
              return (
                <tr>
                  <td width="50">{i + 1}</td>

                  <td width="300" onClick={() => onclick(name)}>
                    <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                      {nameKor}({name})
                    </Link>
                  </td>
                  <td width="140" style={{ color: "rgb(214, 0, 0)" }}>
                    \ {Number(endPrice[0]).toLocaleString()}
                  </td>
                  <td width="120" style={{ color: "rgb(214, 0, 0)" }}>
                    ▲{" "}
                    {Number(endPrice[0] - endPrice[2]) < 15
                      ? Number(endPrice[0] - endPrice[2]).toFixed(3)
                      : Number(endPrice[0] - endPrice[2]).toLocaleString()}
                  </td>
                  <td width="120" style={{ color: "rgb(214, 0, 0)" }}>
                    {Number(changeRate).toFixed(3)} %
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CreateFavoriteCoinInfo({ title, notes, fixedCoin }) {
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
                <th>등락폭(3M)</th>
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
                        {nameKor}({name})
                      </td>
                      <td width="140">
                        \ {Number(endPrice[0]).toLocaleString()}
                      </td>
                      <td width="120">
                        ▲{" "}
                        {Number(endPrice[0] - endPrice[2]) < 15
                          ? Number(endPrice[0] - endPrice[2]).toFixed(3)
                          : Number(endPrice[0] - endPrice[2]).toLocaleString()}
                      </td>
                      <td width="120">{Number(changeRate).toFixed(3)} %</td>
                      <td width="120">
                        {Number(highPrice[0]).toLocaleString()}
                      </td>
                      <td width="120">
                        {Number(lowPrice[0]).toLocaleString()}
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
    priceJumpCoins: []
  };

  callPumpCoinList = () => {
    const { notes } = this.props;
    let priceJumpCoins = notes.slice();
    priceJumpCoins.sort((a, b) => a.changeRate - b.changeRate).reverse();
    priceJumpCoins = priceJumpCoins.slice(0, 5);
    this.setState({
      priceJumpCoins
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
    const { priceJumpCoins } = this.state;
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
              title={"실시간 거래량 Top5"}
              notes={priceJumpCoins}
            />
          )}
        </div>
        <div className="Homefavcoininfo">
          {notes.length != 0 && (
            <CreateFavoriteCoinInfo
              title={"관심 코인"}
              notes={notes}
              fixedCoin={fixedCoin}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
