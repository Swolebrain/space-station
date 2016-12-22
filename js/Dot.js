export default class Dot{
  constructor(xpos, ypos){
    this.x = xpos || Math.random()*window.innerWidth;
    this.y = ypos || Math.random()*window.innerHeight;
    this.radius = 1 + Math.random();
    this.percentWhite = this.radius/1.85;
    this.white255 = Number(Math.min(220, Math.round(this.percentWhite * 255))).toString(16);
    this.velX = (Math.random()*this.percentWhite)*2.5;
    this.velY = 0;
    this.color = "#"+ this.white255 +this.white255 + this.white255;
    this.ticks = 0;
  }
  update(){
    this.ticks++;
    this.x += this.velX;
    this.y += this.velY;
  }
  render(ctx){
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2*Math.PI);
    ctx.fill();
    //ctx.fillRect(this.x, this.y, 5,5)
    ctx.restore();
  }
  isOutOfBounds(){
    return this.x > window.innerWidth ||
            this.x < 0 ||
            this.y > window.innerHeight ||
            this.y < 0;
  }
}
