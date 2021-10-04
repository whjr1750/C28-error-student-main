class Pirates
{
    constructor(x,y,w,h,boatPos,boatAnimation)
    {

        var options ={
            restitution: 0.89,
            friction:1,
            density: 1
        }
      
        this.body= Bodies.rectangle(x,y,w,h, options);
        this.w = w;
        this.h = h;

        this.animation = boatAnimation;
        this.speed = 0.05;
        this.boatPosition = boatPos
        this.image = loadImage('assets/boat.png');
        World.add(myWorld,this.body);
    }

    //animate the image with certain amount of speed
    animate()
    {
          this.speed += 0.05;
         // console.log(this.speed)
    }



    display()
    {
        var pos = this.body.position;

        //floor  round off to lowest integer value 1.4 = 1
        //1.9 = 1
        var index = floor(this.speed%4)
        //0,1,2,3

        push();
        imageMode(CENTER);
       // image(this.image,pos.x,this.boatPosition,this.w,this.h);
       image(this.animation[index],pos.x,this.boatPosition,this.w,this.h);

        pop();
    }

    remove(index)
    {

        this.animation = brokenBoatanimation;
        this.speed = 0.05;
        // this.width = 1000;
        // this.height = 1000;
        this.w = 300,
        this.h = 300,
        this.isBroken = true;

   
        setTimeout(()=>
        {
            Matter.World.remove(myWorld,boats[index].body);
            boats.splice(index,1);
        },2000)

        
  
    }
}