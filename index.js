var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show ($el) {
    $el.classList.remove('hide')
}

function hide ($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)

    var interval = setInterval(function() {
        var time =  parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    renderBox()
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}

function renderBox() {
    $game.innerHTML = ''

    var box = document.createElement('div')
    var boxSize = getRender(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = getRandomColor()
    box.style.top = getRender(0, maxTop) + 'px'
    box.style.left = getRender(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function getRender(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
    var r = getRender(0, 256)
    var g = getRender(0, 256)
    var b = getRender(0, 256)
    return `rgb(${r}, ${g}, ${b})`
}