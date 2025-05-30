import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import {useState} from 'react';
function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true); //stan przechowujący informację, czy to "X" jest następne
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    //jeśli pole ma zawartość to nie reagujemy na kliknięcie
    if(squares[i] != null || checkWinner(squares) != null) return; //jeśli pole jest już zajęte lub ktoś już wygrał
    //to bedzie nasza funkcja reagująca na kliknięcie pola
    const nextSquares = squares.slice();//tworzymy kopię tablicy squares
    if(xIsNext)
      nextSquares[i] = "X"; //ustawiamy wybrany element na "X"
    else
      nextSquares[i] = "O"; //ustawiamy wybrany element na "O"
    setSquares(nextSquares); //uaktualniamy stan komponentu
    setXIsNext(!xIsNext); //przełączamy stan xIsNext z kółka na krzyżyk lub odwrotnie
  }
  function checkWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // wiersze
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolumny
      [0, 4, 8], [2, 4, 6] // przekątne
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // zwraca "X" lub "O" jeśli jest zwycięzca
      }
    }
    return null; // brak zwycięzcy
  }
  //przechowuje informacje o zwyciezcy lub null jeśli jeszcze trwa gra
  const winner = checkWinner(squares);
  let status;
  if (winner) {
    status = `Zwycięzca: ${winner}`;
  } else {
    status = `Następny gracz: ${xIsNext ? 'X' : 'O'}`;
  }
  return <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
  </>;
}
