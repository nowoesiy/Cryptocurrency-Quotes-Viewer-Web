import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Loading from '../../Loading';

import { showRate, showDiff, showPrice } from  "../../../utils/common"

export default function TestTable({ coin }) {
    const board = (
        <div className="Info-board">
          <table>
            <thead>
              <tr>
                {/* <th>순위</th> */}
                <th>코인명</th>
                <th>현재가</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(coin).map(coinKey => {
                console.log(coin);
                const { code, trade_price} = coin[coinKey];
                return (
                  <tr>
                    <td width="320">
                        <span>
                          {code}
                        </span>
                    </td>
                    <td width="100">{trade_price}</td>
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
        </div>
        {!coin ? (
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