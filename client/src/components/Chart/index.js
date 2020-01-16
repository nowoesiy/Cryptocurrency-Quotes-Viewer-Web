import React, {Component} from "react";
import Chart from "chart.js"

class LineChart extends Component {

    chart = null;

    draw() {

        if(this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        let time = this.props.time
        let price = this.props.price

        const config = {
            type: "line",
            data: {
              labels: time,
              datasets: [
                {
                  label: "price",
                  data: price,
                  fill: false,
                  backgroundColor: 'blue',
                  borderColor: 'blue',
                  lineTension: 0,
                  pointRadius: 0,
                }
              ]
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: `24hr Chart`
              },
              tooltips: {
                mode: "index",
                intersect: false
              },
              hover: {
                mode: "nearest",
                intersect: true
              }
            }
          };
          const ctx = this.canvas.getContext("2d");
          this.chart = new Chart(ctx, config);
    }

    componentDidMount() {
        this.draw();
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
          this.draw();
        }
      }
    
      componentWillUnmount() {
        // 컴포넌트가 사라질 때 인스턴스 제거
        if (this.chart) {
          this.chart.destroy();
        }
      }

      render() {
        return (
          <div className="LineChart">
            {/* 
              ref 를 통해서 실제 DOM 에 대한 접근
            */}
            <canvas ref={ref => (this.canvas = ref)} />
          </div>
        );
      }

}

export default LineChart;