const board = document.getElementById('board')
const WIN_COMBINATIONS = new Set([
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
])
const remainingCells = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8'])
const startingPlayer = Math.random() < 0.5 ? 'x' : 'circle'
const players = new Map([
    ['x', []],
    ['circle', []],
])
let count = 0
let activePlayer = startingPlayer
let shouldToggle = true;
let winner = undefined

function init() {
    buildGrid()
    board.classList.add(startingPlayer)
    document.querySelector('#newGame').addEventListener('click', () => window.location = '')
}

function buildGrid() {
    document
        .querySelectorAll('.cell')
        .forEach(cell =>
            cell.addEventListener('click', toggleSelected, { once: true }))
}

function toggleSelected($event) {
    assignCellToPlayer($event)
    checkGameState()
    toggleActivePlayer()
}

function assignCellToPlayer($event) {
    $event.target.classList.add('selected')
    $event.target.classList.add(activePlayer)
    const id = $event.target.id
    players.get(activePlayer).push(id)
    remainingCells.delete(id)
}

function checkGameState() {
    WIN_COMBINATIONS.forEach(combination => {
        count = 0
        combination.forEach(id => {
            if (players.get(activePlayer).includes(id)) {
                count++
                if (count === 3) {
                    winner = activePlayer
                }
            }
        })
    })
    if (!!winner) {
        document.querySelector('.modal-container').style.display = 'flex'
        document.querySelector('#modalMessage').innerHTML = `Player ${winner} wins!`
        return;
    }
    if (!winner && remainingCells.size === 0) {
        document.querySelector('.modal-container').style.display = 'flex'
        document.querySelector('#modalMessage').innerHTML = `It's a draw!`
    }
}

function toggleActivePlayer() {
    if (activePlayer === 'x') {
        activePlayer = 'circle'
        board.classList.replace('x', 'circle');
        return;
    }
    if (activePlayer === 'circle') {
        activePlayer = 'x'
        board.classList.replace('circle', 'x');
    }
}

init()
