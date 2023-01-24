let data = JSON.parse(localStorage.getItem('data')) || []
const href = location.href
const url = new URL(href);
const id = url.searchParams.get("id");
const row = data.find(column => column.id == id)
const table = document.getElementById('table')
const templates = [
    "table-primary",
    "table-secondary",
    "table-success",
    "table-danger",
    "table-warning",
    "table-info",
    "table-light",
    "table-dark",
]

let players = row.players || [];
let scores = row.scores || [];
let total = players.map(_ => 0)
let temp = []

render()

function changeScore(index, value) {
    temp[index] = value
    console.log(temp);
    const button = document.getElementById('add-score-button')
    if (temp.includes('') || temp.includes(null) || temp.length !== players.length) button.setAttribute('disabled', true)
    else button.removeAttribute('disabled')
}

function resetScore(j) {
    scores.map((_, i) => {
        scores[i][j] = 0;
    })
    render()
}

function addScore() {
    if (temp.includes('') || temp.includes(null) || temp.length !== players.length) return
    players.map((_, index) => {
        document.getElementById(`player-${index + 1}`).value = null
    });

    scores = [temp, ...scores]
    const button = document.getElementById('add-score-button')
    button.setAttribute('disabled', true)
    render()
    temp = []
}

function render() {
    total = total.map((_, i) => (
        scores.map(value => value[i]).reduce((a, b) => +a + +b, 0)
    ))
    const inputs = (item) => item.map((_, i) => `<td class="${templates[i]}">
    <div class="input-group mb-3">
        <input type="number" class="form-control" id="player-${i + 1}" onchange="changeScore(${i}, this.value)">
    </div>
    </td>`).join('')
    const reset = (item) => item.map((value, i) => `<td class="${templates[i]}">
    <div class="input-group mb-3">
        <input type="number" class="form-control" value="${value}" disabled>
        <button type="button" class="btn btn-primary" onclick="resetScore(${i})">Reset</button>
    </div>
    </td>`).join('')
    const contents = (item) => item.map((value, i) => `<td class="${templates[i]}">${value}</td>`).join('')
    table.innerHTML = [
        `<tr class="fw-bold">${contents(players)}</tr>`,
        `<tr class="fw-bold">${reset(total)}</tr>`,
        `<tr>${inputs(players)}</tr>`,
        ...scores.map(item => `<tr>${contents(item)}</tr>`)
    ].join('\n')
    store()
}

function store() {
    data = JSON.parse(localStorage.getItem('data')) || []
    const now = new Date()
    data[id - 1] = {
        id,
        time: now.toLocaleDateString("id-ID"),
        winner: players[total.indexOf(Math.max(...total))],
        loser: players[total.indexOf(Math.min(...total))],
        players,
        scores
    }
    localStorage.setItem('data', JSON.stringify(data))
}
