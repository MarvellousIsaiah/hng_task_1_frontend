const colorBox = document.querySelector('[data-testid="colorBox"]')
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]')
const gameStatus = document.querySelector('[data-testid="gameStatus"]')
const scoreElement = document.querySelector('[data-testid="score"]')
const newGameButton = document.querySelector('[data-testid="newGameButton"]')

let targetColor
let score = 0

function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

function startNewGame() {
  targetColor = getRandomColor()
  colorBox.style.backgroundColor = targetColor

  const colors = [targetColor]
  while (colors.length < 6) {
    const newColor = getRandomColor()
    if (!colors.includes(newColor)) {
      colors.push(newColor)
    }
  }

  colors.sort(() => Math.random() - 0.5)

  colorOptions.forEach((option, index) => {
    option.style.backgroundColor = colors[index]
    option.classList.remove("fade-out")
    option.disabled = false
  })

  gameStatus.textContent = ""
  gameStatus.classList.remove("celebrate")
}

function handleGuess(event) {
  const guessedColor = event.target.style.backgroundColor
  if (guessedColor === targetColor) {
    gameStatus.textContent = "Correct!"
    gameStatus.classList.add("celebrate")
    score++
    scoreElement.textContent = score
    colorOptions.forEach((option) => (option.disabled = true))
    setTimeout(startNewGame, 1500)
  } else {
    gameStatus.textContent = "Wrong! Try again."
    event.target.classList.add("fade-out")
    event.target.disabled = true
  }
}

colorOptions.forEach((option) => {
  option.addEventListener("click", handleGuess)
})

newGameButton.addEventListener("click", () => {
  score = 0
  scoreElement.textContent = score
  startNewGame()
})

startNewGame()

