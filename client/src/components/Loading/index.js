import React from 'react';
import { ClipLoader } from "react-spinners";

export default function Loading () {
    return(
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
    )
}