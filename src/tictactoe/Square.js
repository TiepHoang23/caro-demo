import React from 'react';
export default function Square({isWinner,value,onClick}) {
    return (isWinner) ? (
      <div className="square square-winner" onClick={onClick}>
        {value}
      </div>
    ) : (value==='X')?(
      <div className="square x-play" onClick={onClick}>
        {value}
      </div>  
    ): (
      <div className="square o-play" onClick={onClick}>
        {value}
      </div>  
    ) ;
  }