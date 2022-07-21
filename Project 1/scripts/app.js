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

  const flyIndex1 = 1
  const flyIndex3 = 3
  const flyIndex5 = 5
  const flyIndex7 = 7
  


  //! Characters
  const startingPosition = 67
  let currentPosition = startingPosition
  
  
  const frog = 'frog'
  const car1 = 'car1'
  const car2 = 'car2'
  const car3 = 'car3'
  const car4 = 'car4'
  const fly = 'fly'
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
    
    carsLeft1 = Array.from(cells).slice(carStartIndexLeft1, carStartIndexLeft1 + width)
    carsRight1 = Array.from(cells).slice(carStartIndexRight1, carStartIndexRight1 + width)
    carsLeft2 = Array.from(cells).slice(carStartIndexLeft2, carStartIndexLeft2 + width)
    carsRight2 = Array.from(cells).slice(carStartIndexRight2, carStartIndexRight2 + width)
    addFrog(startingPosition)

    

    //! 1st row of cars
    
    
    //! 2nd row of cars
    
  
    //! 3rd row, leafs1
    
  
    //! 4th row, leafs2

  
    //! 5th row, flies
    

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

  function endGame() {
    clearInterval(timer)
    removeFrog(currentPosition)
    lives = 3
    score = 0
    livesDisplay.innerHTML = lives
    addFrog(startingPosition)
    setTimeout(() => alert(`Your score is ${score}`), 50)
  }

  // Starting the game
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

    createGrid()
    timer = setInterval(() => {
      counter++
      cells.forEach(cell => cell.classList.remove('car1', 'car2', 'car3', 'car4'))

      carsLeft1.forEach((car, i) => {
        if (i % carGapLeft1 === carGapLeft1 - 1 - counter % carGapLeft1){
          car.classList.add('car1')
          // i is the index of the car, width is * by carRowIndex and then added to the car index which will then be the same index of the frogs current position 
          if (i + width * carRowIndexLeft1 === currentPosition) {
            removeFrog(currentPosition)
            lives = lives - 1
            livesDisplay.innerHTML = lives
            
            addFrog(startingPosition)
            
          } 
        } 
      })
      
      carsRight1.forEach((car, i) => {
        if (i % carGapRight1 === carGapRight1 - 1 - counter % carGapRight1){
          car.classList.add('car2')
          if (i + width * carRowIndexRight1 === currentPosition) {
            removeFrog(currentPosition)
            
            lives = lives - 1
            livesDisplay.innerHTML = lives
            addFrog(startingPosition)
          } 
        } 
      })

      carsLeft2.forEach((car, i) => {
        if (i % carGapLeft2 === carGapLeft2 - 1 - counter % carGapLeft2) {
          car.classList.add('car3')
          if (i + width * carRowIndexLeft2 === currentPosition) {
            removeFrog(currentPosition)
            
            lives = lives - 1
            livesDisplay.innerHTML = lives
            addFrog(startingPosition)
          }
        }
      })

      carsRight2.forEach((car, i) => {
        if (i % carGapRight2 !== carGapRight2 - 1 - counter % carGapRight2){
          car.classList.add('car4')
          if (i + width * carRowIndexRight2 === currentPosition) {
            removeFrog(currentPosition)
            
            lives = lives - 1
            livesDisplay.innerHTML = lives
            addFrog(startingPosition)
          }
        }
      })

      if (lives === 0){
        endGame()
      }


    }, 500)

    addFly(flyIndex1)
    addFly(flyIndex3)
    addFly(flyIndex5)
    addFly(flyIndex7)
    
    if (currentPosition === flyIndex1) {
      removeFly(flyIndex1)
      score = score + 100
      scoreDisplay.innerHTML = score
    }

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

    if (cells[currentPosition].classList.contains('car1')){
      console.log('I have been hit')
      removeFrog(startingPosition)
      
      lives = lives - 1
      livesDisplay.innerHTML = lives
      addFrog(startingPosition)
    } 

    if (cells[currentPosition].classList.contains('car2')){
      removeFrog(startingPosition)
      
      lives = lives - 1
      livesDisplay.innerHTML = lives
      addFrog(startingPosition)
    }

    if (cells[currentPosition].classList.contains('car3')){
      console.log('I have been hit')
      removeFrog(startingPosition)
      
      lives = lives - 1
      livesDisplay.innerHTML = lives
      addFrog(startingPosition)
    } 

    if (cells[currentPosition].classList.contains('car4')){
      removeFrog(startingPosition)
      
      lives = lives - 1
      livesDisplay.innerHTML = lives
      addFrog(startingPosition)
    }

    

  }
  
  




  startButton.addEventListener('click', startGame)
  // cars.forEach(car => car.addEventListener('click', startGame))
  document.addEventListener('keyup', playerMovement)
  
  


}

document.addEventListener('DOMContentLoaded', init)
