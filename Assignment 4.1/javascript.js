//set global variables
var x = 0;
var y = 0;

var widthValue = 500;
var heightValue = 500;

var canvas = "";

//create page title
var title = document.createElement('h3');
title.innerHTML = "Lorine's Painting Shed";
document.body.appendChild(title);

createCanvas();

//create canvas layer
function createCanvas(){
var canvas = document.createElement("canvas");
canvas.id = "myCanvas";
canvas.width = widthValue;
canvas.height = heightValue;
canvas.style.zIndex = 8;
canvas.style.position = "relative";
canvas.style.border = "1px solid";

//append canvas to document body
document.body.appendChild(canvas);
}

//save and load tools
var saveLoad = document.createElement("div");
saveLoad.id = "saveLoad";

var save = document.createElement("button");
save.id = "save";
save.textContent = "Save";
var load = document.createElement("button");
load.id = "load";
load.textContent = "Load";


document.body.appendChild(saveLoad);
saveLoad.appendChild(save);
saveLoad.appendChild(load);


//create dimension tools
var setDimensions = document.createElement("div");
setDimensions.id = "dimensionsDiv";

var dimensionsText = document.createElement("h4");
var width = document.createElement("INPUT");
var height = document.createElement("INPUT");
var submit = document.createElement("button");
submit.id = "submit";
submit.textContent = "set";
width.type = "text";
height.type = "text";
dimensionsText.innerHTML = "Set your Dimensions";

width.placeholder = "Width";
height.placeholder = "Height";

document.body.appendChild(setDimensions);
setDimensions.appendChild(dimensionsText);
setDimensions.appendChild(width);
setDimensions.appendChild(height);
setDimensions.appendChild(submit);

//create toolbox
var toolbox = document.createElement("div");
var toolboxText = document.createElement("h4");

toolbox.id = "myToolbox";
toolbox.padding = 0;
toolboxText.innerHTML = "My toolbox";

//append toolbox to document body
document.body.appendChild(toolbox);
toolbox.appendChild(toolboxText);

//set variable for canvas element
var canvasLayer = document.getElementById("myCanvas");
console.log(canvasLayer);

// get canvas 2D context 
var ctx = canvasLayer.getContext('2d');

//set different colours as global variables
var colorBlack = "#000000";
var colorRed = "#ff0000";
var colorYellow = "#ffff00";
var colorBlue = "#0000ff";
var colorGreen = "#00ff00";
var colorPurple = "#cc0099";
var colorOrange = "#ff6600";
var colorWhite = "#737373";

var moreColors = document.createElement("INPUT");
moreColors.setAttribute("type", "color");
moreColors.id = "moreColors";


//create color buttons
var black = document.createElement("button");
var red = document.createElement("button");
var yellow = document.createElement("button");
var blue = document.createElement("button");
var green = document.createElement("button");
var purple = document.createElement("button");
var orange = document.createElement("button");
var eraser = document.createElement("button");
var eraserImg = document.createElement("img");

black.style.backgroundColor = colorBlack;
red.style.backgroundColor = colorRed;
yellow.style.backgroundColor = colorYellow;
blue.style.backgroundColor = colorBlue;
green.style.backgroundColor = colorGreen;
purple.style.backgroundColor = colorPurple;
orange.style.backgroundColor = colorOrange;
eraser.style.backgroundColor = colorWhite;
eraser.id = "eraser"
eraserImg.src = "http://www.haotu.net/up/4179/128/19-eraser.png";
eraserImg.id = "eraserImg";

toolbox.appendChild(black);
toolbox.appendChild(red);
toolbox.appendChild(yellow);
toolbox.appendChild(blue);
toolbox.appendChild(green);
toolbox.appendChild(purple);
toolbox.appendChild(orange);
toolbox.appendChild(moreColors);
toolbox.appendChild(eraser);
eraser.appendChild(eraserImg);


//create buttons to change brush size
var bigger = document.createElement("button");
var brushSize = document.createElement("h5");
var smaller = document.createElement("button");

brushSize.id = "brushSize";
brushSize.innerHTML = "Brush Size";
bigger.textContent = "+";
smaller.textContent = "-";

toolbox.appendChild(bigger);
toolbox.appendChild(brushSize);
toolbox.appendChild(smaller);

//create button to clear canvas
var clear = document.createElement("button");

clear.id = "clearCanvas";
clear.textContent = "Start Over";

toolbox.appendChild(clear);


//function to get coordinates of mouse click
function getCoor(){
x = event.clientX - 40;    // Get the horizontal coordinate
y = event.clientY - 50;     // Get the vertical coordinate
var coor = "X coords: " + x + ", Y coords: " + y;
console.log(coor);
}

//declare global variables for brush styles
ctx.lineWidth = 30;
ctx.lineCap = 'round';

//function to draw on click
function draw(click){
	console.log(click);

	if (click.buttons ==! 1) return;

	ctx.beginPath();
	//input previous coordinates and new coordinates
	ctx.moveTo(x, y); // from position
  	getCoor();
  	ctx.lineTo(x, y); // to position
  	ctx.stroke();
}

//function to change brush size
function biggerBrush(){
	var brushSize = ctx.lineWidth;
	var newSize = brushSize + 5;
	ctx.lineWidth = newSize;	
}
function smallerBrush(){
	var brushSize = ctx.lineWidth;
	var newSize = brushSize - 5;
	ctx.lineWidth = newSize;
}

//function to clear canvas
function clearCanvas(){
ctx.beginPath();
ctx.rect(0, 0, 500, 500);
ctx.fillStyle = "white";
ctx.fill();
}

//function to set dimensions
function canvasSize(){
	widthValue = width.value;
	heightValue = height.value;
	console.log(widthValue);
	console.log(heightValue);
}


//event listener get coordinates when clicking on canvas
canvasLayer.addEventListener('mousedown', getCoor);
canvasLayer.addEventListener('mouseenter', getCoor);

//add main event listener to draw when mouse moves
canvasLayer.addEventListener('mousemove', draw);

//add event listeners to change paint brush colors
black.addEventListener('click', function(){ctx.strokeStyle = colorBlack;});
red.addEventListener('click', function(){ctx.strokeStyle = colorRed;});
yellow.addEventListener('click', function(){ctx.strokeStyle = colorYellow;});
blue.addEventListener('click', function(){ctx.strokeStyle = colorBlue;});
green.addEventListener('click', function(){ctx.strokeStyle = colorGreen;});
purple.addEventListener('click', function(){ctx.strokeStyle = colorPurple;});
orange.addEventListener('click', function(){ctx.strokeStyle = colorOrange;});
moreColors.addEventListener('change', function(){ctx.strokeStyle = moreColors.value;});
eraser.addEventListener('click', function(){ctx.strokeStyle = "white";});
eraser.addEventListener('click', function(){ctx.lineWidth = 50;});


//add event listeners to change brush sizes
bigger.addEventListener('click', biggerBrush);
smaller.addEventListener('click', smallerBrush);

//event listener to clear canvas
clear.addEventListener('click', clearCanvas);

//event listener to set dimensions
submit.addEventListener('click', canvasSize);

