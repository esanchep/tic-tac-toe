const game = document.getElementById('game')
const WIN_COMBINATIONS = new Set([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
])
const CELLS = 9
let count = 0
const startingPlayer = Math.random() < 0.5 ? 'x' : 'circle'
let activePlayer = startingPlayer
let shouldToggle = true;
let xPlayer = []
let circlePlayer = []
let winner = undefined

function init() {
    buildGrid()
    toggleActivePlayer()
}

function buildGrid() {
    for (let cell = 0; cell < CELLS; cell++) {
        const newCell = document.createElement('div')
        newCell.classList.add('cell')
        newCell.id = count++
        newCell.addEventListener('click', toggleSelected, { once: true })
        game.appendChild(newCell)
    }
}

function toggleSelected($event) {
    setSelectedCell($event)
    checkPlayerCells()
    toggleActivePlayer()
}

function setSelectedCell($event) {
    $event.target.classList.add('selected')
    $event.target.classList.add(activePlayer)
    if ($event.target.classList.contains('x')) {
        xPlayer.push($event.target.id)
    }
    if ($event.target.classList.contains('circle')) {
        circlePlayer.push($event.target.id)
    }
}

function checkPlayerCells() {
    if (game.classList.contains('x')) {
        WIN_COMBINATIONS.forEach(combination => {
            count = 0
            combination.forEach(id => {
                if (xPlayer.includes(id.toString())) {
                    count++
                    if (count === 3) {
                        winner = 'xPlayer'
                    }
                }
            })
        })
    }
    if (game.classList.contains('circle')) {
        WIN_COMBINATIONS.forEach(combination => {
            count = 0
            combination.forEach(id => {
                if (circlePlayer.includes(id.toString())) {
                    count++
                    if (count === 3) {
                        winner = 'circlePlayer'
                    }
                }
            })
        })
    }
    if (!!winner) {
        alert(`Player ${winner} wins!`)
        window.location = '/'
    }
    if (!winner && Array.from(document.getElementsByClassName('cell')).filter(cell => !cell.classList.contains('selected')).length === 0) {
        alert(`Draw!`)
        window.location = '/'
    }
}

function toggleActivePlayer() {
    if (!(game.classList.contains('x') || game.classList.contains('circle'))) {
        game.classList.add(startingPlayer)
    }
    if (game.classList.contains('x')) {
        game.classList.replace('x', 'circle');
        activePlayer = 'circle'
        return;
    }
    if (game.classList.contains('circle')) {
        game.classList.replace('circle', 'x');
        activePlayer = 'x'
        return;
    }
}

init()
