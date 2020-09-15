$(document).ready(function(){
    var snake_width = 10;
    var snake_height = 10;
    var foodWidth = 10;
    var foodHeight = 10;
    var snake = [{x:250, y:250}, {x: 240, y:250}, {x:230, y:250}];
    var foodFill = "red";
    var foodStroke = "black";
    var dx = 10;
    var dy = 0;
    var eatingSound = new Audio("eatingSound.mp3");
    var gameLost = new Audio("gameLost.mp3");
    var speedLengthComparator = 0;
    var speed = 100;
    var score = 0;
    var once = 0;
    var foodx,foody;
    var snake_fill = "rgb(49, 130, 197)";
    var snake_stroke = "white";
    board_background = "black";
    board_border = "white";
    var board = $("#board")[0];
    var ctx = board.getContext("2d");
    ctx.fillStyle = board_background;
    ctx.strokestyle = board_border;
    ctx.fillRect(0, 0, board.width, board.height);
    ctx.strokeRect(0, 0, board.width, board.height);
    var first = 0;
    printSnake();
    createFood();
    advanceSnake();
    function printSnake()
    {
        snake.forEach(printSnakePart);
    }
    function printSnakePart(item)
    {
        ctx.fillStyle = snake_fill;
        ctx.strokestyle = snake_stroke;
        ctx.fillRect(item.x, item.y, snake_width, snake_height);
        ctx.strokeRect(item.x, item.y, snake_width,snake_height);
    }
    addEventListener("keydown", changeDirection);
    main();
    function main()
    {
        setTimeout(function(){
            clearBoard();
            advanceSnake();
            printSnake();
            shouldSpeenIncrease();
            if(!didGameEnd())
            main();
        },speed);
    }
    function clearBoard()
    {
        ctx.fillStyle = board_background;
        ctx.strokestyle = board_border;
        ctx.fillRect(0, 0, board.width, board.height);
        ctx.strokeRect(0, 0, board.width, board.height);   
    }
    function advanceSnake()
    {
        const head = {x: snake[first].x+dx, y: snake[first].y+dy};
        snake.unshift(head);
        if(snake[first].x == foodx && snake[first].y == foody)
            {
                createFood();
                increaseSnake();
                score+=1;
                $("label").html(score); 
                once = 0;
            }
        else
             printfood(foodx, foody);
        snake.pop();
    }
    function didGameEnd()
    {
        if(snake[first].x >= board.width || snake[first].x < 0 || snake[first].y >= board.height || snake[first].y < 0)
            {
                gameLost.play();
                $("#over").fadeIn(400);
                return true;
            }
        for(let i=1;i<snake.length;i++)
        {
            if(snake[i].x == snake[first].x && snake[i].y == snake[first].y)
            {
                gameLost.play();
                $("#over").fadeIn(400);
                return true;
            }
        }
        return false;        
    }
    function createFood()
    {
        eatingSound.play();
        foodx = randpos();
        foody = randpos();
        if(foodx == snake[first].x && foody == snake[first].y)
        createFood();
        printfood(foodx, foody);
    }
    function randpos()
    {
        return Math.floor(Math.random()*60)*10;
    }
    function increaseSnake()
    {
        var newx = snake[first].x+dx;
        var newy = snake[first].y+dy;
        snake.push({x: newx, y: newy});
    }
    function printfood(x, y)
    {
        ctx.fillStyle = foodFill;
        ctx.strokestyle = foodStroke;
        ctx.fillRect(x, y, foodWidth, foodHeight);
        ctx.strokeRect(x, y, foodWidth, foodHeight);
    }
    function shouldSpeenIncrease()
    {
        if(snake.length % 2 === 0 && once == 0)
        {
            once = 1;
            speedLengthComparator += 1;
            speed = speed - (speedLengthComparator);
        } 
    }
    function changeDirection(event)
    {
        const leftKey=37;
        const upKey=38;
        const rightKey=39;
        const downKey=40;
        const a = 65;
        const s = 83;
        const d = 68;
        const w = 87;
        var keypress = event.keyCode;
        var goingup = dy === -10;
        var goingdown = dy === 10;
        var goingleft = dx === -10;
        var goingright = dx === 10;
        if((keypress === leftKey || keypress === a) && !goingright)
        {
            dx = -10;
            dy = 0;
        }
        if((keypress === rightKey || keypress === d) && !goingleft)
        {
            dx = 10;
            dy = 0;
        }
        if((keypress === upKey || keypress === w) && !goingdown)
        {
            dx = 0;
            dy = -10;
        }
        if((keypress === downKey || keypress === s) && !goingup)
        {
            dx = 0;
            dy = 10;
        }
    }

});
