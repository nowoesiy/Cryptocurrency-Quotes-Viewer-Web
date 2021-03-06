import React, { useEffect, useState } from 'react';
import Loading from '../../Loading';

export default function NoticeTable({ title, notices }) {
    const [currentNotices, setCurrentCoins] = useState([]);

    useEffect(() => {
        const isUpdatedNotice = () => notices[0].id !== currentNotices[0].id;
        if(notices[0] && currentNotices[0] && isUpdatedNotice()) {
            const audio = new Audio("https://freesound.org/data/previews/213/213795_4001802-lq.mp3");
            audio.play();
        }
        setCurrentCoins(notices);
    }, [notices])

    const board = (
      <div className="Fav-board">
        <table>
          <thead>
            <tr>
              <th>코인</th>
              <th>공시내용</th>
            </tr>
          </thead>
          <tbody>
            {currentNotices.map(notice => {
              const { assets, text, url } = notice;
              return (
                <tr>
                  <td width="60">
                    {assets}
                  </td>
                  <td id="titleCrawl" width="350">
                    <a
                      style={{ color: "#000000" }}
                      href={url}
                      target="_blank"
                    >
                      {text}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
    return (
      <div className="CrawlInfo">
        <div className="Table-title">
          <span>{title}</span>
        </div>
        {currentNotices.length != 0 ? (
          board
        ) : (
            <Loading />
        )}
      </div>
    );
  }