class Cannon
{

    constructor(x,y,w,h,angle)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = angle;

    }

    display()
    {
        if(keyIsDown(RIGHT_ARROW) && this.angle < 0.7)
        {
            this.angle +=0.02;
        }

        if(keyIsDown(LEFT_ARROW)&& this.angle>-1.435 )
        {
            this.angle -= 0.02;
        }
        //console.log(this.angle);


        fill("grey");
        push();
        //shooter -> rect
        translate(this.x+40, this.y)
        rotate(this.angle);
        rect(-35,-30, this.w, this.h)
        pop();
        //cannon base -> arc
        arc(this.x-30, this.y+80, 160, 230, PI, TWO_PI);

    
    }
}