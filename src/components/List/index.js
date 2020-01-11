import React from "react";
import "./index.css";
import ListItem from "../ListItem";

class List extends React.Component {
  render() {
    const {
      notes,
      activeId,
      fixedCoin,
      onListItemClick,
      onListItemFixedIconClick
    } = this.props;
    return (
      <div className="Coinlist">
        {notes.map(item => {
          const {
            id,
            name,
            nameKor,
            time,
            openPrice,
            endPrice,
            highPrice,
            lowPrice,
            changeRate,
            volume
          } = item;
          return (
            <ListItem
              key={id}
              id={id}
              time={time}
              active={id === activeId}
              name={name}
              nameKor={nameKor}
              openPrice={openPrice}
              endPrice={endPrice}
              highPrice={highPrice}
              lowPrice={lowPrice}
              changeRate={changeRate}
              volume={volume}
              fixedCoin={fixedCoin}
              onClick={() => onListItemClick(id)}
              onFixedIconClick={() => onListItemFixedIconClick(id)}
            />
          );
        })}
      </div>
    );
  }
}

export default List;
