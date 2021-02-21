import React from 'react';
import Loading from '../../Loading';

export default function NewsTable({ title, crawlNews }) {
    const board = (
      <div className="Fav-board">
        <table>
          <tbody>
            {crawlNews.slice(0, 9).map(crawl => {
              const { title, url, date } = crawl;
              return (
                <tr>
                  <td id="titleCrawlNews" width="350">
                    <a
                      style={{ color: "#000000" }}
                      href={`https://kr.investing.com/${url}`}
                      target="_blank"
                    >
                      {title}
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
        {crawlNews.length != 0 ? (
          board
        ) : (
          <div
            className="loading"
            style={{ minHeight: "350px", textAlign: "center" }}
          >
            <Loading />
          </div>
        )}
      </div>
    );
  }