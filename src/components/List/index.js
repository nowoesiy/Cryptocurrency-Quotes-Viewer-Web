import React from 'react';
import './index.css';
import ListItem from '../ListItem';


class List extends React.Component {
  render() {
    const { notes, activeId, onListItemClick } = this.props;
    return (
      <div className="list">
        {notes.map((item) => {
          const { id, title, time, openPrice, endPrice ,highPrice,lowPrice, changeRate} = item;
          return (
            <ListItem
              key={id}
              id={id}
              time={time}
              active={id === activeId}
              title={title}
              openPrice={openPrice}
              endPrice={endPrice}
              highPrice={highPrice}
              lowPrice={lowPrice}
              changeRate={changeRate}
              onClick={() => onListItemClick(id)}
            />
          );
        })}
      </div>
    );
  }
}

export default List;