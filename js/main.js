var canvas = document.getElementById('scene');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var radius = Math.min(canvas.width, canvas.height);
var w = canvas.width;
var h = canvas.height;
var satellites = {};
ctx.font = "12px Verdana";
import Dot from './Dot';
import DotCreator from './DotCreator';
var dc = new DotCreator();

var circle = function(color, r) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();
}

var i = 0;
var redraw = function() {
    ctx.save();

    // paint bg
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    dc.update();
    dc.render(ctx);

    // set origin to center
    ctx.translate(w / 2, h / 2);

    // draw earth
    circle('#1C90F3', 100);


    // draw satellite 1
    drawSatellites(i);

    ctx.restore();

    i++;

    window.requestAnimationFrame(redraw);
}

function drawSatellites(i){
  var ctr = 0;
  for (var satellite in satellites){
    ctr++;
    ctx.rotate(i*ctr / 100);
    ctx.translate(150, 0);
    circle('#4a4a4f', 8);
    ctx.rotate(-i*ctr / 100);
    ctx.fillStyle="white";
    satellites[satellite].forEach((name,idx)=>ctx.fillText(name, -50, (1+idx)*12));

  }
}

function loadSatellites(people){
  people.forEach(person=>{
    if (!satellites[person.craft])
      satellites[person.craft] = [];
    satellites[person.craft].push(person.name);
  });
}

var xhr = new XMLHttpRequest();
xhr.onload = function(){
    loadSatellites(JSON.parse(this.response).people);
    window.requestAnimationFrame(redraw);
}
xhr.open("GET", "http://api.open-notify.org/astros.json");
xhr.send();
