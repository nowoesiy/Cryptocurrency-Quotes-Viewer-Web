import React from "react";
import "./index.css";
import ReactEcharts from "echarts-for-react";
import { FaPowerOff } from "react-icons/fa";

class Detail extends React.Component {
  showRate = (diff, changeRate) => {
    if (changeRate > 0) {
      return (
        <h1>
          <span style={{ color: "#d60000", fontSize: "32px" }}>
            {changeRate ? `▲${diff.toFixed(0)}(${changeRate}%)` : ""}
          </span>
        </h1>
      );
    } else if (changeRate < 0) {
      return (
        <h1>
          <span style={{ color: "#0051c7", fontSize: "32px" }}>
            {changeRate ? `▼ ${Math.abs(diff).toFixed(0)}(${changeRate}%)` : ""}
          </span>
        </h1>
      );
    } else {
      return (
        <h1>
          <span style={{ fontSize: "32px" }}>0.000(0.00%)</span>
        </h1>
      );
    }
  };

  render() {
    const { note } = this.props;
    const {
      nameKor,
      name,
      endPrice,
      changeRate,
      time,
      openPrice,
      highPrice,
      lowPrice,
      volume
    } = note;

    function CreateDetailChart() {
      return (
        <div className="chart">
          <div className="List_Chart">
            <ReactEcharts
              option={{
                tooltip: {
                  trigger: "axis"
                },
                calculable: true,
                xAxis: {
                  type: "category",
                  boundaryGap: false,
                  minInterval: 5,

                  data: [
                    time[29],
                    time[28],
                    time[27],
                    time[26],
                    time[25],
                    time[24],
                    time[23],
                    time[22],
                    time[21],
                    time[20],
                    time[19],
                    time[18],
                    time[17],
                    time[16],
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
                  scale: true,
                  type: "value",
                  boundaryGap: true,
                  min:
                    openPrice[0] * 0.995 -
                    ((openPrice[0] * 0.995) %
                      Math.pow(10, Math.ceil(Math.log10(openPrice[0])) - 3)),
                  max:
                    openPrice[0] * 1.005 -
                    ((openPrice[0] * 1.005) %
                      Math.pow(10, Math.ceil(Math.log10(openPrice[0])) - 3))
                },
                series: [
                  {
                    type: "k",

                    data: [
                      [
                        openPrice[29],
                        endPrice[29],
                        lowPrice[29],
                        highPrice[29]
                      ],
                      [
                        openPrice[28],
                        endPrice[28],
                        lowPrice[28],
                        highPrice[28]
                      ],
                      [
                        openPrice[27],
                        endPrice[27],
                        lowPrice[27],
                        highPrice[27]
                      ],
                      [
                        openPrice[26],
                        endPrice[26],
                        lowPrice[26],
                        highPrice[26]
                      ],
                      [
                        openPrice[25],
                        endPrice[25],
                        lowPrice[25],
                        highPrice[25]
                      ],
                      [
                        openPrice[24],
                        endPrice[24],
                        lowPrice[24],
                        highPrice[24]
                      ],
                      [
                        openPrice[23],
                        endPrice[23],
                        lowPrice[23],
                        highPrice[23]
                      ],
                      [
                        openPrice[22],
                        endPrice[22],
                        lowPrice[22],
                        highPrice[22]
                      ],
                      [
                        openPrice[21],
                        endPrice[21],
                        lowPrice[21],
                        highPrice[21]
                      ],
                      [
                        openPrice[20],
                        endPrice[20],
                        lowPrice[20],
                        highPrice[20]
                      ],
                      [
                        openPrice[19],
                        endPrice[19],
                        lowPrice[19],
                        highPrice[19]
                      ],
                      [
                        openPrice[18],
                        endPrice[18],
                        lowPrice[18],
                        highPrice[18]
                      ],
                      [
                        openPrice[17],
                        endPrice[17],
                        lowPrice[17],
                        highPrice[17]
                      ],
                      [
                        openPrice[16],
                        endPrice[16],
                        lowPrice[16],
                        highPrice[16]
                      ],
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
              style={{ height: "480px", width: "100%" }}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
              //onChartReady={this.onChartReadyCallback}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="coinDetail">
          <div className="coinDetailInfo">
            <h1>
              <span style={{ fontWeight: "900", fontSize: "32px" }}>
                <strong>{nameKor}</strong>
              </span>
              <span style={{ color: "grey", fontSize: "24px" }}>
                {" "}
                {name}/KRW
              </span>
            </h1>
            <h1>
              <span style={{ fontSize: "38px" }}>
                \ {Number(endPrice[0]).toLocaleString()}
              </span>
            </h1>
            {this.showRate(Number(endPrice[2] - endPrice[0]), changeRate)}
          </div>
          <div className="coinDetailInfoSub">
            <h2
              style={{
                marginBottom: "0px",
                fontSize: "22px",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>고가(3M)</span>
              <span style={{ color: "#d60000" }}>
                {highPrice
                  ? " " + Number(highPrice[0]).toLocaleString()
                  : "내용"}
              </span>
            </h2>
            <h2
              style={{
                marginBottom: "0px",
                marginTop: "5px",
                fontSize: "22px",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>저가(3M)</span>
              <span style={{ color: "#0051c7" }}>
                {highPrice
                  ? " " + Number(lowPrice[0]).toLocaleString()
                  : "내용"}
              </span>
            </h2>
            <h2
              style={{
                marginBottom: "0px",
                marginTop: "5px",
                fontSize: "22px",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>거래량</span>
              <span>
                {volume ? " " + Number(volume[0]).toLocaleString() : "내용"}
              </span>
            </h2>
            <h2
              style={{
                marginBottom: "0px",
                marginTop: "5px",
                fontSize: "22px",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>시가총액</span>
              <span>
                {volume ? " " + Number(volume[0]).toLocaleString() : "내용"}
              </span>
            </h2>
          </div>
          <div className="coinDetialChart">{CreateDetailChart()}</div>
        </div>
      </div>
    );
  }
}

export default Detail;
