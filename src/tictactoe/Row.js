import React, { Component } from 'react';
import Square from './Square';
import config from './utils/config';

class Row extends Component {
  render() {
    let row = this.props.row.map((square, index) => {
      const { winner, rowIdx } = this.props;
      let isWinner = false;
      if (winner) {
        if (
          winner.direction === 'right' &&
          index >= winner.x &&
          index <= winner.x + config.winnerSquare - 1 &&
          rowIdx === winner.y
        ) {
          isWinner = true;
        }
        if (
          winner.direction === 'down' &&
          rowIdx >= winner.y &&
          rowIdx <= winner.y + config.winnerSquare - 1 &&
          index === winner.x
        ) {
          isWinner = true;
        }
        if (
          winner.direction === 'downRight' &&
          index >= winner.x &&
          index <= winner.x + config.winnerSquare - 1 &&
          index - winner.x === rowIdx - winner.y
        ) {
          isWinner = true;
        }
        if (
          winner.direction === 'downLeft' &&
          index <= winner.x &&
          index >= winner.x - config.winnerSquare + 1 &&
          winner.x - index === rowIdx - winner.y
        ) {
          isWinner = true;
        }
      }
      return (
        <Square
          isWinner={isWinner}
          value={square}
          onClick={() => this.props.onClick(this.props.rowIdx, index)}
          key={index}
        />
      );
    });
    return <div className='board-row'>{row}</div>;
  }
}
export default Row;
