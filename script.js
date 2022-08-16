
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
const rainbowButton = document.querySelector('.rainbowBTN');
const eraserButton = document.querySelector('.eraserBTN');
const clearButton = document.querySelector('.clearBTN');
const gridButton = document.querySelector('.gridBTN');
const gridSlider = document.getElementById('gtidSlider');
const grid = document.getElementById('grid');
const sizeValue = document.querySelector('.canvas-size-display');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
rainbowButton.onclick = () => setCurrentMode('rainbow'); 
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

