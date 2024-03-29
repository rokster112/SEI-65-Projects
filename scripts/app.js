function init() {

  //! Elements
  const grid = document.querySelector('.grid')
  const popUps = document.querySelectorAll('.popUp')


  //! Variables
  const width = 9
  const height = 8
  const cellCount = width * height
  const cells = []
  let counter = 0

  //! Car movement
  // car1
  const carRowIndexLeft1 = 6
  const carGapLeft1 = 3
  const carStartIndexLeft1 = width * carRowIndexLeft1
  let carsLeft1 = []
  
  // car2
  const carRowIndexRight1 = 4
  const carGapRight1 = 2
  const carStartIndexRight1 = width * carRowIndexRight1
  let carsRight1 = []

  // car3
  const carRowIndexLeft2 = 2
  const carGapLeft2 = 3
  const carStartIndexLeft2 = width * carRowIndexLeft2
  let carsLeft2 = []

  // car4
  const carRowIndexRight2 = 1
  const carGapRight2 = 2
  const carStartIndexRight2 = width * carRowIndexRight2
  let carsRight2 = []
  
  //! Characters
  const startingPosition = 67
  let currentPosition = startingPosition
  
  
  const frog = 'frog'
  const car1 = 'car1'
  const car2 = 'car2'
  const car3 = 'car3'
  const car4 = 'car4'
  const fly1 = 'fly1'
  const fly2 = 'fly2'
  const fly3 = 'fly3'
  const fly4 = 'fly4'
  
  //! Other
  const startButton = document.querySelector('button')
  const scoreDisplay = document.querySelector('#score')
  const fliesDisplay = document.querySelector('#fliesEaten')
  const livesDisplay = document.querySelector('#livesRemaining')

  //! Music
  const gameOver = document.querySelector('#gameOver')
  const win = document.querySelector('#win')
  const hitDamage = document.querySelector('#gettingHit')
  const touchingFly = document.querySelector('#touchingFly')
  const startingGame = document.querySelector('#startGame')

  let score = 0
  let flies = 0
  let lives = 3
  let timer

  function gameOverTheme() {
    gameOver.play()
  }

  function winTheme() {
    win.play()
  }

  function hitDamageTheme() {
    hitDamage.play()
  }

  function touchingFlyTheme() {
    touchingFly.play()
  }

  function startingGameTheme() {
    startingGame.play()
  }

  function pauseTheme() {
    startingGame.pause()
  }

  //!Creating a grid function

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
    
    carsLeft1 = Array.from(cells).slice(carStartIndexLeft1, carStartIndexLeft1 + width)
    carsRight1 = Array.from(cells).slice(width * carStartIndexRight1, width * (carStartIndexRight1 + 1))
    carsLeft2 = Array.from(cells).slice(carStartIndexLeft2, carStartIndexLeft2 + width)
    carsRight2 = Array.from(cells).slice(width * carStartIndexRight2, width * (carStartIndexRight2 + 1))
  }

  //! Character functions
  
  function addFrog(position) {
    cells[position].classList.add(frog)
  }

  function removeFrog(position) {
    cells[position].classList.remove(frog)
  }

  function addFly1(position) {
    cells[position].classList.add(fly1)
  }

  function addFly2(position) {
    cells[position].classList.add(fly2)
  }

  function addFly3(position) {
    cells[position].classList.add(fly3)
  }

  function addFly4(position) {
    cells[position].classList.add(fly4)
  }

  function removeFly1(position) {
    cells[position].classList.remove(fly1)
  }

  function removeFly2(position) {
    cells[position].classList.remove(fly2)
  }

  function removeFly3(position) {
    cells[position].classList.remove(fly3)
  }

  function removeFly4(position) {
    cells[position].classList.remove(fly4)
  }

  function endGame() {
    clearInterval(timer)
    removeFrog(currentPosition)
    currentPosition = startingPosition
    addFrog(startingPosition)
    if (lives <= 0) {
      pauseTheme()
      gameOverTheme()
      setTimeout(() => alert(`You lose!! Your score is ${score}`), 30)
      popUps.forEach(popUp => popUp.classList.add('active'))
    } else if (flies === 4) {
      pauseTheme()
      winTheme()
      setTimeout(() => alert(`You win!! Your score is ${score}`), 30)
      popUps.forEach(popUp => popUp.classList.add('active'))
    }
  }

  function gettingHit() {
    hitDamageTheme()
    removeFrog(currentPosition)
    currentPosition = startingPosition
    addFrog(startingPosition)
    lives = lives - 1
    livesDisplay.innerHTML = lives
  }

  function eatingFly() {
    touchingFlyTheme()
    score = score + 100
    scoreDisplay.innerHTML = score
    flies = flies + 1
    fliesDisplay.innerHTML = flies
  }

  // Starting the game
  function startGame() {
    startingGameTheme()
    popUps.forEach(popUp => popUp.classList.remove('active'))
    addFrog(startingPosition)
    lives = 3
    score = 0
    flies = 0
    livesDisplay.innerHTML = lives
    scoreDisplay.innerHTML = score
    fliesDisplay.innerHTML = flies
    endGame()

    addFly1(1)
    addFly2(3)
    addFly3(5)
    addFly4(7)

    timer = setInterval(() => {
      counter++
      cells.forEach(cell => cell.classList.remove('car1', 'car2', 'car3', 'car4'))

      carsLeft1.forEach((car, i) => {
        if (i % carGapLeft1 === carGapLeft1 - 1 - counter % carGapLeft1){
          car.classList.add('car1')
          // i is the index of the car, width is * by carRowIndex and then added to the car index which will then be the same index of the frogs current position 
          if (i + width * carRowIndexLeft1 === currentPosition) {
            gettingHit()
          } 
        } 
      })
      
      carsRight1.forEach((car, i) => {
        if (i % carGapRight1 === counter % carGapRight1){
          car.classList.add('car2')
          if (i + width * carRowIndexRight1 === currentPosition) {
            gettingHit()
          } 
        } 
      })

      carsLeft2.forEach((car, i) => {
        if (i % carGapLeft2 === carGapLeft2 - 1 - counter % carGapLeft2) {
          car.classList.add('car3')
          if (i + width * carRowIndexLeft2 === currentPosition) {
            gettingHit()
          }
        }
      })

      carsRight2.forEach((car, i) => {
        if (i % carGapRight2 === counter % carGapRight2){
          car.classList.add('car4')
          if (i + width * carRowIndexRight2 === currentPosition) {
            gettingHit()
          }
        }
      })

      if (lives <= 0){
        endGame()
      } else if (flies === 4) {
        endGame()
      }

    }, 500)
  }

  function playerMovement(e) {
    const keyCode = e.keyCode
    const up = 38
    const down = 40
    const left = 37
    const right = 39
    
    removeFrog(currentPosition)

    if (up === keyCode && currentPosition >= width) {
      currentPosition -= width
    } else if (down === keyCode && currentPosition + width <= cellCount - 1) {
      currentPosition += width
    } else if (left === keyCode && currentPosition % width !== 0) {
      currentPosition -= 1
    } else if (right === keyCode && currentPosition % width !== width - 1) {
      currentPosition += 1
    }

    addFrog(currentPosition)

    if (cells[currentPosition].classList.contains('car1')){
      gettingHit()
    } 

    if (cells[currentPosition].classList.contains('car2')){
      gettingHit()
    }

    if (cells[currentPosition].classList.contains('car3')){
      gettingHit()
    } 

    if (cells[currentPosition].classList.contains('car4')){
      gettingHit()
    }

    if (cells[currentPosition].classList.contains('fly1')) {
      eatingFly()
      removeFly1(1)
      removeFrog(currentPosition)
      currentPosition = startingPosition
      addFrog(startingPosition)
    } 
    
    if (cells[currentPosition].classList.contains('fly2')) {
      eatingFly()
      removeFly2(3)
      removeFrog(currentPosition)
      currentPosition = startingPosition
      addFrog(startingPosition)
    } 
    
    if (cells[currentPosition].classList.contains('fly3')) {
      eatingFly()
      removeFly3(5)
      removeFrog(currentPosition)
      currentPosition = startingPosition
      addFrog(startingPosition)
    } 
    
    if (cells[currentPosition].classList.contains('fly4')) {
      eatingFly()
      removeFly4(7)
      removeFrog(currentPosition)
      currentPosition = startingPosition
      addFrog(startingPosition)
    }
  }
  
  startButton.addEventListener('click', createGrid)
  startButton.addEventListener('click', startGame)
  document.addEventListener('keyup', playerMovement)
}

document.addEventListener('DOMContentLoaded', init)