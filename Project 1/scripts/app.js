function init() {

  //! Elements
  const grid = document.querySelector('.grid')



  //! Variables
  const width = 9
  const height = 8
  const cellCount = width * height
  const cells = []

  //! Car movement
  


  //! Characters
  const startingPosition = 67
  let currentPosition = startingPosition
  const carRight = [62, 61, 60, 59, 58, 57, 56, 55, 54]
  console.log(carRight)
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
    addFrog(startingPosition)
    //! 1st row of cars
    addCar1(61)
    addCar1(59)
    addCar1(57)
    addCar1(55)

    //! 2nd row of cars
    addCar2(37)
    addCar2(39)
    addCar2(41)
    addCar2(43)

    //! 3rd row, leafs1
    addLeaf1(26)
    addLeaf1(24)
    addLeaf1(22)
    addLeaf1(20)

    //! 4th row, leafs2
    addLeaf2(9)
    addLeaf2(11)
    addLeaf2(13)
    addLeaf2(15)

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
  
  function addCar1(position) {
    cells[position].classList.add(car1)
  }

  function addCar2(position) {
    cells[position].classList.add(car2)
  }

  function addLeaf1(position) {
    cells[position].classList.add(leaf1)
  }

  function addLeaf2(position) {
    cells[position].classList.add(leaf2)
  }

  function addFly(position) {
    cells[position].classList.add(fly)
  }

  function removeFly(position) {
    cells[position].classList.remove(fly)
  }

  function startGame() {

    

    timer = setInterval(() => {
      
      
    }, 1000)

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
  }





  document.addEventListener('keyup', playerMovement)
  createGrid()

}

document.addEventListener('DOMContentLoaded', init)
