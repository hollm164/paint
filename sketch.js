//============================
//  Paint
//============================

//html elements
var drawingCanvas;
var saveButton;
var brushPicker;
var clearButton;



//values saved from html elements
var colorPicker;
var brushSize;
var brushType;

var pumpkin;

var uploadedImage;

function preload(){
  pumpkin = loadImage("images/pumpkin.png");
}




function setup() {

    //Make the canvas and then insert it into a div
    drawingCanvas = createCanvas(760, 480);
    drawingCanvas.parent('drawingContainer');
    background("white");

    //set up the color picker
    colorPicker = select("#ColorPicker");

    //set up the paintbrush width slider
    brushSize = createSlider(1, 50, 10);
    brushSize.parent('brushSize');

    //set up the save button
    saveButton = select('.saveButton');
    saveButton.mouseClicked(saveFunction);

    //TASK: set up the clear button
    clearButton = select('.clearButton');
    clearButton.mouseClicked(clearFunction);

    //set up the brush types
    brushPicker = createSelect();
    brushPicker.parent("brushType")

    brushPicker.option('paint brush');
    //TASK: add paint bucket option
    brushPicker.option('paint bucket');
    //TASK: add eraser option
    brushPicker.option('eraser');
    //TASK: add two new brush options
    brushPicker.option('pumpkin');

    brushPicker.option('spray paint');

    //Set up the brush type event listener:
    brushPicker.changed(changeBrush);

    //Set the default brush type to the first item in the menu:
    brushType = brushPicker.value();

    var uploadButton = createFileInput(imageUploaded);
}


function draw() {

    if (mouseIsPressed) {
        if (brushType == "paint brush"){
            standardStroke();
        } else if (brushType == "paint bucket"){
            fillBackground();
        } else if (brushType == "eraser"){
            eraseDrawing();
        } else if (brushType == "pumpkin"){
            drawPumpkin();
        } else if (brushType == "spray paint"){
            sprayCan();
        }
        //add your other brush options here using else if

    } else {
        //Cursor options: ARROW, CROSS, HAND, MOVE, TEXT, or WAIT, or path for image
        //if you use an image, the recommended size is 16x16 or 32x32 pixels
        cursor(CROSS);
    }

  }

//callback function
function imageUploaded(file){
	uploadedImage = loadImage(file.data, drawImg);
}

function drawImg(){
	image(uploadedImage,0,0);
}


//--------------------------
// Brushes
//--------------------------

function standardStroke(){
    //set the size of the brush from the slider
    strokeWeight(brushSize.value());

    //use the hex code for the stroke color
    stroke("#"+colorPicker.value());
    //If you want to use the RGB values instead you can do so like this:
    //(useful if you want to add opacity with RGBA)
    // stroke(colorPicker.elt.color.rgb[0]*255,
    //         colorPicker.elt.color.rgb[1]*255,
    //         colorPicker.elt.color.rgb[2]*255
    //         );

    //pmouseX and pmouseY give you the previous mouse position
    line(pmouseX, pmouseY, mouseX, mouseY);

}

//TASK: set up a paint bucket, eraser, and two new brushes
//each one should have its own function

//--------------------------
// Event Listeners
//--------------------------

function fillBackground(){
  background("#"+colorPicker.value());
}

function eraseDrawing(){
  strokeWeight(brushSize.value());
  stroke("white");
  line(pmouseX, pmouseY, mouseX, mouseY);
}

function drawPumpkin(){
  imageMode(CENTER);
  image(pumpkin,mouseX,mouseY, pumpkin.width, pumpkin.height);
}

function sprayCan(){
  for(var i = 0; i< 30; i++){
    noStroke();
    fill("#"+colorPicker.value());
    ellipse (random(mouseX-brushSize.value(),mouseX+brushSize.value()), random(mouseY-brushSize.value(),mouseY+brushSize.value()),2,2);
  }

}

function changeBrush(){
    //This takes the name of the drop-down item you selected
    //and saves it as a string to the brushType variable.
    //There's no need to edit this function for you assignment
    brushType = brushPicker.value();
}

function saveFunction() {
    save(drawingCanvas, "myDrawing.jpg");
}

//TASK: set up clear button function
function clearFunction(){
    clear (drawingCanvas);
    background("white");
}
