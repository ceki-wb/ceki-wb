var playerList = [];
let data = JSON.parse(localStorage.getItem('data')) || []
data = data.map(({id, time, winner, loser }) => [id, time, loser, winner]).reverse()
const table = document.getElementById('table')
const contents = (row) => row.map((item, index) => `<td>${item}</td>`).join('')
table.innerHTML = [
  `<thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tanggal</th>
          <th scope="col">Pak RT</th>
          <th scope="col">Pemenang</th>
          <th scope="col"></th>
        </tr>
      </thead>`,
  ...data.map(row => `<tr>
      ${contents(row)}
      <td><a href="/score.html?id=${row[0]}">Lanjut maen</a></td>
      </tr>`)
].join('\n') 


function openModal() {
  const playerNumber = document.getElementById('player-number');
  playerNumber.value = 0;
  const players = document.getElementById('player-form');
  players.innerHTML = '';
  playerList = [];
}
function choosePlayerCount(value) {
  playerList = [];
  const dumps = [
    "Anto",
    "Budi",
    "Cherli",
    "Dodo",
    "Erwin",
    "Fucek",
    "Gunawan",
    "Hanto"
  ]
  if (!value) return
  const players = document.getElementById('player-form');
  let inputs = ''
  for (let i = 0; i < value; i++) {
    inputs += `
          <div class="input-group mb-3">
            <span class="input-group-text" id="player-${i + 1}">Pemain ${i + 1}</span>
            <input type="text" class="form-control" placeholder="${dumps[i]}" aria-label="${dumps[i]}" aria-describedby="player-${i + 1}" onchange="changeName(${i}, this.value)">
          </div>
        `;
        playerList.push("")
  }
  players.innerHTML = inputs ? `<hr>\n${inputs}` : '';
}

function changeName(index, value) {
  playerList[index] = value
  console.log(index, value);
  ValidateName()
}

function ValidateName() {
  const playerNumber = playerList.length;
  const filledPlayer = playerList.filter(item => item).length;
  console.log({playerNumber, filledPlayer});
  const newGameButton = document.getElementById('new-game-button');
  if(playerNumber !== filledPlayer) newGameButton.setAttribute('disabled', true)
  else newGameButton.removeAttribute('disabled')
}


function createNewGame() {
  data = JSON.parse(localStorage.getItem('data')) || []
  const now = new Date()
  data.push({
    id: data.length + 1,
    time: now.toLocaleDateString("id-ID"),
    winner: "",
    loser: "", 
    players: playerList,
    scores: [] 
  })
  localStorage.setItem('data', JSON.stringify(data))
  location.href = `/score.html?id=${data.length}`
}