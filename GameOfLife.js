class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  makeBoard() {
    // Generate multi-dimensional array:
    let board = []
    for(let i = 0; i < this.height; i++) {
      board.push([])     
      for(let j = 0; j < this.width; j++) {
        board[i].push(0)
      }        
    }
    return board
  }

  cellExists(row, col) {
    return row >= 0 && row < this.height && col >= 0 && col < this.width;
  }

  getCell(row, col) {
    if (this.cellExists(row, col)) {
      return this.board[row][col];
    } else {
      return 0;
    }
  }

  setCell(value, row, col) {
    if (this.cellExists(row, col)) {
      this.board[row][col] = value;
    }
  }

  livingNeighbors(row, col) {
    return (
      // Row Above
      this.getCell(row - 1, col - 1) +
      this.getCell(row - 1, col) +
      this.getCell(row - 1, col + 1) +
      // Directly to left and right
      this.getCell(row, col - 1) +
      this.getCell(row, col + 1) +
      // Row Below
      this.getCell(row + 1, col - 1) +
      this.getCell(row + 1, col) +
      this.getCell(row + 1, col + 1)
    );
  }

  conwayRule(cell, livingNeighbors) {
    let isAlive = cell === 1;
    if (isAlive) {
      if (livingNeighbors === 2 || livingNeighbors === 3) {
        return 1;
      } else {
        return 0;
      }
    } else if (livingNeighbors === 3) {
      return 1;
    } else {
      return 0;
    }
  }

  tick() {
    const newBoard = this.makeBoard();

    // this.forEachCell((row, col) => {
    //   const livingNeighbors = this.livingNeighbors(row, col);
    //   const nextCell = this.conwayRule(this.getCell(row, col), livingNeighbors);
    //   newBoard[row][col] = nextCell;
    // });

    for(let i = 0; i < this.height; i++){
      for(let j = 0; j < this.width; j++) {
        const livingNeighbors = this.livingNeighbors(i, j);
        const nextCell = this.conwayRule(this.getCell(i, j), livingNeighbors);
        newBoard[i][j] = nextCell;
      }
    }

    this.board = newBoard;
  }
}


// const gol = new GameOfLife(5, 5)
// gol.setCell(1, 1, 2)
// gol.setCell(1, 2, 2)
// gol.setCell(1, 3, 2)
// console.log(gol.board)
// gol.tick()
// console.log(gol.board)
