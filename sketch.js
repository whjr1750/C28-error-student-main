const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Render= Matter.Render;

var myEngine, myWorld;
var ground;
var tower, towerImg;
var backgroundImg;
var cannon;
var angle;
var cannonBall,cannonBallImg;
var boatImg;
var boat;

//empty array
var balls = [];
var boats= [];

var boatAnimation = [];
var boatSpritesheet, boatspritedata, boatFrames;
var brokenBoatanimation= [];
var brokenboatSheet, brokenboatdata, brokenboatframes;
var waterSplashanimation=[];
var waterSplashSheet, waterSplashData, waterSplashframes;

function preload()
{

    towerImg = loadImage('assets/tower.png');
    backgroundImg = loadImage('assets/background.gif');
    cannonBallImg = loadImage("assets/cannonball.png");
    boatImg= loadImage('assets/boat.png');

    boatspritedata = loadJSON('assets/boat/boat.json')
    boatSpritesheet = loadImage('assets/boat/boat.png');

    brokenboatdata = loadJSON('assets/boat/broken_boat.json');
    brokenboatSheet = loadImage('assets/boat/broken_boat.png');

    waterSplashData = loadJSON('assets/water_splash/water_splash.json');
    waterSplashSheet = loadImage('assets/water_splash/water_splash.png');
}

function setup(){
    createCanvas(1200,600);
    myEngine = Engine.create();
    myWorld = myEngine.world;

    ground = new Ground(600,height-1,1200,40);

    tower = new Tower(150,height-250,180,330);

  //  cannon = new Cannon(170, 110, 100, 50);
  angle = -PI/4;
  cannon = new Cannon(185, 130, 120, 60,angle);

 // cannonBall = new CannonBall(cannon.x, cannon.y, 40)

// boat= new Pirates(width-100,height-100,200,200);


/*var render = Render.create({
    element: document.body,
    engine: myEngine,
    options: {
        width: 1200,
        height: 600,
        wireframes: false
    }
});
Render.run(render);*/

 boatFrames = boatspritedata.frames;

 for(var i =0; i<boatFrames.length; i++)
 {
       var pos = boatFrames[i].position;
       //get() helps the computer to extract the position of the image from the json and fetch the image from the .png
       var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);

       boatAnimation.push(img)
 }
 
 brokenboatframes = brokenboatdata.frames;

 for(var j = 0; j<brokenboatframes.length;j++)
 {
     //error in line 92 i is present
     var pos = brokenboatframes[j].position;
     var img= brokenboatSheet.get(pos.x,pos.y,pos.w,pos.h)
     
     brokenBoatanimation.push(img);
 }

 waterSplashframes = waterSplashData.frames;
 for(var a = 0;a<waterSplashframes.length;a++)
 {
     var pos = waterSplashframes[a].position;
     var img = waterSplashSheet.get(pos.x,pos.y,pos.w,pos.h);
     waterSplashanimation.push(img);
 }
}

function draw(){
    background(backgroundImg);
    Engine.update(myEngine);
    ground.display();
    tower.display();
    cannon.display();
    
 /*  Body.setVelocity(boat.body,{
    x: -0.89,
    y:0
})

boat.display();

*/
   // cannonBall.display();
    
   for(var i= 0; i<balls.length; i++)
   {
    showCannonBalls(balls[i], i);
    
     for(var j=0; j<boats.length; j++)
     {
           if(balls[i] !== undefined && boats[j] !==undefined)
            {
                 var collision = Matter.SAT.collides(balls[i].body, boats[j].body)
                 
                 if(collision.collided)
                 {

                    if(!boats[j].isBroken && !balls[i].isSink )
                    {
                        boats[j].remove(j);
                        j--;
                    }
                     

                     World.remove(myWorld,balls[i].body)
                    // balls.splice(i,1);
                    delete balls[i];
                     i--;
                   // [b1,b2,b4,b5]
                    // i =3 
                 }
                }
        }
   }

   showBoats();

}

//ball -> cannonball
function showCannonBalls(ball, index)
{
    if(ball)
    {
        ball.display();

        ball.animate();

            if(ball.body.position.x >=width || ball.body.position.y >= height -100)
            {
                //forgot the if 
                if(!ball.isSink)
                {
                ball.remove(index);
            // Matter.World.remove(myWorld, ball.body);
                //array
                //balls.splice(index,1);
            }
   
        }
    
    }

}

function keyPressed()
{
    if(keyCode === DOWN_ARROW)
    {
         var cannonBall = new CannonBall(cannon.x, cannon.y,40);
          balls.push(cannonBall);
    }
}


function keyReleased()
{
    if(keyCode === DOWN_ARROW)
    {
        //when you are not declaring the variable inside the keyPressed then use this instruction
       // cannonBall.shoot();
  
       //when you are declaring the variable inside the line 67

       balls[balls.length-1].shoot();
    }
}

function showBoats()
{
  if(boats.length > 0)
  {
      //to create 2nd, 3rd and 4th boat 

      if(boats.length < 4 && boats[boats.length -1].body.position.x < width -300 )
      {
            var position = [height -120,height-190, height-155];
            var position = random(position);
            var boat = new Pirates(width, height-100, 190, 190, position, boatAnimation);
            boats.push(boat)
      }

      for(var i = 0; i< boats.length; i++)
      {
          Body.setVelocity(boats[i].body, {x:-0.70, y:0});
          boats[i].display();
          boats[i].animate();
      }

  }

  else{

    //to create the 1st boat
    var boat = new Pirates(width, height -100, 190, 190, height -120, boatAnimation);
    boats.push(boat)
  }

}