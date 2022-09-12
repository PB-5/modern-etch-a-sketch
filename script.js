
const defaultCOLOR = '#333333'
const defaultMODE = 'color'
const defaultSIZE = 16

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

const colorPicker = document.getElementById('color-picker');
const rainbowButton = document.querySelector('.randomBTN');
const eraserButton = document.querySelector('.eraserBTN');
const clearButton = document.querySelector('.clearBTN');
const gridButton = document.querySelector('.gridBTN');
const gridSlider = document.getElementById('gridSlider');
const grid = document.getElementById('grid');
const sizeValue = document.getElementById('sizeValue');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorPicker.onclick = () => setCurrentMode('color')
rainbowButton.onclick = () => setCurrentMode('random');
eraserButton.onclick = () => setCurrentMode('eraser');
clearButton.onclick = () => reloadGrid()
gridSlider.onmousemove = (e) => updateSizeValue(e.target.value);
gridSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
  }

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSIZE)
  }
  
  function clearGrid() {
    grid.innerHTML = ''
  }

  function toggleGrid() {
    let canvas = document.getElementById('grid');
    let cellGrid = canvas.querySelectorAll("div");
    cellGrid.forEach((e) => e.classList.toggle("grid-element"));
    canvas.classList.toggle("grid-OFF");
  }

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
  if (currentMODE === 'random') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  }  else if (currentMODE === 'color') {
    e.target.style.backgroundColor = currentCOLOR
  } else if (currentMODE === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  } 
}

function activateButton(newMode) {
  if (currentMODE === 'random') {
    rainbowButton.classList.remove('active')
  }  else if (currentMODE === 'color') {
    colorPicker.classList.remove('active')
  } else if (currentMODE === 'eraser') {
    eraserButton.classList.remove('active')
  }

  if (newMode === 'random') {
    rainbowButton.classList.add('active')
   } else if (newMode === 'color') {
    colorPicker.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserButton.classList.add('active')
  }
}

window.onload = () => {
  setupGrid(defaultSIZE)
  activateButton(defaultMODE)
}
