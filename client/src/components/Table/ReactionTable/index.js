import React from 'react';
import Loading from '../../Loading';
import coinpan_logo from "../../../static/img/coinpan_logo.png";

export default function ReactionTable({ title, crawls }) {
    
    const board = (
      <div className="Fav-board">
        <table>
          <thead>
            <tr>
              <th>소스</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {crawls.slice(0, 7).map(crawl => {
              const { title, url, date } = crawl;
              return (
                <tr>
                  <td width="60">
                    <img id="coinpanlogo" width={60} src={coinpan_logo} />
                  </td>
                  <td id="titleCrawl" width="350">
                    <a
                      style={{ color: "#000000" }}
                      href={`https://coinpan.com${url}`}
                      target="_blank"
                    >
                      {title}
                    </a>
                  </td>
                  <td width="70">{date}</td>
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
        {crawls.length != 0 ? (
          board
        ) : (
            <Loading />
        )}
      </div>
    );
  }