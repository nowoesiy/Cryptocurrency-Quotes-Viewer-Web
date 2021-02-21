import React from 'react';
import { Link } from "react-router-dom";
import { showRate, showPrice } from  "../../../utils/common"
import Loading from '../../Loading';

export default function FavoriteTable({ title, notes, fixedCoin, onclick }) {
    const board = (
      <div className="Fav-board">
        <table>
          {fixedCoin.length != 0 ? (
            <thead>
              <tr>
                <th rowspan="2">코인명</th>
                <th rowspan="2">현재가</th>
                <th colSpan="5" style={{ borderBottom: "1px solid" }}>
                  변동률
                </th>
                {/* <th rowspan="2">고가</th>
                <th rowspan="2">저가</th> */}
                <th rowspan="2">거래금액(24H)</th>
              </tr>
              <tr style={{ fontSize: "1.5rem" }}>
                <th>3분</th>
                <th>5분</th>
                <th>10분</th>
                <th>30분</th>
                <th>60분</th>
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>
            {fixedCoin.length != 0 ? (
              notes
                .filter(note => fixedCoin.includes(note.id))
                .map(note => {
                  const {
                    nameKor,
                    name,
                    lowPrice,
                    highPrice,
                    endPrice,
                    changeRate,
                    volume
                  } = note;
                  return (
                    <tr>
                      <td width="300">
                        <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                          <span onClick={() => onclick(name)}>
                            {nameKor}({name})
                          </span>
                        </Link>
                      </td>
                      <td width="150">
                        {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                      </td>
                      <td width="100">{showRate(changeRate[0])}</td>
                      <td width="100">{showRate(changeRate[1])}</td>
                      <td width="100">{showRate(changeRate[2])}</td>
                      <td width="100">{showRate(changeRate[4])}</td>
                      <td width="100">{showRate(changeRate[5])}</td>
                      {/* <td width="120" style={{ color: "#d60000" }}>
                        \ {Number(highPrice[0]).toLocaleString()}
                      </td>
                      <td width="120" style={{ color: "#0051c7" }}>
                        \ {Number(lowPrice[0]).toLocaleString()}
                      </td> */}
                      <td width="180">
                        \{" "}
                        {Number(volume[0] * endPrice[0]).toLocaleString(
                          undefined,
                          { maximumFractionDigits: 0 }
                        )}
                      </td>
                    </tr>
                  );
                })
            ) : (
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "38px",
                  color: "#808080"
                }}
              >
                관심 코인을 등록해주세요!
              </h2>
            )}
          </tbody>
        </table>
      </div>
    );
  
    return (
      <div className="FavCoinInfo">
        <div className="Table-title">
          <span>{title}</span>
        </div>
        {notes[notes.length - 1].openPrice[0] != null ? (
          board
        ) : (
          <div
            className="loading"
            style={{ minHeight: "100px", textAlign: "center" }}
          >
            <Loading />
          </div>
        )}
      </div>
    );
  }