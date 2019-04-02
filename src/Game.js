import {
  findHeightWidth,
  generateInitialWorld,
  generateRelativeWorld,
  updateGrid,
  makePositionRelative
} from "./lib";

class Game {
  constructor() {
    this.input = {
      size: [9, 9],
      bounds: { topLeft: 0, bottomRight: 8 }
    };
    this.aliveCells = [];
  }

  initCells(height, width) {
    let cells = new Array(height).fill(width);
    return cells.map(x => new Array(x).fill(0));
  }

  nextGeneration(currGeneration, bounds) {
    let { height, width } = findHeightWidth(bounds);
    let grid = this.initCells(height, width);
    let relativeWorld = generateRelativeWorld(grid, currGeneration, bounds);
    let updatedWorld = updateGrid(relativeWorld);
    let aliveCells = [];
    let relativeTopLeft = bounds.topLeft.map(x => -x);
    for (let i in updatedWorld) {
      for (let j in updatedWorld[i]) {
        if (updatedWorld[i][j] === 1) {
          aliveCells.push([+i, +j]);
        }
      }
    }
    return aliveCells.map(makePositionRelative.bind(null, relativeTopLeft));
  }

  startGame() {
    let height = +this.input.size[0];
    let width = +this.input.size[1] || height;
    let world = this.initCells(height, width);
    this.aliveCells = this.nextGeneration(this.aliveCells, {
      topLeft: [0, 0],
      bottomRight: [height - 1, width - 1]
    });
    let nextGen = generateInitialWorld(world, this.aliveCells);
    return nextGen;
  }

  addAliveCell(cell) {
    this.aliveCells.push(cell);
  }
}

export default Game;
