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
        ]
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
    // this.draw()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.time !== this.props.time) {
      // this.draw()
    }
  }
  render() {

    const { active, title, time, openPrice, endPrice, highPrice, lowPrice, onClick } = this.props;

    return (
      <div
        className={active ? "list-item active" : "list-item"}
        onClick={onClick}
      >
        <div className="title">{title ? title : '제목'}</div>
        <div className="list-item-contents">{time ? time : '내용'}</div>
        <div className="list-item-contents">{openPrice ? openPrice : '내용'}</div>
        <div className="list-item-contents">{endPrice ? endPrice : '내용'}</div>
        <div className="list-item-contents">{highPrice ? highPrice : '내용'}</div>
        <div className="list-item-contents">{lowPrice ? lowPrice : '내용'}</div>
        <ReactEcharts
        option={{
          xAxis: {
              data: ['2017-10-24', '2017-10-25', '2017-10-26', time]
          },
          yAxis: {},
          series: [{
              type: 'k',
              data: [
                  [20, 30, 10, 35],
                  [40, 35, 30, 55],
                  [33, 38, 33, 40],
                  [openPrice, highPrice, lowPrice, endPrice]
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