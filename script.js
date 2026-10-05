const canvas =document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake;
let direction;
let score;
let food;
let game;
function startGame() {
    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];
    direction = "RIGHT";
    score = 0;
    document.getElementById("score")
        .style.display = "block";
    document.getElementById("score")
        .innerText = "Score: 0";
    canvas.style.display =
                "inline-block";
    document.getElementById("gameOver")
        .style.display = "none";
createFood();
    game =
        setInterval(gameLoop, 100);

}
document.addEventListener(
            "keydown",
            changeDirection
);
function changeDirection(event) {
    if (
        event.key === "ArrowUp" &&
        direction !== "DOWN"
    ) {
        direction = "UP";
    }
    else if (
        event.key === "ArrowDown" &&
        direction !== "UP"
    ) {
        direction = "DOWN";
    }
    else if (
        event.key === "ArrowLeft" &&
        direction !== "RIGHT"
    ) {
        direction = "LEFT";
    }
    else if (
        event.key === "ArrowRight" &&
        direction !== "LEFT"
    ) {
        direction = "RIGHT";

    }
}
function drawSnake() {
    snake.forEach(
        (part, index) => {
            if (index === 0) {
                ctx.fillStyle =
                            "lime";
            }
            else {
                ctx.fillStyle =
                           "green";
           }
                ctx.fillRect(
                part.x,
                part.y,
                box,
                box
                );

        }
    );
}
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(
        food.x,
        food.y,
        box,
        box
    );
}
function moveSnake() {
    let head = {
        x: snake[0].x,
        y: snake[0].y
    };
    if (direction === "UP") {
        head.y -= box;
    }
    if (direction === "DOWN") {
        head.y += box;
    }
    if (direction === "LEFT") {
        head.x -= box;
    }
    if (direction === "RIGHT") {
         head.x += box;
    }
    snake.unshift(head);
    if (
         head.x === food.x &&
        head.y === food.y
    ) {
        score++;
        document.getElementById("score")
            .innerText =
            "Score: " + score;
            createFood();
    }
    else {
        snake.pop();
    }
}
function createFood() {
    food = {
        x:
            Math.floor(
             Math.random() *
            (canvas.width / box)
            ) * box,
        y:
            Math.floor(
            Math.random() *
            (canvas.height / box)
            ) * box
    };
}
function checkCollision() {
    let head = snake[0];
     if (
            head.x < 0 ||
            head.x >= canvas.width ||
            head.y < 0 ||
            head.y >= canvas.height
       ) {
             return true;
        }
        for (
            let i = 1;
            i < snake.length;
            i++
         ) {
        if (
             head.x === snake[i].x &&
            head.y === snake[i].y
        ) {
            return true;
        }
        }
        return false;
}
function gameLoop() {
         ctx.clearRect(
         0,
        0,
        canvas.width,
        canvas.height
        );
         moveSnake();
        if (checkCollision()) {
            gameOver();
             return;
         }
        drawFood();
        drawSnake();
}
function gameOver() {
    clearInterval(game);
    document.getElementById("score")
        .style.display = "none";
     canvas.style.display = "none";
    document.getElementById("finalScore")
        .innerText =
        "🏆 Final Score: " + score;
    document.getElementById("gameOver")
        .style.display = "block";
}
    document.getElementById("restartBtn")
    .addEventListener(
    "click",
    function () {
        startGame();
    }
);
startGame();