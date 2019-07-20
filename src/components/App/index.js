import React from 'react';
import './index.css';
import Header from '../Header';
import List from '../List';
import Note from '../Note';
import axios from 'axios'
import { generateId } from '../../utils';

class App extends React.Component {
  state = {
    notes: [],
    activeId: 'BTC',
    coins: ["BTC", "ETH", "DASH", "LTC", "ETC", "XRP", "BCH", "XMR", "ZEC", "QTUM", "BTG", "EOS", "OMG", "GNT", "TRX", "VET", "ICX", "ZIL", "HC", "MITH", "ELF", "KNC", "ETHOS", "MCO", "STEEM", "STRAT", "LRC", "GTO", "WAX", "POWR", "PAY", "ZRX", "REP", "AE", "XEM", "RDN", "SALT", "LOOM", "SNT", "ADA", "PPT", "CTXC", "CMT", "THETA", "WTC", "ITC", "TRUE", "ABT", "RNT", "PLY", "WAVES", "LINK", "ENJ", "PST", "INS", "PIVX", "BCD", "BZNT", "XLM", "OCN", "BSV", "BAT", "TMTG", "XVG", "WET", "IOST", "POLY", "ARN", "ETZ", "APIS", "MTL", "DAC", "DACC", "BTT", "HDAC", "NPXS", "AUTO", "GXC", "ORBS", "ANKR", "MIX", "HYC", "LBA", "LAMB"]
  }

  RequestCoinList = () => {
    axios
    .get("/resources/csv/total_ticker.json")
      .then(response => {

        const coins = Object.keys(response.data)
        const coinlist = coins.map((coin => {
          return(
            {
              id : coin,
              title : coin,
              time : "",
              openPrice : "Loading...",
              endPrice : "Loading...",
              highPrice : "Loading...",
              lowPrice : "Loading...",
            }
          )
        }))

        this.setState({
          notes: [
            ...coinlist
          ],
        })
      })
  }

  RequestPriceList = async (c) => {
    axios
    .get(`/resources/chart/${c}_xcoinTrade_01M.json`)
    .then(response => {
      const notes = [...this.state.notes]
      const priceList = []
      priceList.push(response.data[response.data.length-2])
      priceList.push(response.data[response.data.length-3])
      priceList.push(response.data[response.data.length-4])
      console.log(priceList)
      const note = notes.find((coin) => coin.id === c)
      // var date = new Date(priceList[0])
      // var hour = date.getHours();
      // var min = date.getMinutes();
      // var sec = date.getSeconds();
      // note.time = hour+":"+min+":"+sec
      note.openPrice = []
      note.openPrice = priceList[0][1]
      // note.openPrice.push(priceList[0][2])
      // note.openPrice.push(priceList[0][3])
      console.log(note.openpirce)
      // note.endPrice = priceList[2]
      // note.highPrice = priceList[3]
      // note.lowPrice = priceList[4]


      console.log(priceList[0][0])
      this.setState({
          notes,
      })
    })
  }

  time = () => {
    this.state.coins.map((coin => {this.RequestPriceList(coin)}))
  }
  handleListItemClick = (id) => {
    this.setState({ activeId: id });
  }


  handleEditNote = (type, e) => {
    const notes = [ ...this.state.notes ];
    const note = notes.find((item) => item.id === this.state.activeId)
    note[type] = e.target.value;
    this.setState({
      notes,
    });
  }

  componentDidMount() {
    this.RequestCoinList();
    this.time();
    this.interval = setInterval(this.time, 10000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notes !== this.props.notes) {
      this.state.coins.map((coin => {this.RequestPriceList(coin)}))
    }
  }


  render() {
    const { notes, activeId, ones, twos, threes } = this.state;
    const activeNote = notes.filter((item) => item.id === activeId)[0];
    return (
      <div className="app">
        <Header/>
        <div className="container">
          <List
            notes={notes}
            activeId={activeId}
            onListItemClick={this.handleListItemClick}
          />
          {
            notes.length !== 0 && <Note note={activeNote} onEditNote={this.handleEditNote} />
          }
        </div>
      </div>
    );
  }
}

export default App;