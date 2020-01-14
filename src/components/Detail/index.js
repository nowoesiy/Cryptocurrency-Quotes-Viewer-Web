import React from "react";
import "./index.css";

class Detail extends React.Component {
  render() {
    const { note } = this.props;
    const { nameKor, name, endPrice } = note;
    return (
      <div className="coinDetail">
        <h1>
          <span style={{ fontWeight: "900", fontSize: "38px" }}>
            <strong>{nameKor}</strong>
          </span>
          <span style={{ color: "grey", fontSize: "28px" }}> {name}/KRW</span>
        </h1>
        <h1>
          <span style={{ fontSize: "42px" }}>
            \ {Number(endPrice[0]).toLocaleString()}
          </span>
        </h1>
        <h1>
          <span style={{ fontSize: "38px", color: "blue" }}>
            ▼ 2000(-0.021%)
          </span>
        </h1>
      </div>
    );
  }
}

export default Detail;
