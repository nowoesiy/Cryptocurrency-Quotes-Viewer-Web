import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Loading from '../../Loading';

import { showRate, showDiff, showPrice } from  "../../../utils/common"

export default function RankingTable({ title, notes, onclick }) {
    const board = (
      <div className="Info-board">
        <table>
          <thead>
            <tr>
              {/* <th>순위</th> */}
              <th>코인명</th>
              <th>현재가</th>
              <th>변동폭</th>
              <th>변동률</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(priceJumpCoin => {
              const { nameKor, name, endPrice, changeRate } = priceJumpCoin;
              return (
                <tr>
                  {/* <td width="50">{i + 1}</td> */}
  
                  <td width="320">
                    <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                      <span onClick={() => onclick(name)}>
                        {nameKor}({name})
                      </span>
                    </Link>
                  </td>
                  <td width="140">
                    {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                  </td>
                  <td width="100">
                    {showDiff(Number(endPrice[0] - endPrice[2]))}
                  </td>
                  <td width="100">{showRate(changeRate[0])}</td>
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
        {notes.length != 0 ? (
          board
        ) : (
          <div
            className="loading"
            style={{ minHeight: "218px", textAlign: "center" }}
          >
            <Loading />
          </div>
        )}
      </div>
    );
  }