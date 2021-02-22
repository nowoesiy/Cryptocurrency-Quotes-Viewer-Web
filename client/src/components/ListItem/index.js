import React from "react";
import "./index.css";
import { showPrice } from "../../utils/common"

import ReactEcharts from "echarts-for-react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

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

  showRate = (diff, changeRate) => {
    if (changeRate > 0) {
      return (
        <div style={{ color: "#d60000" }} className="list-item-contents">
          {changeRate ? `▲ ${Math.abs(diff).toFixed(0)}(${changeRate}%)` : ""}
        </div>
      );
    } else if (changeRate < 0) {
      return (
        <div style={{ color: "#0051c7" }} className="list-item-contents">
          {changeRate ? `▼ ${Math.abs(diff).toFixed(0)}(${changeRate}%)` : ""}
        </div>
      );
    } else {
      return <div className="list-item-contents">0.000(0.00%)</div>;
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
      changeRate,
      volume
    } = this.props;

    function CreateChart() {
      return (
        <div className="chart">
          <div className="profile_middle">
            <div className="middleleft">
              <h2 style={{ marginBottom: "0px" }}>
                <span>고가</span>
                <span style={{ color: "#d60000" }}>
                  {highPrice
                    ? " " + Number(highPrice[0]).toLocaleString()
                    : "내용"}
                </span>
              </h2>
              <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>
                <span>저가</span>
                <span style={{ color: "#0051c7" }}>
                  {highPrice
                    ? " " + Number(lowPrice[0]).toLocaleString()
                    : "내용"}
                </span>
              </h2>
            </div>
            <h2>
              <span>거래량</span>
              <span>
                {volume ? " " + Number(volume[0]).toFixed(5) : "내용"}
              </span>
            </h2>
          </div>
          <div className="List_Chart">
            <ReactEcharts
              option={{
                grid: {
                  left: 0,
                  top: 10,
                  right: 0,
                  bottom: 10
                },
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
                  show: false,
                  min: Math.min.apply(null, openPrice.slice(0, 15)) * 0.999,
                  max: Math.max.apply(null, openPrice.slice(0, 15)) * 1.001
                },
                series: [
                  {
                    type: "k",

                    data: [
                      [
                        openPrice[15],
                        endPrice[15],
                        lowPrice[15],
                        highPrice[15]
                      ],
                      [
                        openPrice[14],
                        endPrice[14],
                        lowPrice[14],
                        highPrice[14]
                      ],
                      [
                        openPrice[13],
                        endPrice[13],
                        lowPrice[13],
                        highPrice[13]
                      ],
                      [
                        openPrice[12],
                        endPrice[12],
                        lowPrice[12],
                        highPrice[12]
                      ],
                      [
                        openPrice[11],
                        endPrice[11],
                        lowPrice[11],
                        highPrice[11]
                      ],
                      [
                        openPrice[10],
                        endPrice[10],
                        lowPrice[10],
                        highPrice[10]
                      ],
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
              style={{ height: "100%", width: "100%" }}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
              //onChartReady={this.onChartReadyCallback}
            />
          </div>
        </div>
      );
    }

    function CreateSmallChart() {
      return (
        <div className="chart">
          <div className="List_Chart">
            <ReactEcharts
              option={{
                grid: {
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0
                },
                xAxis: {
                  type: "category",
                  show: false,
                  data: [time[0]]
                },
                yAxis: {
                  show: false,
                  min: openPrice[0] * 0.999,
                  max: openPrice[0] * 1.001
                },
                series: [
                  {
                    type: "k",

                    data: [
                      [openPrice[0], endPrice[0], lowPrice[0], highPrice[0]]
                    ]
                  }
                ]
              }}
              style={{ height: "30px", width: "20px", marginTop: "15px" }}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
              //onChartReady={this.onChartReadyCallback}
            />
          </div>
        </div>
      );
    }
    const board = (
      <Link to={"/quote/" + name}>
        <div className={active ? "list_active" : "list"} onClick={onClick}>
          <div className="profile">
            <div className="profile_original">
              <div className="profile_top">
                <h1>
                  <span>{nameKor ? nameKor : "제목"}</span>
                  <span style={{ color: "grey", fontSize: "1.7rem" }}>
                    {name ? " " + name : ""}
                  </span>
                </h1>
                <h1 id="endPrice">
                  {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                </h1>
              </div>
              {fixedCoin.includes(name) ? "" : CreateSmallChart()}
              <div className="profile_stockprice">
                <button
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                    paddingRight: "0px",
                    marginLeft: "150px"
                  }}
                >
                  <FaStar
                    size="20"
                    //color={fixedCoin.includes(name) ? "CCCC00" : "D3D3D3"}
                    className={
                      fixedCoin.includes(name)
                        ? "favoriteButton"
                        : "favoriteNotButton"
                    }
                  ></FaStar>
                </button>
                <h1 id="changeRate">
                  {this.showRate(
                    Number(endPrice[0] - endPrice[2]),
                    changeRate[0]
                  )}
                </h1>
              </div>
            </div>
            {fixedCoin.includes(name) ? CreateChart() : ""}
          </div>
        </div>
      </Link>
    );
    return (
      <div>
        {changeRate != null && openPrice[openPrice.length - 1] != null ? (
          board
        ) : (
          <div
            className="list_loading"
            style={{
              minHeight: "80px",
              textAlign: "center",
              border: "1px solid #eee"
            }}
          >
            <ClipLoader
              css={{
                marginTop: "16px"
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
}

export default ListItem;
