class Tower
{
    constructor(x,y,w,h)
    {
        var options = {
            isStatic: true,
        }
        this.body = Bodies.rectangle(x,y,w,h,options);
        this.w =w
        this.h = h
        this.image = loadImage('assets/tower.png');
        World.add(myWorld , this.body);
    }

    display()
    {
        /*1st
        var pos = this.body.position
        rectMode(CENTER);
        rect(pos.x,pos.y,this.w,this.h);

        */

        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.w,this.h);
        pop();
    }
}