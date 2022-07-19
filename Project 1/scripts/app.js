function init() {

  //! Elements
  const grid = document.querySelector('.grid')


  //! Variables
  const width = 9
  const height = 8
  const cellCount = width * height
  const cells = []
  let counter = 0

  //! Car movement
  // car1
  const carRowIndexLeft = 6
  const carGapLeft = 2
  const carStartIndexLeft = width * carRowIndexLeft 
  let carsLeft = []
  
  // car2
  const carRowIndexRight = 4
  const carGapRight = 2
  const carStartIndexRight = width * carRowIndexRight
  let carsRight = []

  // leaf1
  const leafRowIndexLeft = 2
  const leafGapLeft = 3
  const leafStartIndexLeft = width * leafRowIndexLeft
  let leafsLeft = []

  // leaf2
  const leafRowIndexRight = 1
  const leafGapRight = 2
  const leafStartIndexRight = width * leafRowIndexRight
  let leafsRight = []
  


  //! Characters
  const startingPosition = 67
  let currentPosition = startingPosition
  
  
  const frog = 'frog'
  const car1 = 'car1'
  const car2 = 'car2'
  const fly = 'fly'
  const leaf1 = 'leaf1'
  const leaf2 = 'leaf2'

  //! Other
  const startButton = document.querySelector('button')
  const scoreDisplay = document.querySelector('#score')
  const fliesDisplay = document.querySelector('#fliesEaten')
  const livesDisplay = document.querySelector('#livesRemaining')

  let score = 0
  let flies = 0
  let lives = 3
  let timer

  
  
  //!Creating a grid function
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell) 
    }
    carsLeft = Array.from(cells).slice(carStartIndexLeft, carStartIndexLeft + width)
    carsRight = Array.from(cells).slice(carStartIndexRight, carStartIndexRight + width)
    leafsLeft = Array.from(cells).slice(leafStartIndexLeft, leafStartIndexLeft + width)
    leafsRight = Array.from(cells).slice(leafStartIndexRight, leafStartIndexRight + width)

    addFrog(startingPosition)

    //! 1st row of cars
    
    
    //! 2nd row of cars
    
  
    //! 3rd row, leafs1
    
  
    //! 4th row, leafs2

  
    //! 5th row, flies
    addFly(1)
    addFly(3)
    addFly(5)
    addFly(7)

  }

  //! Character functions
  
  function addFrog(position) {
    cells[position].classList.add(frog)
  }

  function removeFrog(position) {
    cells[position].classList.remove(frog)
  }

  function addFly(position) {
    cells[position].classList.add(fly)
  }

  function removeFly(position) {
    cells[position].classList.remove(fly)
  }

  function startGame() {
    // if (lives === 0) {
    //   currentPosition = startingPosition
    //   removeFrog()
    //   clearInterval(timer)
    //   score = 0
    //   lives = 3
    //   scoreDisplay.innerHTML = score
    //   livesDisplay.innerHTML = lives
    // }
    timer = setInterval(() => {
      counter++
      cells.forEach(cell => cell.classList.remove('car1', 'car2', 'leaf1', 'leaf2'))

      carsLeft.forEach((car, i) => {
        if (i % carGapLeft === carGapLeft - 1 - counter % carGapLeft){
          car.classList.add('car1')
          
        } 
      })
      
      carsRight.forEach((car, i) => {
        if (i % carGapRight !== carGapRight - 1 - counter % carGapRight){
          car.classList.add('car2')
          
        } 
      })

      leafsLeft.forEach((leaf, i) => {
        if (i % leafGapLeft === leafGapLeft - 1 - counter % leafGapLeft)
          leaf.classList.add('leaf1')

      })

      leafsRight.forEach((leaf, i) => {
        if (i % leafGapRight !== leafGapRight - 1 - counter % leafGapRight)
          leaf.classList.add('leaf2')

      })


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
      console.log('clicked up')
      currentPosition -= width
    } else if (down === keyCode && currentPosition + width <= cellCount - 1) {
      console.log('clicked down')
      currentPosition += width
    } else if (left === keyCode && currentPosition % width !== 0) {
      console.log('clicked left')
      currentPosition -= 1
    } else if (right === keyCode && currentPosition % width !== width - 1) {
      console.log('clicked right')
      currentPosition += 1
    }

    addFrog(currentPosition)

    if (cells[currentPosition].classList.contains('car1') || cells[currentPosition].classList.contains('car2')){
      lives -=
      livesDisplay.innerHTML = lives
      currentPosition = startingPosition
    } 

    if (cells[currentPosition].classList.contains('fly')){
      flies +=
      fliesDisplay.innerHTML = flies
      removeFly()
    }
  }

  function endGame () {
  
    if (lives === 0) {
      console.log('Lost!')
      frog.classList.remove('frog')
      clearInterval(timer)
      score = 0
      lives = 3
      flies = 0
      scoreDisplay.innerHTML = score
      livesDisplay.innerHTML = lives
      fliesDisplay.innerHTML = flies
      setTimeout(() => {
        window.alert(score)
      }, 50)
    }
  }
  
  




  startButton.addEventListener('click', startGame)
  // cars.forEach(car => car.addEventListener('click', startGame))
  document.addEventListener('keyup', playerMovement)
  createGrid()
  endGame()


}

document.addEventListener('DOMContentLoaded', init)
