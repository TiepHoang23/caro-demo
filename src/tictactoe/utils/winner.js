import config from './config';

// Duyệt các ô theo các hướng phải, dưới, phải dưới, trái dưới (các hướng đối xứng nên chỉ cần duyệt 1 hướng)
// |---|---|---|---|---|   R:Right
// |---|---|---|---|---|   D:Down
// |---|---|-X-|-R-|---|   RD:RightDown
// |---|-LD|-D-|-RD|---|   LD:LeftDown
// |---|---|---|---|---|
// Right (cộng cột), Down (cộng dòng), DownRight(cộng luôn dòng cột), LeftRight(trừ dòng cột)
// Duyệt 5 lần liên tục giống nhau thì win
export function calculateWinner(squares) {
  let winner;
  let countNull = 0;
  const row = squares.length;
  const col = squares[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (!squares[i][j]) continue; // bỏ qua các ô trống
      if (j <= col - config.winnerSquare) {
        // chỉ duyệt tới cột thứ n-5
        winner = true;
        for (let k = 0; k < config.winnerSquare - 1; k++) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            winner = false;
          }
        }
        if (winner)
          return { whoWin: squares[i][j], x: j, y: i, direction: 'right' };
      }
      if (i <= row - config.winnerSquare) {
        // chỉ duyệt tới dòng thứ n-5
        winner = true;
        for (let k = 0; k < config.winnerSquare - 1; k++) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            winner = false;
          }
        }
        if (winner)
          return { whoWin: squares[i][j], x: j, y: i, direction: 'down' };
      }
      if (j <= col - config.winnerSquare && i <= row - config.winnerSquare) {
        //chỉ duyệt tới cột thứ n-5 và dòng n-5
        winner = true;
        for (let k = 0; k < config.winnerSquare - 1; k++) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            winner = false;
          }
        }
        if (winner)
          return { whoWin: squares[i][j], x: j, y: i, direction: 'downRight' };
      }
      if (i <= row - config.winnerSquare && j >= config.winnerSquare - 1) {
        //chỉ duyệt tới dòng thứ n-5 và cột n-5
        winner = true;
        for (let k = 0; k < config.winnerSquare - 1; k++) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            winner = false;
          }
        }
        if (winner)
          return { whoWin: squares[i][j], x: j, y: i, direction: 'downLeft' };
      }
      countNull++;
    }
  }

  if (countNull === row * col) {
    return { whoWin: 'Draw' };
  } // Hết các ô trống thì hòa

  return null;
}
