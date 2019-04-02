import React from "react";
import Square from "./square";

const createBoard = function(size) {
  return new Array(+size[0]).fill(" ").map(x => new Array(+size[1]).fill(" "));
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: createBoard(this.props.size) };
    this.handleClick = this.handleClick.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.game = this.props.game;
  }

  start() {
    this.interval = setInterval(() => {
      let newBoard = this.game.startGame();
      this.setState({ board: newBoard });
    }, 500);
  }

  pause(){
    clearInterval(this.interval);
  }

  handleClick(id) {
    this.game.addAliveCell(id.split(""));
    this.setState(state=>{
      state.board[id[0]][id[1]] = 1;
    })
    this.setState(this.state.board);
  }

  render() {
    const board = this.state.board.map((row, index) => {
      const worldRow = row.map((value, id) => {
        return (
          <Square
            value={value}
            onClick={this.handleClick.bind(null, "" + index + id)}
            key={"" + index + id}
          />
        );
      });
      return <tr key={"a"+index}>{worldRow}</tr>;
    });
    return (
      <div>
        <table><tbody>{board}</tbody></table>
        <div>
          <button onClick={this.start}>Start</button>
        </div>
        <div>
          <button onClick={this.pause}>pause</button>
        </div>
      </div>
    );
  }
}

export default Board;
