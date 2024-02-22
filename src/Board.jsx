import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
    render() {

        const { board, playerColors, handleColumnClick } = this.props;
        return (



            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={colIndex}
                                cellValue={cell}
                                playerColors={playerColors}
                                onClick={() => handleColumnClick(colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default Board;
