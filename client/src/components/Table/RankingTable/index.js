import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Loading from '../../Loading';

import { showRate, showDiff, showPrice } from  "../../../utils/common"

export default function RankingTable({ title, notes }) {
    const board = (
      <div className="Info-board">
        <table>
          <thead>
            <tr>
              {/* <th>순위</th> */}
              <th>코인명</th>
              <th>변동률</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(priceJumpCoin => {
              const { name, symbol, changeRate} = priceJumpCoin;
              return (
                <tr>
                  <td width="320">
                      <span>
                        {name}({symbol})
                      </span>
                  </td>
                  <td width="100">{showRate(changeRate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="JumpCoinInfo">
        <div className="Table-title">
          <span>{title}</span>
        </div>
        {notes.length === 0 ? (
          <div
            className="loading"
            style={{ minHeight: "218px", textAlign: "center" }}
          >
            <Loading />
          </div>
        ) : (
          board
        )}
      </div>
    );
  }