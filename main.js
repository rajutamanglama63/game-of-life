const width = 25;
const height = 20;

// Create Game of Life instance
const gol = new GameOfLife(width, height);

// Create Table
const table = document.createElement("tbody");
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    td.dataset.row = h;
    td.dataset.col = w;
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

const paint = () => {
  for (let i = 0; i < gol.height; i++) {
    for (let j = 0; j < gol.width; j++) {
      let currentRow = document.querySelectorAll(`[data-row = '${i}']`);
      if (gol.board[i][j] === 1) {
        currentRow[j].classList.add("alive");
      } else {
        currentRow[j].classList.remove("alive");
      }
    }
  }
};

// Add event Listeners
document.getElementById("board").addEventListener("click", (event) => {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;
  gol.board[row][col] = 1;
  paint();
});

document.getElementById("step_btn").addEventListener("click", () => {
  gol.tick();
  paint();
});

let clicked = false;
let interval;
document.getElementById("play_btn").addEventListener("click", () => {
  if (!clicked) {
    document.querySelector("#play_btn").innerHTML = "stop";
    clicked = true;

    interval = setInterval(() => {
      gol.tick();
      paint();
    }, 100);
  } else {
    clicked = false;
    document.querySelector("#play_btn").innerHTML = "play";
    clearInterval(interval);
  }
});

document.getElementById("random_btn").addEventListener("click", () => {
  for (let i = 0; i < gol.board.length; i++) {
    for (let j = 0; j < gol.board[i].length; j++) {
      gol.setCell(Math.round(Math.random()), i, j);
    }
  }
  paint();
});

document.getElementById("clear_btn").addEventListener("click", () => {
  gol.board = gol.makeBoard();
  paint();
});
