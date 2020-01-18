import React from "react";

export const showRate = changeRate => {
  if (changeRate > 0) {
    return (
      <span style={{ color: "#d60000" }}>
        {changeRate ? `${changeRate}%` : ""}
      </span>
    );
  } else if (changeRate < 0) {
    return (
      <span style={{ color: "#0051c7" }}>
        {changeRate ? `${changeRate}%` : ""}
      </span>
    );
  } else {
    return <span>0.00%</span>;
  }
};

export const showDiff = diff => {
  if (diff > 0) {
    return (
      <span style={{ color: "#d60000" }}>
        {diff ? `▲ ${Math.abs(diff).toLocaleString()}` : ""}
      </span>
    );
  } else if (diff < 0) {
    return (
      <span style={{ color: "#0051c7" }}>
        {diff ? `▼ ${Math.abs(diff).toLocaleString()}` : ""}
      </span>
    );
  } else {
    return <span>0.000</span>;
  }
};

export const showPrice = (priceF, priceB) => {
  if (priceF - priceB > 0) {
    return (
      <span style={{ color: "#d60000" }}>
        {priceF ? `\\ ${Math.abs(priceF).toLocaleString()}` : ""}
      </span>
    );
  } else if (priceB - priceF < 0) {
    return (
      <span style={{ color: "#0051c7" }}>
        {priceF ? `\\ ${Math.abs(priceF).toLocaleString()}` : ""}
      </span>
    );
  } else {
    return <span>{priceF.toLocaleString()}</span>;
  }
};
