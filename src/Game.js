import { INVALID_MOVE } from "boardgame.io/core";

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

const BORDER_TILE_IDS = [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15];

// cell is a string identifier from the Deck identifying the Tile (A1-D4)
// id is the index of the cell in the cells array
function validMove(cell, id, lastPlayedTile) {
  // If first move, only allow borders
  if (lastPlayedTile === null) {
    return BORDER_TILE_IDS.includes(id);
  }
  // else match against the last played tile
  return cell[0] === lastPlayedTile[0] || cell[1] === lastPlayedTile[1];
}

// Claimed tiles are set to 0 or 1
function unclaimed(tile) {
  return !(tile === 0 || tile === 1);
}

export const Okiya = {
  minPlayers: 2,
  maxPlayers: 2,
  turn: {
    minMoves: 1,
    maxMoves: 1
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
  setup: ({ctx, random}) => ({
    cells: random.Shuffle(UnshuffledDeck),
    lastPlayed: null,
  }),

  moves: {
    clickCell({ G, playerID }, id) {
      if (unclaimed(G.cells[id]) && validMove(G.cells[id], id, G.lastPlayed)) {
        G.lastPlayed = G.cells[id];
        G.cells[id] = playerID;
      } else {
        return INVALID_MOVE;
      }
    },
  },

  endIf: ({G, ctx}) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer, stalemate: false, draw: false };
    }

    if (G.cells.filter(unclaimed).length === 0) {
      return { draw: true };
    }

    let numMoves = Okiya.ai.enumerate(G, ctx).length;

    if (numMoves === 0) {
      return {
        winner: ctx.currentPlayer,
        stalemate: true,
      };
    }
  },
};
