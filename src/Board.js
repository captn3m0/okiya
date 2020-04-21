import React from 'react';
import './board.css'

class Board extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.events.endTurn();
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    // TODO: Improve
    if (this.props.G.cells[id] === 0 || this.props.G.cells[id] === 1) return false;
    return true;
  }

  render() {
    let winner = '';
    let lastPlayed = '';
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    if (this.props.G.lastPlayed) {
      lastPlayed = <div>
        <p>Last Played Tile: </p>
        <table>
        <tr>
          {Tile(this.props.G.lastPlayed)}
        </tr>
        </table>
        </div>
    }

    function Tile(val, interactive=false, id=null, ctx=null) {
      const suitLookup = function(val) {
        const SUITS = ['♠','♥','♦','♣'];
        let index = parseInt(val[1], 10) - 1;
        return SUITS[index];
      }
      let text = (val ===0 || val ===1)? "" : suitLookup(val)

      if(interactive) {
        return <td data-tile={val} data-suit={val[1]} key={id} onClick={() => ctx.onClick(id)}>
            {text}
          </td>
      }
      else {
        return <td data-tile={val} data-suit={val[1]}>
            {text}
          </td>
      }
    }


    let tbody = [];
    for (let i = 0; i < 4; i++) {
      let cells = [];
      for (let j = 0; j < 4; j++) {
        const id = 4 * i + j;
        cells.push(Tile(this.props.G.cells[id], true, id, this));
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
        {lastPlayed}
      </div>
    );
  }
}

export default Board;