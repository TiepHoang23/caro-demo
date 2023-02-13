import React, { Component } from 'react';
import Square from './Square';
import Row from './Row'
class Board extends Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    render() {
      const board = this.props.squares.map((value, index) => {
        return (
          <Row winner={this.props.winner} rowIdx={index} row={value} onClick={this.props.onClick} key={index}/>
        )
      })
      return (
        <div>
          {board}
        </div>
      );
    }
  }
  export default Board;