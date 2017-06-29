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


var canvas = document.createElement("canvas");
canvas.id = "myCanvas";
canvas.width = widthValue;
canvas.height = heightValue;
canvas.style.zIndex = 8;
canvas.style.position = "relative";
canvas.style.border = "1px solid";

//append canvas to document body
document.body.appendChild(canvas);


//set variable for canvas element
var canvasLayer = document.getElementById("myCanvas");
console.log(canvasLayer);

// get canvas 2D context 
var ctx = canvasLayer.getContext('2d');

//save and load tools
var saveLoad = document.createElement("div");
saveLoad.id = "saveLoad";
var clear = document.createElement("button");
clear.id = "clearCanvas";
clear.textContent = "Start Over";
var save = document.createElement("button");
save.id = "save";
save.textContent = "Save";
var load = document.createElement("button");
load.id = "load";
load.textContent = "Load";


document.body.appendChild(saveLoad);
saveLoad.appendChild(clear);
saveLoad.appendChild(save);
saveLoad.appendChild(load);


//create dimension tools
var setDimensions = document.createElement("div");
setDimensions.id = "dimensionsDiv";

var dimensionsText = document.createElement("h4");
var inputwidth = document.createElement("INPUT");
var inputheight = document.createElement("INPUT");
var submit = document.createElement("button");
submit.id = "submit";
submit.textContent = "Set";
inputwidth.type = "text";
inputheight.type = "text";
dimensionsText.innerHTML = "Set your Dimensions";

inputwidth.placeholder = "Width";
inputheight.placeholder = "Height";

document.body.appendChild(setDimensions);
setDimensions.appendChild(dimensionsText);
setDimensions.appendChild(inputwidth);
setDimensions.appendChild(inputheight);
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


//set up colors
var colors = ["#000000","#ff0000","#ffff00","#0000ff","#00ff00","#cc0099","#ff6600"];
var currentColor = "#000000";


//create color buttons
for (var i=0; i<=colors.length-1;i++){
	var colorBtn = document.createElement("button");
	colorBtn.style.backgroundColor = colors[i];
	colorBtn.value = colors[i];
	toolbox.appendChild(colorBtn);
	console.log(colors[i]);
	colorBtn.addEventListener('click', function(event) {
		currentColor = event.target.style.backgroundColor;
		console.log(currentColor);
	});
}

var colorWhite = "#737373";

var moreColors = document.createElement("INPUT");
moreColors.setAttribute("type", "color");
moreColors.id = "moreColors";


//create color buttons
var eraser = document.createElement("button");
var eraserImg = document.createElement("img");

eraser.style.backgroundColor = colorWhite;
eraser.id = "eraser"
eraserImg.src = "http://www.haotu.net/up/4179/128/19-eraser.png";
eraserImg.id = "eraserImg";

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




//function to get coordinates of mouse click
function getCoor(){
x = event.clientX - 40;    // Get the horizontal coordinate
y = event.clientY - 50;     // Get the vertical coordinate
var coor = "X coords: " + x + ", Y coords: " + y;
// console.log(coor);
}

//declare global variables for brush styles
ctx.lineWidth = 20;
ctx.lineCap = 'round';

//function to draw on click
function draw(click){
	// console.log(click);

	if (click.buttons ==! 1) return;

	ctx.beginPath();
	ctx.strokeStyle = currentColor;
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
ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//function to set dimensions
function canvasSize(){
	canvas.setAttribute('width',inputwidth.value);
	canvas.setAttribute('height',inputheight.value);

}

//function to save an image
function saveImage(){
	var image = canvas.toDataURL();
	localStorage.setItem("savedImage", image);
}
//function to load an image
function loadImage(){
	var dataURL =localStorage.getItem("savedImage");
	var img = new Image;
	img.src = dataURL;
	img.onload = function(){
		ctx.drawImage(img, 0, 0);
	};
}



//event listener get coordinates when clicking on canvas
canvasLayer.addEventListener('mousedown', getCoor);
canvasLayer.addEventListener('mouseenter', getCoor);

//add main event listener to draw when mouse moves
canvasLayer.addEventListener('mousemove', draw);

//add event listeners to change paint brush colors
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

//event listener to save and load
save.addEventListener('click', saveImage);
load.addEventListener('click', loadImage);






