import React from "react";
import "./index.css";

class Detail extends React.Component {
  render() {
    const { note } = this.props;
    const { title, contents } = note;
    return (
      <div className="coinDetail">
        <h1>
          <span style={{ fontWeight: "900", fontSize: "38px" }}>
            <strong>비트코인</strong>
          </span>
          <span style={{ color: "grey", fontSize: "28px" }}> BTC/KRW</span>
        </h1>
      </div>
    );
  }
}

export default Detail;
