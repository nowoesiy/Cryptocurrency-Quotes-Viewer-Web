import React, { useEffect, useState } from 'react';
import Loading from '../../Loading';

export default function ChartTable({ title }) {
    return (
      <div className="CrawlInfo">
          <iframe
            id="tradingview_627c9"
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_627c9&amp;symbol=UPBIT%3ABTCKRW&amp;interval=1&amp;hidesidetoolbar=0&amp;symboledit=1&amp;saveimage=1&amp;toolbarbg=f1f3f6&amp;studies=RSI%40tv-basicstudies%1F&amp;theme=dark&amp;style=1&amp;timezone=Asia%2FSeoul&amp;studies_overrides=%7B%7D&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;locale=kr&amp;utm_source=sigbtc.pro&amp;utm_medium=widget&amp;utm_campaign=chart&amp;utm_term=UPBIT%3ABTCKRW"
            style={{width: "100%", height: '100%', margin: 0, padding: 0, borderRadius: '5px'}}
            frameborder="0"
            allowtransparency="true"
            scrolling="no"
            allowfullscreen="">
          </iframe>
      </div>
    );
  }