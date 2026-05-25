var canvas, context, ball, player, timer, interval = 1000/60;
var frictionX = 1;
var frictionY = 1;
var gravity = 0.5;

var Score = 0;

var d = false;
var a = false;

canvas = document.getElementById("canvas")
context = canvas.getContext("2d")

context.font = "bold 40px Arial"
context.fillstyle = "black"

///////FUCNTIONS!!!

function rand(low, high)
{
		return Math.random() * (high - low) + low;
}

////////FUNCTIONS!!!

player = new GameObject( canvas.width/2 , 700, 50, 50,"#000000")
player.pivotx = -25


/////SQUARE STUFF
var squares = [];
var squaresConfigs = 
    [
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(9, 255, 0)", points: 1},  
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(9, 255, 0)", points: 1},
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(9, 255, 0)", points: 1},
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(9, 255, 0)", points: 1},
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(9, 255, 0)", points: 1}  
    ];

for (var i = 0; i < squaresConfigs.length; i++) 
{
    var config = squaresConfigs[i];
    var square = new GameObject(config.x, config.y, 30, 30, config.color);
    
    square.points = config.points;
    square.bounceForce = config.bounceForce;

    square.vy = rand(4,7)
    
    squares.push(square);
}


/////CIRCLE STUFF
var circles = [];
var circlesConfigs = 
    [
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(255, 0, 0)"},  
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(255, 0, 0)"},
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(255, 0, 0)"},
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(255, 0, 0)"},
        { x: rand(0,750), y: rand(-400,-30), color: "rgb(255, 0, 0)"}  
    ];

for (var i = 0; i < circlesConfigs.length; i++) 
{
    var config = circlesConfigs[i];
    var circle = new GameObject(config.x, config.y, 50, 50, config.color);
    
    circle.points = config.points;
    circle.bounceForce = config.bounceForce;

    circle.vy = rand(6,9)
    
    circles.push(circle);
}



timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    doHandleAcceleration();
    doApplyFriction();

    player.move();

    if (player.x < canvas.width/2 -500)
        {
            player.x = canvas.width/2 - 500
            if (player.vx < 0) player.vx = 0;
        }
    if (player.x > canvas.width/2 + 500)
        {
            player.x = canvas.width/2 + 500
            if (player.vx > 0) player.vx = 0;
        }

    function doHandleAcceleration () 
        {
            if (d) {
                player.vx += player.ax * player.force;
            }

            if (a) {
                player.vx += player.ax * -player.force;
            }
        }

    //SQUARE COLLISION AND MOVEMENT
    for (var i = 0; i < squares.length; i++)
        {
            var currentSquare = squares[i];

            currentSquare.y += currentSquare.vy;

            if (currentSquare.y > canvas.height) 
            {
                currentSquare.y = -100;            
                currentSquare.x = rand(0, 750); 
                currentSquare.vy = rand(4, 7);   
            }

            if (player.collisionCheck(currentSquare))
            {
                
                player.color = "lime"

                setTimeout(function() 
                {player.color = "#000000";}, 2000);

                Score += currentSquare.points;
                currentSquare.y = -30;            
                currentSquare.x = rand(100, 800); 
                currentSquare.vy = rand(4, 7);   
            }

        }

    //CIRCLE COLLISION AND MOVEMENT
    for (var i = 0; i < circles.length; i++) 
        {
            var currentCircle = circles[i];

            currentCircle.y += currentCircle.vy;

            if (currentCircle.y > canvas.height) 
            {
                currentCircle.y = -30;            
                currentCircle.x = rand(100, 800); 
                currentCircle.vy = rand(6, 9);    
            }

            if (player.collisionCheck(currentCircle))
            {
                Score = 0;

                player.color = "red"

                for (var j = 0; j < squares.length; j++)
                {
                    squares[j].y = -100;
                    squares[j].x = rand(0, 1200);
                    squares[j].vy = rand(4, 7);
                }

                for (var k = 0; k < circles.length; k++) 
                {
                    circles[k].y = -100;
                    circles[k].x = rand(0, 750);
                    circles[k].vy = rand(6, 9);
                }

                setTimeout(function() 
                {player.color = "#000000";}, 2000);
            }
        }

    function doApplyFriction()
        {
            player.vx *= 0.93;
        }

    player.drawRect();

    for (var i = 0; i < squares.length; i++) 
        {
            squares[i].drawRect();
        }
    for (var i = 0; i < circles.length; i++) 
        {
            circles[i].drawCircle();
        }
        
        context.fillText("Score: " + Score, 40, 60);
}

