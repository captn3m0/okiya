import { Client } from 'boardgame.io/client';
import { Okiya } from './Game';

function Tile(val, id=null, ctx=null) {
  const suitLookup = function(val) {
    const SUITS = ['♠','♥','♦','♣'];
    let index = parseInt(val[1], 10) - 1;
    return SUITS[index];
  }
  let text = (val ==="0" || val ==="1")? "" : suitLookup(val);

  return `<td class=cell data-tile=${val} data-suit=${val[1]} data-id=${id} key=${id} >${text}</td>`
}


class OkiyaClient {
  constructor(rootElement) {
    this.client = Client({ game: Okiya, numPlayers: 2, });
    this.client.start();
    this.rootElement = rootElement;

    this.client.subscribe(state => {
      this.update(state)
      this.attachListeners();
    });
  }

  update(state) {
    let tbody = [];
    for (let i = 0; i < 4; i++) {
      let cells = [];
      for (let j = 0; j < 4; j++) {
        const id = 4 * i + j;
        cells.push(Tile(state.G.cells[id], id, this));
      }
      tbody.push(`<tr key=${i}>${cells.join("\n")}</tr>`);
    }

    let lastPlayed = "", winner = "", html = `
      <table class=board>${tbody.join("\n")}</table>
      <p class="winner"></p>`;

    if (state.G.lastPlayed && state.ctx.gameover === undefined) {
      html += `<div>
        <p>Last Played Tile: </p>
        <table class="board">
        <tr>
          ${Tile(state.G.lastPlayed)}
        </tr>
        </table>
        </div>`;
    }

    if (state.ctx.gameover) {
      if (state.ctx.gameover.draw) {
        html += `div id="winner">Draw!</div>`;
      } else {
        html += `<div id="winner">Winner: ${state.ctx.gameover.winner === "0" ? "Red" : "Black"}`;
        if (state.ctx.gameover.stalemate) {
          html += "<span> by stalemate</span>";
        }
      }
    }

    this.rootElement.innerHTML = html;
  }


  attachListeners() {
    const handleCellClick = event => {
      const id = parseInt(event.target.dataset.id);
      this.client.moves.clickCell(id);
    };

    // Attach the event listener to each of the board cells.
    const cells = this.rootElement.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.onclick = handleCellClick;
    });
  }
}

const appElement = document.getElementById('app');
const app = new OkiyaClient(appElement);