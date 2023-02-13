import React, { Component } from 'react';
import Board from "./Board"
import {calculateWinner} from './utils/winner'
import './utils/css/style.css';
import config from './utils/config';
import {generateTwoDArray} from './utils/helper'
class Game extends Component {
    constructor(props) {
      super(props);
      let twoDSquare = generateTwoDArray(config.defaultRow,config.defaultCol)
      this.state = {
        inputRow: config.defaultRow,
        inputCol: config.defaultCol,
        row: config.defaultRow,
        column:config.defaultCol,
        history: [{
          squares: twoDSquare,
          location: null,
        }],
        stepNumber: 0,
        xIsNext: true,
        isDescending: true,
      };
      this.changeCol = this.changeCol.bind(this);
      this.changeRow = this.changeRow.bind(this);
      this.sort = this.sort.bind(this);
    }
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }
    handleClick(xCurrent, yCurrent) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[this.state.stepNumber];
      const squares = current.squares.slice();
      current.squares.map((value, index) => {
        squares[index] = current.squares[index].slice();
        return true;
      })
      if (calculateWinner(squares) || squares[xCurrent][yCurrent]) {
        return;
      }// Nếu đã thắng hoặc ô đã đi rồi thì nếu đã đi rồi thì next
      squares[xCurrent][yCurrent] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          location: {x: xCurrent, y: yCurrent}
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
    sort() {
      this.setState({isDescending: !this.state.isDescending});
    }
    changeCol(input) {
      const col = Number(input.target.value);
      this.setState({inputCol: col});
      if (col >= config.minSize && col <= config.maxSize) {

        const newSquare = generateTwoDArray(this.state.column,col)
        this.setState({
          column:col,
          history: [{
            squares: newSquare,
            location: null,
          }],
          stepNumber: 0,
          xIsNext: true,
        });
      }
    }
    changeRow(input) {
      const row = Number(input.target.value);
      this.setState({inputRow: row});
      if (row >= config.minSize && row <= config.maxSize) {
        const newSquare = generateTwoDArray(row,this.state.row)
  
        this.setState({
          row: row,
          history: [{
            squares: newSquare,
            location: null,
          }],
          stepNumber: 0,
          xIsNext: true,
        });
      }
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      let moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move + ' (' + step.location.x + ',' + step.location.y + ')' :
          'Go to game start';
        return (this.state.stepNumber === move) ? (
          <div key={move}>
            <button className="btn-bold" onClick={() => this.jumpTo(move)}>{desc}</button>
          </div>
        ) : (
          <div key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </div>
        );
      });
      if (!this.state.isDescending) {
        moves = moves.reverse();
      }
  
      let status;
      if (winner) {
        status = 'Winner: ' + winner.whoWin;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      let sort = this.state.isDescending ? 'desc' : 'incre'
      return (
        <div className="container">
          <div className="game-menu">
            <h1>Game Caro</h1>
            <h3>Change Board</h3>
            <div className='change-board'>

                <label className="input-size">Row</label><input type="number" min="5" max="30" placeholder="Row" value={this.state.inputRow} onChange={this.changeRow} />
                <br />
                <label className="input-size">Col</label><input type="number" min="5" max="30"  placeholder="Col" value={this.state.inputCol} onChange={this.changeCol} />
            </div>
            <h3>Game Info</h3>
            <div className="game-info">
         
              <div>
                <button className="btn-sort" onClick={this.sort}>Sort {sort}</button>
              </div>
              <div>{moves}</div>
            </div>
          </div>
          <div className="game">
            <div className='board-play'>
              <div className="game-board">
                <Board
                  squares={current.squares} 
                  onClick={(i, j) => this.handleClick(i, j)}
                  winner={winner}
                />
              </div>
              <div>{status}</div>
          </div>
          </div>
        </div>
      );
    }
  }
  export default Game