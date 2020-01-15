export const showRate = (diff, changeRate) => {
  if (changeRate > 0) {
    return (
        {changeRate ? `¡ã ${diff.toFixed(0)}(${changeRate}%)` : ""}
    );
  } else if (changeRate < 0) {
    return (
      <h1 style={{ color: "#0051c7" }}>
        {changeRate ? `¡å ${Math.abs(diff).toFixed(0)}(${changeRate}%)` : ""}
      </h1>
    );
  } else {
    return <h1>0.000(0.00%)</h1>;
  }
};
