import React, {useState, useEffect} from 'react';
import './index.css';

import { Link } from "react-router-dom";
import { showPrice } from  "../../../utils/common"
import { ClipLoader } from "react-spinners";

export default function VolumeTable({ title, notes, onclick }) {
    const board = (
      <div className="Info-board">
        <table>
          <thead>
            <tr>
              {/* <th>순위</th> */}
              <th>코인명</th>
              <th>현재가</th>
              <th>거래금액</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(hotCoin => {
            const { nameKor, name, endPrice, volume } = hotCoin;
            const volume10m = Number(
                (volume[0] - volume[9]) * endPrice[0]
              ).toLocaleString(undefined, { maximumFractionDigits: 0 });
            const isVolumeUpper1M = Number((volume[0] - volume[9]) * endPrice[0]) > 1000000000;
              return (
                <tr>
                  {/* <td width="50">{i + 1}</td> */}
  
                  <td width="260">
                    <Link style={{ color: "#000000" }} to={"/quote/" + name}>
                      <span onClick={() => onclick(name)}>
                        {nameKor}({name})
                      </span>
                    </Link>
                  </td>
                  <td width="140">
                    {showPrice(Number(endPrice[0]), Number(endPrice[2]))}
                  </td>
                  <td width="190">
                    <span className={isVolumeUpper1M ? "higher" : ""}>\{" "}{volume10m}</span>
                  </td>
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
            <ClipLoader
              css={{
                marginTop: "75px"
              }}
              size={60}
              color={"#123abc"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }