import { Client } from 'boardgame.io/client';
import { Okiya } from './Game';

function Tile(val, id=null, ctx=null) {
  const suitLookup = function(val) {
    const SUITS = ['♠','♥','♦','♣'];
    let index = parseInt(val[1], 10) - 1;
    return SUITS[index];
  }
  let text = (val ===0 || val ===1)? "" : suitLookup(val);

  return `<td class=cell data-tile=${val} data-suit=${val[1]} key=${id} >${text}</td>`
}


class OkiyaClient {
  constructor(rootElement) {
    this.client = Client({ game: Okiya });
    this.client.start();
    this.rootElement = rootElement;
    this.client.subscribe(state => this.update(state));
    this.createBoard();
    this.attachListeners();
  }


  createBoard() {
    this.rootElement.innerHTML = `
      <table id=board></table>
      <p class="winner"></p>
      <div class="lastplayed"></div>`;
  }

  update(state) {

    let tbody = [];
    for (let i = 0; i < 4; i++) {
      let cells = [];
      for (let j = 0; j < 4; j++) {
        const id = 4 * i + j;
        cells.push(Tile(state.G.cells[id], id, this));
      }
      tbody.push(`<tr key=${i}>${cells}</tr>`);
    }

    let lastPlayed = "";

    if (state.G.lastPlayed)
      lastPlayed = `<div>
        <p>Last Played Tile: </p>
        <table class="board">
        <tr>
          ${Tile(state.G.lastPlayed)}
        </tr>
        </table>
        </div>`;

    this.rootElement.innerHTML = `
      <table class=board>${tbody.join("\n")}</table>
      <p class="winner"></p>
      ${lastPlayed}`;
    
  }


  attachListeners() {
    // This event handler will read the cell id from a cell’s
    // `data-id` attribute and make the `clickCell` move.
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