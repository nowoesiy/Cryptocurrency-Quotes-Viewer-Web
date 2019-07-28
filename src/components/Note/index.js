import React from 'react';
import './index.css';

class Note extends React.Component {

  getUrl(coin) {
    return `https://m.bithumb.com/trade/chart/${coin}`
  }
  render() {
    const { note, onEditNote } = this.props;
    const { title, contents } = note;
    return (
      <div className="note">
        <input
          className="title"
          value={title}
          onChange={(e) => onEditNote('title', e)}
        />
        <a href= {this.getUrl(title)}>{title}</a>
        <textarea
          className="note-contents"
          value={contents}
          onChange={(e) => onEditNote('contents', e)}
        />
      </div>
    );
  }
}

export default Note;