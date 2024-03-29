import React, { Component } from 'react';
import './styles.css';
import Board from './Board';




const Player = {
    ONE: 1,
    TWO: 2,
};

const colors = [
    { code: '', name: 'Choose color' },
    { code: '#ff3333', name: 'Red' },
    { code: '#33cc33', name: 'Green' },
    { code: '#3333ff', name: 'Blue' },
    { code: '#ffff33', name: 'Yellow' },
    { code: '#ff33ff', name: 'Pink' },
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 6,
            cols: 7,
            board: null,
            currentPlayer: Player.ONE,
            winner: null,
            playerColors: { [Player.ONE]: '', [Player.TWO]: '' },
            colorsChosen: false,
            playerScores: { [Player.ONE]: 0, [Player.TWO]: 0 },
        };
    }

    initializeBoard = () => {
        const { rows, cols, playerColors } = this.state;
        if (playerColors[Player.ONE] !== '' && playerColors[Player.TWO] !== '') {
            const newRows = Math.max(rows, 4);
            const newCols = Math.max(cols, 4);
            const newBoard = Array.from({ length: newRows }, () => Array.from({ length: newCols }, () => null));
            this.setState({
                board: newBoard,
                currentPlayer: Player.ONE,
                winner: null,
                colorsChosen: true,
            });
        }
    };

    handleColumnClick = (col) => {
        const { board, winner, currentPlayer } = this.state;
        if (!board || winner || this.isColumnFull(col)) return;

        const updatedBoard = [...board];
        const row = this.getEmptyRow(col);

        updatedBoard[row][col] = currentPlayer;

        this.setState({ board: updatedBoard }, () => {
            if (this.checkForWin(row, col)) {
                this.setState({ winner: currentPlayer });
                this.updatePlayerScore();
            } else {
                this.setState({ currentPlayer: currentPlayer === Player.ONE ? Player.TWO : Player.ONE });
            }
        });
    };

    isColumnFull = (col) => {
        const { board } = this.state;
        return board[0][col] !== null;
    };

    getEmptyRow = (col) => {
        const { rows, board } = this.state;
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row][col] === null) {
                return row;
            }
        }
        return -1;
    };

    checkForWin = (row, col) => {
        const { rows, cols, board } = this.state;
        const player = board[row][col];


        let count = 1;
        for (let c = col + 1; c < cols; c++) {
            if (board[row][c] === player) {
                count++;
            } else {
                break;
            }
        }
        for (let c = col - 1; c >= 0; c--) {
            if (board[row][c] === player) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) return true;


        count = 1;
        for (let r = row + 1; r < rows; r++) {
            if (board[r][col] === player) {
                count++;
            } else {
                break;
            }
        }
        for (let r = row - 1; r >= 0; r--) {
            if (board[r][col] === player) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) return true;


        count = 1;
        for (let r = row - 1, c = col + 1; r >= 0 && c < cols; r--, c++) {
            if (board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }
        for (let r = row + 1, c = col - 1; r < rows && c >= 0; r++, c--) {
            if (board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) return true;


        count = 1;
        for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
            if (board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }
        for (let r = row + 1, c = col + 1; r < rows && c < cols; r++, c++) {
            if (board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }
        return count >= 4;


    };


    handleRowsChange = (e) => {
        const newRows = parseInt(e.target.value);
        if (!isNaN(newRows)) {
            this.setState({ rows: newRows });
        }
    };

    handleColsChange = (e) => {
        const newCols = parseInt(e.target.value);
        if (!isNaN(newCols)) {
            this.setState({ cols: newCols });
        }
    };

    handleColorChange = (player, color) => {
        const { playerColors } = this.state;
        if (player === Player.ONE) {
            if (color !== playerColors[Player.TWO]) {
                this.setState((prevState) => ({
                    playerColors: {
                        ...prevState.playerColors,
                        [player]: color,
                    },
                }));
            }
        } else {
            if (color !== playerColors[Player.ONE]) {
                this.setState((prevState) => ({
                    playerColors: {
                        ...prevState.playerColors,
                        [player]: color,
                    },
                }));
            }
        }
    };

    handleRestart = () => {
        this.setState({ board: null, colorsChosen: false });
    };

    updatePlayerScore = () => {
        const { playerScores } = this.state;
        const player1Score = playerScores[Player.ONE] + this.countPlayerTokens(Player.ONE);
        const player2Score = playerScores[Player.TWO] + this.countPlayerTokens(Player.TWO);

        this.setState((prevState) => ({
            playerScores: {
                ...prevState.playerScores,
                [Player.ONE]: player1Score,
                [Player.TWO]: player2Score,
            },
        }));
    };

    countPlayerTokens = (player) => {
        const { board } = this.state;
        let count = 0;
        board.forEach((row) => {
            row.forEach((cell) => {
                if (cell === player) {
                    count++;
                }
            });
        });
        return count;
    };




    render() {
        const { rows, cols, board, currentPlayer, winner, playerColors, colorsChosen, playerScores } = this.state;
        return (
            <div className="App">


                <h1>Connect4</h1>
                {!board && <div className="Menu">
                    <div>
                        Rows:
                        <input type="number" min="4" value={rows} onChange={this.handleRowsChange}/>
                    </div>
                    <div>
                        Columns:
                        <input type="number" min="4" value={cols} onChange={this.handleColsChange}/>
                    </div>

                    {Object.keys(Player).map((player) => (
                        <div key={player}>
                            Player {Player[player]} Color:
                            <select
                                value={playerColors[Player[player]]}
                                onChange={(e) => this.handleColorChange(Player[player], e.target.value)}
                            >
                                {colors.map((color) => (
                                    <option key={color.code} value={color.code}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button onClick={this.initializeBoard} disabled={this.state.colorsChosen}>
                        Start Game
                    </button>
                </div>}
                <div>
                    {board &&(
                        <div>
                            <button onClick={this.handleRestart}>New Game</button>
                        </div>
                    )
                    }

                    {board && (
                        <Board
                            board={board}
                            playerColors={playerColors}
                            handleColumnClick={this.handleColumnClick}
                        />
                )}
                </div>
                <div>
                    {winner && (
                        <div className="message">
                            <p>Player {winner} wins!</p>
                            <button onClick={this.handleRestart}>New Game</button>
                        </div>

                    )}

                    {board && (
                        <div className={"statistics"}>Game Statistics:
                            {Object.keys(Player).map((player) => (
                                <div key={player}>
                                    Player {Player[player]} Score: {playerScores[Player[player]]}
                                </div>
                            ))}
                        </div>
                    )
                    }

                </div>
                    </div>
);
    }
}

export default App;
