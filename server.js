const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
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

getHtml = async () => {
  try {
    return await axios.get("https://coinpan.com/free");
  } catch (error) {
    console.error(error);
  }
};

getInvesting = async () => {
  try {
    return await axios.get("https://kr.investing.com/news/cryptocurrency-news");
  } catch (error) {
    console.error(error);
  }
};

callAPI = setInterval(time, 1000);
callCrawl = setInterval(getHtml, 10000);
callNewCrawl = setInterval(getInvesting, 10000);

app.get("/api/crawl:coinpan", function(req, res, next) {
  getHtml()
    .then(html => {
      let ulList = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("tr.bg2");

      $bodyList.each(function(i, elem) {
        {
          ulList[i] = {
            title: $(this)
              .find("td.title a")
              .text()
              .trim()
              .slice(0, 30)
              .trim(),
            url: $(this)
              .find("td.title a")
              .attr("href"),
            date: $(this)
              .find("td.time span.number span.regdateHour")
              .text()
          };
        }
      });
      ulList = ulList.filter(ul => {
        return ul.title.length >= 3;
      });
      return ulList;
    })
    .then(ulList => {
      // title = ulList.map(ul => {
      //   return ul.title;
      // });
      res.json(ulList);
    });
});

app.get("/api/crawl/investing", function(req, res, next) {
  getInvesting()
    .then(html => {
      let List = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("div.largeTitle article.js-article-item");

      $bodyList.each(function(i, elem) {
        {
          List[i] = {
            title: $(this)
              .find("div.textDiv a.title")
              .text()
              .trim(),
            url: $(this)
              .find("div.textDiv a.title")
              .attr("href")
          };
        }
      });
      return List;
    })
    .then(List => {
      res.json(List);
    });
});

app.get("/api/coin/:id", (req, res) => {
  res.set({ "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(coinInfo.find(coin => coin.id == req.params.id)));
});

app.listen(port, () => console.log(`listen on ${port}`));
