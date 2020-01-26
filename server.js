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

console.log("jenkins test9");

const nameOfCoins = [
  { nameEng: "BTC", nameKor: "비트코인" },
  { nameEng: "BSV", nameKor: "비트코인에스브이" },
  { nameEng: "BNP", nameKor: "베네핏" },
  { nameEng: "XRP", nameKor: "리플" },
  { nameEng: "BCH", nameKor: "비트코인 캐시" },
  { nameEng: "EOS", nameKor: "이오스" },
  { nameEng: "ETH", nameKor: "이더리움" },
  { nameEng: "WPX", nameKor: "더블유플러스" },
  { nameEng: "ETC", nameKor: "이더리움 클래식" },
  { nameEng: "XSR", nameKor: "젠서" },
  { nameEng: "BTG", nameKor: "비트코인 골드" },
  { nameEng: "TRX", nameKor: "트론" },
  { nameEng: "LTC", nameKor: "라이트코인" },
  { nameEng: "QTUM", nameKor: "퀀텀" },
  { nameEng: "SOC", nameKor: "소다코인" },
  { nameEng: "LUNA", nameKor: "루나" },
  { nameEng: "ADA", nameKor: "에이다" },
  { nameEng: "GNT", nameKor: "골렘" },
  { nameEng: "DAD", nameKor: "다드" },
  { nameEng: "IPX", nameKor: "타키온프로토콜" },
  { nameEng: "TRV", nameKor: "트러스트버스" },
  { nameEng: "XLM", nameKor: "스텔라루멘" },
  { nameEng: "BCD", nameKor: "비트코인 다이아몬드" },
  { nameEng: "MTL", nameKor: "메탈" },
  { nameEng: "AE", nameKor: "애터니티" },
  { nameEng: "LINK", nameKor: "체인링크" },
  { nameEng: "TMTG", nameKor: "더마이다스터치골드" },
  { nameEng: "STEEM", nameKor: "스팀" },
  { nameEng: "WTC", nameKor: "월튼체인" },
  { nameEng: "AOA", nameKor: "오로라" },
  { nameEng: "REP", nameKor: "어거" },
  { nameEng: "CON", nameKor: "코넌" },
  { nameEng: "FCT", nameKor: "피르마체인" },
  { nameEng: "DASH", nameKor: "대시" },
  { nameEng: "THETA", nameKor: "쎄타토큰" },
  { nameEng: "FNB", nameKor: "애프앤비프로토콜" },
  { nameEng: "FAB", nameKor: "패블릭" },
  { nameEng: "APIS", nameKor: "아피스" },
  { nameEng: "BTT", nameKor: "비트토렌트" },
  { nameEng: "VALOR", nameKor: "밸러토큰" },
  { nameEng: "GXC", nameKor: "지엑스체인" },
  { nameEng: "ETZ", nameKor: "이더제로" },
  { nameEng: "AMO", nameKor: "아모코인" },
  { nameEng: "MXC", nameKor: "머신익스체인지코인" },
  { nameEng: "VET", nameKor: "비체인" },
  { nameEng: "ZEC", nameKor: "제트캐시" },
  { nameEng: "WAVES", nameKor: "웨이브" },
  { nameEng: "INS", nameKor: "아이앤에스" },
  { nameEng: "OMG", nameKor: "오미세고" },
  { nameEng: "XVG", nameKor: "버지" }
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
