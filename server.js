const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

let coinInfo = [];

const nameOfCoins = [
  { nameEng: "BTC", nameKor: "비트코인" },
  { nameEng: "ETH", nameKor: "이더리움" },
  { nameEng: "DASH", nameKor: "대시" },
  { nameEng: "LTC", nameKor: "라이트코인" },
  { nameEng: "ETC", nameKor: "이더리움 클래식" },
  { nameEng: "XRP", nameKor: "리플" },
  { nameEng: "BCH", nameKor: "비트코인 캐시" },
  { nameEng: "XMR", nameKor: "모네로" },
  { nameEng: "ZEC", nameKor: "지캐시" },
  { nameEng: "QTUM", nameKor: "퀀텀" },
  { nameEng: "BTG", nameKor: "비트코인 골드" },
  { nameEng: "EOS", nameKor: "이오스" },
  { nameEng: "BCH", nameKor: "비트코인 캐시" },
  { nameEng: "GNT", nameKor: "골렘" },
  { nameEng: "TRX", nameKor: "트론" },
  { nameEng: "VET", nameKor: "비체인" },
  { nameEng: "ICX", nameKor: "아이콘" },
  { nameEng: "ZIL", nameKor: "질리카" },
  { nameEng: "HC", nameKor: "하이퍼캐시" },
  { nameEng: "ELF", nameKor: "엘프" },
  { nameEng: "KNC", nameKor: "카이버네트워크" },
  { nameEng: "MCO", nameKor: "모나코" }
];

const RequestCoinList = () => {
  const coinlist = nameOfCoins.map(nameOfCoin => {
    return {
      id: nameOfCoin.nameEng,
      name: nameOfCoin.nameEng,
      nameKor: nameOfCoin.nameKor,
      time: [],
      openPrice: [],
      endPrice: [],
      highPrice: [],
      lowPrice: [],
      volume: [],
      changeRate: ""
    };
  });
  coinInfo.unshift(...coinlist);
};

RequestCoinList();

const note = {
  id: "BTC",
  name: "BTC",
  nameKor: "비트코인",
  time: [],
  openPrice: [],
  endPrice: [],
  highPrice: [],
  lowPrice: [],
  volume: [],
  changeRate: ""
};

getSeconds = () => {
  let d = new Date();
  return d.getSeconds();
};

const RequestPriceList = c => {
  axios.get(`https://api.bithumb.com/public/ticker/${c}_KRW`).then(response => {
    let coinApi = [];
    if (response.data.status !== "0000") {
      console.log("Error API Call");
    } else {
      coinApi = response.data.data;
    }
    const coins = [...coinInfo];
    const coin = coins.find(coin => coin.id === c);
    var date = new Date(Number(coinApi.date));
    if (coin.openPrice[0] == null) {
      coin.time.unshift(date.getHours() + ":" + date.getMinutes());
      //coin.time.unshift(date);
      coin.openPrice.unshift(coinApi.closing_price);
      coin.highPrice.unshift(coinApi.closing_price);
      coin.lowPrice.unshift(coinApi.closing_price);
      coin.endPrice.unshift(coinApi.closing_price);
      coin.volume.unshift(coinApi.units_traded_24H);
    }
    if (date.getSeconds() == "0") {
      coin.time.unshift(date.getHours() + ":" + date.getMinutes());
      //coin.time.unshift(date);
      coin.openPrice.unshift(coinApi.closing_price);
      coin.highPrice.unshift(coinApi.closing_price);
      coin.lowPrice.unshift(coinApi.closing_price);
      coin.endPrice.unshift(coinApi.closing_price);
      coin.volume.unshift(coinApi.units_traded_24H);
    }
    coin.endPrice[0] = coinApi.closing_price;
    ``;
    coin.highPrice[0] < coinApi.closing_price
      ? (coin.highPrice[0] = coinApi.closing_price)
      : null;
    coin.lowPrice[0] > coinApi.closing_price
      ? (coin.lowPrice[0] = coinApi.closing_price)
      : null;

    coin.changeRate = (
      ((coin.endPrice[0] - coin.endPrice[2]) / coin.endPrice[0]) *
      100
    ).toFixed(3);

    coinInfo = [...coins];
  });
};
time = () => {
  nameOfCoins.map(nameOfCoin => {
    RequestPriceList(nameOfCoin.nameEng);
  });
  //this.state.notes.sort((a, b) => a.changeRate - b.changeRate).reverse();
  //등락률 순 정렬
};

callAPI = setInterval(time, 1000);

app.get("/api/coin/:id", (req, res) => {
  res.set({ "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(coinInfo.find(coin => coin.id == req.params.id)));
});

app.listen(port, () => console.log(`listen on ${port}`));