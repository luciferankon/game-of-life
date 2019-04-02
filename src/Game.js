class Game {
  constructor() {
    this.input = {
      size: [9, 9],
      bounds: { topLeft: 0, bottomRight: 8 },
    };
    this.aliveCells = [];
  }

  startGame() {
    let height = +this.input.size[0];
    let width = +this.input.size[1] || height;
    let world = initCells(height, width);

    this.aliveCells = nextGeneration(this.aliveCells, {
      topLeft: [0, 0],
      bottomRight: [height - 1, width - 1]
    });
    let nextGen = generateInitialWorld(world, this.aliveCells);
    return nextGen;
  }

  addAliveCell(cell){
    this.aliveCells.push(cell);
  }
}

const ALIVE = 1;
const DEAD = 0;

const initCells = function(height, width) {
  let cells = new Array(height).fill(width);
  return cells.map(x => new Array(x).fill(0));
};

const updateCellWithInput = function(cells, element) {
  cells[element[0]][element[1]] = 1;
  return cells;
};

const generateInitialWorld = function(cells, inputs) {
  inputs.reduce(updateCellWithInput, cells);
  return cells;
};

const possibleCombinations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

const generateAddCoordinates = function(currentPosition) {
  return function(delta) {
    let rowIndex = currentPosition[0] + delta[0];
    let columnIndex = currentPosition[1] + delta[1];
    return [rowIndex, columnIndex];
  };
};

const checkValidPosition = function(grid) {
  return function(position) {
    let topLeft = [0, 0];
    let bottomRight = [grid.length - 1, grid[0].length - 1];
    return isWithin(topLeft, bottomRight, position);
  };
};

const generateValidNeighbours = function(grid, currPosition) {
  let possibleNeighbours = possibleCombinations.map(
    generateAddCoordinates(currPosition)
  );
  return possibleNeighbours.filter(checkValidPosition(grid));
};

const checkState = function(grid) {
  return function(neighbour, position) {
    let state = grid[position[0]][position[1]];
    neighbour[state].push(position);
    return neighbour;
  };
};

const checkNeighbourState = function(grid, position) {
  let validNeighbours = generateValidNeighbours(grid, position);
  return validNeighbours.reduce(checkState(grid), { [ALIVE]: [], [DEAD]: [] });
};

const checkNextState = function(neighbours, currentState) {
  let aliveNeighbours = neighbours[ALIVE].length;
  let cellRules = [0, 0, currentState, 1, 0, 0, 0, 0, 0];
  return cellRules[aliveNeighbours];
};

const updateGrid = function(oldGrid) {
  let grid = oldGrid.map(x => x.slice());
  for (let r = 0; r < oldGrid.length; r++) {
    for (let c = 0; c < oldGrid[r].length; c++) {
      let neighbours = checkNeighbourState(oldGrid, [r, c]);
      let nextState = checkNextState(neighbours, oldGrid[r][c]);
      grid[r][c] = nextState;
    }
  }
  return grid;
};

const generateRelativeWorld = function(grid, currGeneration, bounds) {
  currGeneration = findPointInsideBoard(currGeneration, bounds);
  currGeneration = findRelativeWorld(currGeneration, bounds);
  let world = generateInitialWorld(grid, currGeneration);
  return world;
};

const nextGeneration = function(currGeneration, bounds) {
  let { height, width } = findHeightWidth(bounds);
  let grid = initCells(height, width);
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
};

const isWithin = function(topLeft, bottomRight, position) {
  return (
    isGreaterOrEqual(position[0], topLeft[0]) &&
    isGreaterOrEqual(bottomRight[0], position[0]) &&
    isGreaterOrEqual(position[1], topLeft[1]) &&
    isGreaterOrEqual(bottomRight[1], position[1])
  );
};

const isGreaterOrEqual = function(element1, element2) {
  return element1 >= element2;
};

const findRelativeWorld = function(currGeneration, bounds) {
  let makePositionRelativeWith = makePositionRelative.bind(
    null,
    bounds.topLeft
  );
  return currGeneration.map(makePositionRelativeWith);
};

const findPointInsideBoard = function(currGeneration, bounds) {
  let isWithinBound = isWithin.bind(null, bounds.topLeft, bounds.bottomRight);
  return currGeneration.filter(isWithinBound);
};

const makePositionRelative = function(topLeft, position) {
  return [position[0] - topLeft[0], position[1] - topLeft[1]];
};

const findHeightWidth = function(bounds) {
  let height = bounds.bottomRight[0] - bounds.topLeft[0] + 1;
  let width = bounds.bottomRight[1] - bounds.topLeft[1] + 1;
  return { height: height, width: width };
};

export default Game;
