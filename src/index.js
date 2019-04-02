import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from "./board"
import Game from "./Game"

const game = new Game();

ReactDOM.render(<Board size={[9,9]} game={game}/>, document.getElementById('root'));
