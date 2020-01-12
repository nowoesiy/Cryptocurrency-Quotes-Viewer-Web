import React from "react";
import "./index.css";
import ReactEcharts from "echarts-for-react";
import { FaStar } from "react-icons/fa";

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stockdata: [
        {
          time: this.props.time,
          open: this.props.openPrice,
          high: this.props.highPrice,
          low: this.props.lowPrice,
          close: this.props.endPrice
        }
      ]
    };
  }

  showRate = changeRate => {
    if (changeRate > 0) {
      return (
        <div style={{ color: "red" }} className="list-item-contents">
          {changeRate ? "▲" + changeRate + "%" : ""}
        </div>
      );
    } else if (changeRate < 0) {
      return (
        <div style={{ color: "blue" }} className="list-item-contents">
          {changeRate ? "▼" + changeRate + "%" : ""}
        </div>
      );
    } else {
      <div className="list-item-contents">{changeRate ? "0%" : ""}</div>;
    }
  };

  showDifference = diff => {
    if (diff > 0) {
      return (
        <div style={{ color: "red" }} className="list-item-contents">
          {diff ? "▲" + diff : ""}
        </div>
      );
    } else if (diff < 0) {
      return (
        <div style={{ color: "blue" }} className="list-item-contents">
          {diff ? "▼" + diff : ""}
        </div>
      );
    } else {
      <div className="list-item-contents">{diff ? "0%" : ""}</div>;
    }
  };

  render() {
    const {
      active,
      name,
      nameKor,
      time,
      openPrice,
      endPrice,
      highPrice,
      lowPrice,
      fixedCoin,
      onClick,
      onFixedIconClick,
      changeRate,
      volume
    } = this.props;

    function CreateChart() {
      return (
        <div className="List_Chart">
          <ReactEcharts
            option={{
              xAxis: {
                type: "category",
                show: false,
                data: [
                  time[15],
                  time[14],
                  time[13],
                  time[12],
                  time[11],
                  time[10],
                  time[9],
                  time[8],
                  time[7],
                  time[6],
                  time[5],
                  time[4],
                  time[3],
                  time[2],
                  time[1],
                  time[0]
                ]
              },
              yAxis: {
                type: "value",
                show: false,
                min: openPrice[0] * 0.999,
                max: openPrice[0] * 1.001
              },
              series: [
                {
                  type: "k",

                  data: [
                    [openPrice[15], endPrice[15], lowPrice[15], highPrice[15]],
                    [openPrice[14], endPrice[14], lowPrice[14], highPrice[14]],
                    [openPrice[13], endPrice[13], lowPrice[13], highPrice[13]],
                    [openPrice[12], endPrice[12], lowPrice[12], highPrice[12]],
                    [openPrice[11], endPrice[11], lowPrice[11], highPrice[11]],
                    [openPrice[10], endPrice[10], lowPrice[10], highPrice[10]],
                    [openPrice[9], endPrice[9], lowPrice[9], highPrice[9]],
                    [openPrice[8], endPrice[8], lowPrice[8], highPrice[8]],
                    [openPrice[7], endPrice[7], lowPrice[7], highPrice[6]],
                    [openPrice[5], endPrice[5], lowPrice[5], highPrice[5]],
                    [openPrice[4], endPrice[4], lowPrice[4], highPrice[4]],
                    [openPrice[3], endPrice[3], lowPrice[3], highPrice[3]],
                    [openPrice[2], endPrice[2], lowPrice[2], highPrice[2]],
                    [openPrice[1], endPrice[1], lowPrice[1], highPrice[1]],
                    [openPrice[0], endPrice[0], lowPrice[0], highPrice[0]]
                  ]
                }
              ]
            }}
            style={{ height: "240px", width: "100%" }}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            //onChartReady={this.onChartReadyCallback}
          />
        </div>
      );
    }

    return (
      <div className={active ? "list_active" : "list"} onClick={onClick}>
        {/* <div className="image">
          <img src="https://via.placeholder.com/64" />
        </div> */}
        <div className="profile">
          <div className="profile_top">
            <h1>{nameKor ? nameKor : "제목"}</h1>
            <h1 style={{ marginLeft: "-21rem", color: "grey" }}>
              {name ? name : ""}
            </h1>
            <button
              style={{
                marginTop: "0.67em",
                marginBottom: "0.67em",
                border: "none",
                background: "none",
                outline: "none"
              }}
              onClick={onFixedIconClick}
            >
              <FaStar
                size="24"
                color={fixedCoin.includes(name) ? "CCCC00" : "D3D3D3"}
              ></FaStar>
            </button>
          </div>

          <div className="profile_stockprice">
            <h1>{this.showDifference(Number(endPrice[0] - endPrice[3]))}</h1>
            <h1>{this.showRate(changeRate)}</h1>
          </div>
          <div className="profile_middle">
            <h2>고가</h2>
            <h2 style={{ color: "#fa5252" }}>
              {highPrice ? highPrice[0] : "내용"}
            </h2>
            <h2>저가</h2>
            <h2 style={{ color: "#228be6" }}>
              {lowPrice ? lowPrice[0] : "내용"}
            </h2>
            <h2>거래량</h2>
            <h2>{volume ? Math.floor(volume[0]) : "내용"}</h2>
          </div>
          {fixedCoin.includes(name) ? CreateChart() : ""}
        </div>
      </div>
    );
  }
}

export default ListItem;
