import { INVALID_MOVE } from 'boardgame.io/core';

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    // Rows
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],

    // Columns
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],

    // Squares
    [0, 1, 4, 5],
    [1, 2, 5, 6],
    [2, 3, 6, 7],

    [4, 5, 8, 9],
    [5, 6, 9, 10],
    [6, 7, 10, 11],

    [8, 9, 12, 13],
    [9, 10, 13, 14],
    [10, 11, 14, 15],
  ];

  const isRowComplete = (row) => {
    const symbols = row.map((i) => cells[i]);
    return symbols.every((i) => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some((i) => i === true);
}

const UnshuffledDeck = [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
  "C1",
  "C2",
  "C3",
  "C4",
  "D1",
  "D2",
  "D3",
  "D4",
];

function validMove(cell, id, tile) {
  const borders = [
    0,1,2,3,4,7,8,11,12,13,14,15
  ];
  // If first move, only allow borders
  if (tile === null) {
    return borders.includes(id)
  }
  // else match against the last played tile
  return (cell[0] === tile[0] || cell[1] === tile[1]);
}

function unclaimed(tile) {
  return !(tile==="0"||tile==="1");
}
const Okiya = {
  turn: {
    moveLimit: 1,
  },
  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 16; i++) {
        if (unclaimed(G.cells[i]) && validMove(G.cells[i], i, G.lastPlayed)) {
          moves.push({ move: "clickCell", args: [i] });
        }
      }
      return moves;
    },
  },
  setup: (ctx) => ({
    cells: ctx.random.Shuffle(UnshuffledDeck),
    lastPlayed: null,
  }),

  moves: {
    clickCell: (G, ctx, id) => {
      if (unclaimed(G.cells[id]) && validMove(G.cells[id], id, G.lastPlayed)) {
        G.lastPlayed = G.cells[id];
        G.cells[id] = parseInt(ctx.currentPlayer, 10);
      }
      else {
        return INVALID_MOVE;
      }
    },
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    // if (IsDraw(G.cells)) {
    //   return { draw: true };
    // }
  },
};

export default Okiya;