import React,{useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import { showRate, showPrice } from  "../../../utils/common"

export default function HotTable({ title, notes }) {
    const openBlankWindow = (name) => {
      console.log(name);
      const BITHUMB_URL = 'www.bithumb.com'
      window.open(`${BITHUMB_URL}/trade/order/${name}_KRW`);
    }

    const board = (
      <div className="Info-board">
        <table>
          <thead>
            <tr>
              <th rowSpan="2">코인명</th>
              <th rowSpan="2">현재가</th>
              <th colSpan="3" style={{ borderBottom: "1px solid" }}>
                변동률
              </th>
            </tr>
            <tr>
              <th>3분</th>
              <th>5분</th>
              <th>10분</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(hotCoin => {
              const { nameKor, name, endPrice, changeRate } = hotCoin;
              return (
                <tr>
                  <td width="310">
                      <span onClick={() => {openBlankWindow(name)}}>
                        {nameKor}({name})
                      </span>
                  </td>
                  <td width="140">
                    {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                  </td>
                  <td width="100">{showRate(changeRate[0])}</td>
                  <td width="100">{showRate(changeRate[1])}</td>
                  <td width="100">{showRate(changeRate[2])}</td>
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
          <h2
            style={{
              textAlign: "center",
              marginTop: "100px",
              color: "#808080"
            }}
          >
            핫코인이 없군요 :(
          </h2>
        )}
      </div>
    );
  }