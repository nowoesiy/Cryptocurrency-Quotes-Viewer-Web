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

        const coinlist = this.state.coins.map((coin => {
          return(
            {
              id : coin,
              title : coin,
              time : [],
              openPrice : [],
              endPrice : [],
              highPrice : [],
              lowPrice : [],
              changeRate : '',
            }
          )
        }))

        this.setState({
          notes: [
            ...coinlist
          ],
        })
  }

  RequestPriceList = (c) => {
    axios
    .get(`/resources/chart/${c}_xcoinTrade_01M.json`)
    .then(response => {
      const notes = [...this.state.notes]
      let priceList = []
      priceList.push(response.data[response.data.length-2])
      priceList.push(response.data[response.data.length-3])
      priceList.push(response.data[response.data.length-4])
      const note = notes.find((coin) => coin.id === c)
      // var date = new Date(priceList[0])
      // var hour = date.getHours();
      // var min = date.getMinutes();
      // var sec = date.getSeconds();
      // note.time = hour+":"+min+":"+sec
      note.time = []
      note.openPrice = []
      note.endPrice = []
      note.highPrice = []
      note.lowPrice = []

      for(var i=0; i<=2; i++){
        var date = new Date(priceList[i][0])
        note.time.push(date.getHours()+":"+date.getMinutes())
        note.openPrice.push(priceList[i][1])
        note.endPrice.push(priceList[i][2])
        note.highPrice.push(priceList[i][3])
        note.lowPrice.push(priceList[i][4])
      }
      note.changeRate = ((note.openPrice[0] - note.openPrice[2])/note.openPrice[0]*100).toFixed(3)
      
      priceList = null
      this.setState({
          notes,
      })
      
    })
  }

  time = () => {
    this.state.coins.map((coin => {this.RequestPriceList(coin)}))
    this.state.notes.sort((a, b) => a.changeRate -b.changeRate).reverse()
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



  render() {
    const { notes, activeId } = this.state;
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