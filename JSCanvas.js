
var Rings = [];     //making an array of Rings
var Canvas = null;  
var Context = null;
var TimerID = false;    //Initially setting the  timer to false
var timerID = 0;

window.onload = function () {
    Canvas = document.getElementById("can");
    Context = Canvas.getContext("2d");  //getContext() is a built-in HTML object with properties and methods for drawing
    Context.lineWidth = 10; // lineWidth
    //Sets or returns the color to use for the shadows
    Context.shadowColor = "black";
    //sets the blur leve; for shadows
    Context.shadowBlur = 20;

    document.getElementById("btnAdd").onclick = AddRing;
    document.getElementById("btnRemove").onclick = RemoveRing;
    document.getElementById("btnAuto").onclick = Auto;
};

function Ring() {
    this.size = 50; //radius
    this.lineWidth = 10;
    var r = parseInt(Math.random() * 256);
    var g = parseInt(Math.random() * 256);
    var b = parseInt(Math.random() * 256);
    this.color = "rgb(" + r + "," + g + "," + b + ")";
    this.x = parseInt(Math.random() * (Canvas.width - this.size * 2  - this.lineWidth))
            + this.size + this.lineWidth / 2;
    this.y = parseInt(Math.random() * (Canvas.height - this.size * 2 - this.lineWidth))
            + this.size + this.lineWidth / 2;
    this.vx = Math.random() * 3 + 3;
    this.vy = Math.random() * 3 + 3;
}

Ring.prototype.Move = function () {

    if ((this.x + this.vx) < (this.size + this.lineWidth / 2) ||
            (this.x + this.vx) > (Canvas.width - this.size - this.lineWidth / 2))
    {
        this.vx = -1 * this.vx;
    }

    if ((this.y + this.vy) < (this.size + this.lineWidth / 2) ||
            (this.y + this.vy) > (Canvas.height - this.size - this.lineWidth / 2))
    {
        this.vy = -1 * this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;
};

function AddRing() {
    Rings.push(new Ring());
    Show();
    document.getElementById("tbxCount").value = Rings.length + " rings";
}

function RemoveRing() {
    Rings.pop();
    Show();
    document.getElementById("tbxCount").value = Rings.length + " rings";
}

function Animate() {
    for (var i = 0; i < Rings.length; ++i) {
        Rings[i].Move();
    }
    Show();
}

function Show() {
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
    for (var i = 0; i < Rings.length; ++i) {
        Context.strokeStyle = Rings[i].color;
        Context.lineWidth = Rings[i].lineWidth;
        
        Context.beginPath();
        //Defining the circle with an arc(x,y,r,startAngle,endAngle)
        Context.arc(Rings[i].x, Rings[i].y, Rings[i].size, 0, 2 * Math.PI);
        //stroke method actually draws the circle
        
        Context.stroke();
    }
}

function Auto() {
    if (!TimerID)
    {
        TimerID = true;
        timerID = window.setInterval(Animate, 25);
        document.getElementById("btnAuto").innerHTML = "Stop";
    }
    else
    {
        TimerID = false;
        window.clearInterval(timerID);
        document.getElementById("btnAuto").innerHTML = "Start";
    }
}
