import React from "react";
import {useState} from 'react';

function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setsquares] = useState(Array(9).fill(null));
    const [count, setCount] = useState(0);

    function handleClick(i) {
        setCount(count + 1);
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setsquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const winner = calculateWinner(squares);
    let status;

    if (winner) {
        status = 'Winner: ' + winner;
    }
    else if (count === 9) {
            status = 'Draw';
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    function generateRow(rowNo){
        const arr = [];
        for(let i= (rowNo-1)*3; i<(rowNo*3); i++)
            arr.push(<Square value={squares[i]} onSquareClick={() => handleClick(i)}/>);
        return arr;

    }


    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                {generateRow(1)}
            </div>
            <div className="board-row">
                {generateRow(2)}
            </div>
            <div className="board-row">
                {generateRow(3)}
            </div>

        </>);
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a];
    }
    return null;
}
