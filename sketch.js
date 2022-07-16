let grid, columns, rows;

function buildArray(rows, columns) {
  let arr = new Array(columns)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let widthCanvas = 600
let heightCanvas = 600
let resolution = 20

function setup() {
  
  createCanvas(widthCanvas, heightCanvas)
  


  
  rows = heightCanvas / resolution
  cols = widthCanvas / resolution
  
  grid = buildArray(rows, cols)
  // randomize 1s and 0s in the 2D Array - correspondingly fill black/white
  for (let i = 0; i < rows; i++) {
    for (let a = 0; a < cols; a++) {
        grid[i][a] = Math.floor(Math.random() * 2); // 0 or 1 filled in

    }
  }
}

let generation = 0

function draw() {
  
  background(255)
 
  textSize(20)
  fill(255,0,0)
  noStroke()
  text("Conway's Game of Life by Araash", 25, heightCanvas - 25)
  print("Generation " + str(generation))
  
  frameRate(20)
 
  for (let i = 0; i < rows; i++) {
    for (let a = 0; a < cols; a++) {
        if (grid[i][a] == 1) {
        fill(0) 
        x = i * resolution
        y = a * resolution
        rect(x, y, resolution - 1, resolution - 1) // subtracting 1 from each side to make the grid style
        stroke(0); // black outline
        }
    }
  }
    
  let gridTwo = buildArray(rows, cols)
  
  
  for (let i = 0; i < rows; i++) {
    for (let a = 0; a < cols; a++) {
      gridTwo[i][a] = grid[i][a]
      
    }
  }
    
  
  for (let i = 0; i < rows; i++) {
    
      for (let a = 0; a < cols; a++) {
        
        let liveSum = 0
        
        if (i == 0 && a == 0) { // top-left corner 
          liveSum += grid[i+1][a]
          liveSum += grid[i+1][a+1]
          liveSum += grid[i][a+1]
        }
        
        else if (i == 0 && a == cols - 1) { // top-right corner
          liveSum += grid[i][cols-2]
          liveSum += grid[i+1][cols-2]
          liveSum += grid[i+1][cols-1]
        }
        
        else if (i == rows - 1 && a == 0) { // bottom-left corner
          liveSum += grid[rows - 2][a]
          liveSum += grid[rows - 1][a + 1]
          liveSum += grid[rows - 2][a + 1]
        }
        
        else if (i == rows - 1 && a == cols - 1) { // bottom-right corner
          liveSum += grid[rows - 1][cols - 2]
          liveSum += grid[rows - 2][cols - 2]
          liveSum += grid[rows - 2][cols - 1]
        }
        
        else if (i == 0) { // top row
          liveSum += grid[i][a + 1]
          liveSum += grid[i][a - 1]
          liveSum += grid[i + 1][a]
          liveSum += grid[i + 1][a + 1]
          liveSum += grid[i + 1][a - 1]
        }
        
        else if (i == rows - 1 && a!=0 && a!=cols-1) { // bottom row
          liveSum += grid[i][a - 1]
          liveSum += grid[i][a + 1]
          liveSum += grid[i - 1][a + 1]
          liveSum += grid[i - 1][a - 1]
          liveSum += grid[i - 1][a]
        }
        
        else if (a == 0 && i!= 0 && i!=rows - 1) { // left-most column
          liveSum += grid[i + 1][a]
          liveSum += grid[i - 1][a]
         liveSum += grid[i + 1][a + 1]
          liveSum += grid[i - 1][a + 1]
          liveSum += grid[i][a + 1]
        }
        
        else if (a == cols - 1) { // right-most column
          liveSum += grid[i - 1][a]
          liveSum += grid[i + 1][a]
          liveSum += grid[i - 1][a - 1]
          liveSum += grid[i + 1][a - 1]
          liveSum += grid[i][a - 1]
        }
        
        else {
          liveSum += grid[i][a+1] // 1 to the right
          liveSum += grid[i][a-1] // 1 to the left
          liveSum += grid[i+1][a] // 1 below
          liveSum += grid[i-1][a] // 1 upwards
          liveSum += grid[i-1][a-1] // bottom-left diagonal
          liveSum += grid[i+1][a-1] // top-left diagonal
          liveSum += grid[i-1][a+1] // bottom-right diagonal
          liveSum += grid[i+1][a+1] // top-right diagonal
        }
        
        if (grid[i][a] == 1) { // condition 1: be alive
          if (liveSum < 2) {
            gridTwo[i][a] = 0 // touching less than 2 alive neighbors => dies
          } 
          else if (liveSum >= 4) {
            gridTwo[i][a] = 0 // touching 4 or more alive neighbors => dies
          }
        }
        
        else { // for all the dead cells
          if (liveSum == 3)
            gridTwo[i][a] = 1 // a dead cell with 3 alive neighbors // reborn (LOL)
        }
      }
    }

  
  for (let i = 0; i < rows; i++) {
    for (let a = 0; a <  cols; a++) {
      grid[i][a] = gridTwo[i][a] // the initial grid takes the values of the second grid
    }
  }
  
  generation += 1
  
}

