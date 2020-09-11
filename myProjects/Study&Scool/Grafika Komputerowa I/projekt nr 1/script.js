var myCanvas;
var context;

function Circle(color)
{
    this.X = 0;
    this.Y = 0;
    this.R = 1;
    this.Color = color;

    this.display = function(p1, p2, corner)
    {
        context.fillStyle = this.Color;
        context.beginPath();
        context.rotate(corner * Math.PI/180);
        context.arc(this.X, this.Y, this.R, p1, p2);
        context.fill();
    }
    this.setReferencePoint = function(x, y)
    {
        this.X0 = x;
        this.Y0 = y;
    }
}

function Rect(color)
{
    this.X = 0;
    this.Y = 0;
    this.W = 1;
    this.H = 1;
    this.Color = color;

    this.display = function()
    {
        context.fillStyle = this.Color;
        context.beginPath();
        context.fillRect(this.X, this.Y, this.W, this.H);
    }
    this.setReferencePoint = function(x, y)
    {
        this.X0 = x;
        this.Y0 = y;
    }
}

function drawRect(x, y, width, height, color)
{
    rect = new Rect(color);
    rect.scaleX = width;
    rect.scaleY = height;
    rect.setReferencePoint(x, y);
    reDrawRect();
}

function drawCircle(x, y, width, height, color, p1 = 0, p2 = 2*Math.PI, corner = 0)
{
    circle = new Circle(color);
    circle.scaleX = width;
    circle.scaleY = height;
    circle.setReferencePoint(x, y);
    reDrawCircle(p1, p2, corner);
}


function reDrawRect()
{
    context.save();
        context.transform( rect.scaleX, 0, 0, rect.scaleY, rect.X0, rect.Y0 );
        rect.display();
    context.restore();
}

function reDrawCircle(p1, p2, corner)
{
    context.save();
        context.transform( circle.scaleX, 0, 0, circle.scaleY, circle.X0, circle.Y0 );
        circle.display(p1, p2, corner);
    context.restore();
}



var myControls = new function() {
    this.carRight = 2;
    this.carLeft = 2;
}


var posy = [0, 200, 400, 600];
var carPosy = -200;
var counterColor = 0;
var counterCar = 1;
var colorArray = ['#0f00ff','#a6c387', '#7a6753','#212c3d',' #1abc9c'];
var treePosx = Math.floor(Math.random() * (180 - 30)) + 30;
var treePosy = 200;
var streetPosy = -300;

function animation()
{
    requestAnimationFrame(animation);
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);

    //droga

    var width = 350;
    var height = myCanvas.height;
    var x = (myCanvas.width / 2) - (width / 2);
    var y = 0;
    drawRect(x, y, width , height, '#555555');
    var streetWidth = width; //szerokosc drogi
    var streetPosx = x;

    // pasy drogowe

    width = 10;
    x = (myCanvas.width / 2) - (width / 2);
    height = 100;
    for (let i = 0; i < posy.length; i++)
    {
        drawRect(x, posy[i], width, height,'white');
        posy[i] += myControls.carRight;
        if (posy[i] >= myCanvas.height) posy[i] = -100;
    }

    //samochod

    height = 150;
    width = 120;
    x = (myCanvas.width / 2) + (streetWidth / 4) - (width / 2);
    y = 300;
    drawRect(x, y, width, height,'red');
    y += 20;
    height = 35;
    drawRect(x, y, width, height,'#44ffff'); // duża szyba
    var carWidth = width;

    y += 110;
    height = 5;
    drawRect(x, y, width, height,'#44ffff'); // mała szyba

    x += carWidth / 4;
    y -= 130;
    var r = 5;
    drawCircle(x, y, 2*r, r, 'yellow', Math.PI, 0);
    x += carWidth / 2;
    drawCircle(x, y, 2*r, r, 'yellow', Math.PI, 0);

    //drugi samochod

    x = (myCanvas.width / 2) - (width / 2) - (streetWidth / 4) ;
    height = 150;
    drawRect(x, carPosy, width, height,colorArray[counterColor]);
    carPosy += myControls.carRight + myControls.carLeft;
    if (carPosy >= myCanvas.height) 
    {
        carPosy = -1000;
        counterColor++;
        if (counterColor >= colorArray.length) counterColor = 0;
    }
    
    y = carPosy + height - 55;
    height = 35;
    drawRect(x, y, width, height,'#44ffff'); // duża szyba

    y -= 85;
    height = 5;
    drawRect(x, y, width, height,'#44ffff'); // mała szyba
    x += carWidth / 4;
    y = carPosy + 150;
    drawCircle(x, y, 2*r, r, 'yellow', 0, Math.PI);
    x += carWidth / 2;
    drawCircle(x, y, 2*r, r, 'yellow', 0, Math.PI);

    //drzewa
    
    width = 30
    height = 300;
    drawRect(treePosx, treePosy, width, height,'#744b24'); // pień

    x = treePosx + width / 2;
    r = width * 3;
    drawCircle(x, treePosy, r, 1.75 * r, '#2b4821'); // liście

    treePosy+=myControls.carRight;
    if (treePosy - (1.75 * r) >= myCanvas.height)
    {
        treePosy = -300;
        treePosx = Math.floor(Math.random() * (180 - 30)) + 30;
    }

    //droga boczna

    x = streetPosx + streetWidth;
    y = streetPosy;
    width = myCanvas.width - x;
    height = 300;
    drawRect(x, y, width , height, '#555555');
    var streetWidthv2 = height; //szerokosc drugiej drogi
    streetPosy+=myControls.carRight;

    y +=  height/2 - 5;
    height = 5;
    drawRect(x, y, width , height, 'white');

    y += 10;
    drawRect(x, y, width , height, 'white');

    if (streetPosy >= myCanvas.height) 
    {
        streetPosy = -1500;
        counterCar++;
        if (counterCar > 3 ) counterCar = 1;
    }

    //Samochód przy bocznej drodze

    if (counterCar == 1)
    {
        height = 120;
        width = 150;
        x += 10;
        y = streetPosy + (streetWidthv2 / 4) - (height / 2);
        drawRect(x, y, width, height,'#263f5b');
        x += 30;
        width = 30;
        drawRect(x, y, width, height,'#44ffff'); // duża szyba
        carWidth = height;
    
        x += 100;
        width = 5;
        drawRect(x, y, width, height,'#44ffff'); // mała szyba
    
        y += carWidth / 4;
        x -= 130;
        r = 5;
        drawCircle(x, y, r, 2*r, 'yellow', Math.PI, 0, 270);
        y += carWidth / 2;
        drawCircle(x, y, r, 2*r, 'yellow', Math.PI, 2 * Math.PI, 270);
    }
}

function draw()
{
    var myGUI = new dat.GUI();
    var speedFolder = myGUI.addFolder( 'Speed' );
    speedFolder.add( myControls, 'carRight', 0, 5 ).listen( );
    speedFolder.add( myControls, 'carLeft', 0, 5 ).listen( );
    speedFolder.open();
    myCanvas = document.getElementById("myCanvas")
    context = myCanvas.getContext("2d");
    animation();
}