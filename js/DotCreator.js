import Dot from './Dot';

export default class DotCreator{
  constructor(numDots){
    this.dots = [];
    numDots = numDots || 200;
    for (let i =0; i < numDots; i++){
      this.dots.push(new Dot());
    }
  }
  update(){
    this.dots.forEach((dot, index)=>{
      dot.update()
      if (dot.isOutOfBounds()){
        this.dots[index] = new Dot(1, Math.random()*window.innerHeight);
      }
    });
  }
  render(ctx){
    this.dots.forEach(dot=>dot.render(ctx));
  }
}
