
let defaultCOLOR = '#333333'
let defaultMODE = 'color'
let defaultSIZE = 16

let currentCOLOR = defaultCOLOR
let currentMODE = defaultMODE
let currentSIZE = defaultSIZE

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMODE = newMode
}

function setCurrentColor(newColor) {
    currentCOLOR = newColor
}

function setCurrentSize(newSize) {
    currentSIZE = newSize
}

///////////////////////////////////////////

const colorPicker = document.getElementById('color-picker');
const rainbowButton = document.querySelector('.randomBTN');
const eraserButton = document.querySelector('.eraserBTN');
const clearButton = document.querySelector('.clearBTN');
const gridButton = document.querySelector('.gridBTN');
const gridSlider = document.getElementById('gridSlider');
const grid = document.getElementById('grid');
const sizeValue = document.querySelector('.canvas-size-display');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
rainbowButton.onclick = () => setCurrentMode('random');
eraserButton.onclick = () => setCurrentMode('eraser');
clearButton.onclick = () => reloadGrid()
gridSlider.onmousemove = (e) => updateSizeValue(e.target.value);
gridSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
  }

//function updateSizeValue(value) {
   // 
//}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
  }
  
  function clearGrid() {
    grid.innerHTML = ''
  }

  document.querySelector('.gridBTN').addEventListener('click', (e) => {
    const size = (e.target.value) ? '1px' : '0';
    document.documentElement.style.setProperty('--grid-size', size);
});


function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.classList.add('grid-element')
    gridElement.addEventListener('mouseover', changeColor)
    gridElement.addEventListener('mousedown', changeColor)
    grid.appendChild(gridElement)
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active')
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
  } else if (newMode === 'color') {
    colorBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}

window.onload = () => {
  setupGrid(defaultSIZE)
  activateButton(defaultMODE)
}
