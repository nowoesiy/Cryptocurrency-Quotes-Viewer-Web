import React from 'react';
import './index.css';
import { createChart } from 'lightweight-charts';
import ReactEcharts from 'echarts-for-react';

class ListItem extends React.Component {

  constructor(props) {
    super(props);

    console.log(this.props)
    this.state = {
        stockdata : [
          {
            time: this.props.time,
            open: this.props.openPrice,
            high: this.props.highPrice,
            low: this.props.lowPrice,
            close: this.props.endPrice
          }
        ],

    }

    
  }


  
  
  
  // draw() {

  //   var chart = createChart(this.mydiv, {
  //     width: 150,
  //     height: 150,
  //     layout: {
  //       backgroundColor: '#ffffff',
  //       textColor: 'rgba(255, 255, 255, 0.9)',
  //     },
  //     grid: {
  //       vertLines: {
  //         color: 'rgba(197, 203, 206, 0.5)',
  //       },
  //       horzLines: {
  //         color: 'rgba(197, 203, 206, 0.5)',
  //       },
  //     },
  
  //     priceScale: {
  //       borderColor: 'rgba(197, 203, 206, 0.8)',
  //     },
  //     timeScale: {
  //       borderColor: 'rgba(197, 203, 206, 0.8)',
  //     },
  //   });
    
  //   var candleSeries = chart.addCandlestickSeries({
  //     upColor: '#fc0000',
  //     downColor: '#0713f0',
  //     borderDownColor: '#0713f0',
  //     borderUpColor: '#fc0000',
  //     wickDownColor: '#0713f0',
  //     wickUpColor: '#fc0000',
  //   });
  //   candleSeries.setData(this.state.stockdata);
  //   console.log(this.state.stockdata)
  // }

  componentDidMount() {


  }
  
  showRate = (changeRate) => {

    const upStyle = {
      color : "red"
    }

    const downStyle = {
      color : "blue"
    }

    if(changeRate >0) {
      return(
        <div style={upStyle} className="list-item-contents" >{changeRate ? changeRate + '%▲' : '내용'}</div>
      )
    }else if(changeRate <0)
    {
      return(
        <div style={downStyle} className="list-item-contents"  >{changeRate ? changeRate + '%▼': '내용'}</div>
      )
    }
    else{
      <div className="list-item-contents"  >{changeRate ? changeRate: '내용'}</div>
    }
  }

  render() {

    const { active, title, time, openPrice, endPrice, highPrice, lowPrice, onClick, changeRate } = this.props;
    

      return (
        <div
          className={active ? "list-item active" : "list-item"}
          onClick={onClick}
        >
          <div className="title">{title ? title : '제목'}</div>
          <div className="list-item-contents">{time ? time[0] : '내용'}</div>
          {this.showRate(changeRate)}
          <div className="list-item-contents">{openPrice ? "시가 " + openPrice[0] : '내용'}</div>
          <div className="list-item-contents">{endPrice ? "종가 " + endPrice[0] : '내용'}</div>
          <div className="list-item-contents">{highPrice ? "고가 " + highPrice[0] : '내용'}</div>
          <div className="list-item-contents">{lowPrice ? "저가 " + lowPrice[0] : '내용'}</div>
          <ReactEcharts
          option={{
            xAxis: {
                data: [time[2], time[1], time[0]]
            },
            yAxis: {
              type: 'value',
              min: openPrice[0]*0.98,
              max: openPrice[0]*1.02,
            },
            series: [{
                type: 'k',
                data: [
                    [openPrice[2], highPrice[2], lowPrice[2], endPrice[2]],
                    [openPrice[1], highPrice[1], lowPrice[1], endPrice[1]],
                    [openPrice[0], highPrice[0], lowPrice[0], endPrice[0]],
                ]
            }]
        }}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          onChartReady={this.onChartReadyCallback}
      />
        </div>
      );
    }
  
  
}

export default ListItem;