document.addEventListener('DOMContentLoaded', () => {
    // Game canvas setup
    const gameBoard = document.getElementById('game-board');
    const ctx = gameBoard.getContext('2d');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('start-btn');
    const resetButton = document.getElementById('reset-btn');

    // Game settings
    const gridSize = 20;
    const tileCount = 20;
    gameBoard.width = tileCount * gridSize;
    gameBoard.height = tileCount * gridSize;

    // Game state
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let score = 0;
    let gameSpeed = 150; // milliseconds
    let gameInterval;
    let gameRunning = false;
    let gameOver = false;

    // Colors
    const snakeHeadColor = '#4CAF50';
    const snakeBodyColor = '#388E3C';
    const foodColor = '#F44336';
    const gridColor = '#333';

    // Initialize game
    function initGame() {
        // Reset game state
        snake = [
            { x: 5, y: 10 },
            { x: 4, y: 10 },
            { x: 3, y: 10 }
        ];
        direction = 'right';
        nextDirection = 'right';
        score = 0;
        gameSpeed = 150;
        gameOver = false;
        scoreElement.textContent = score;

        // Generate initial food
        generateFood();

        // Draw initial state
        draw();
    }

    // Generate food at random position
    function generateFood() {
        // Generate random coordinates
        let newFoodX, newFoodY;
        let foodOnSnake;

        do {
            foodOnSnake = false;
            newFoodX = Math.floor(Math.random() * tileCount);
            newFoodY = Math.floor(Math.random() * tileCount);

            // Check if food is on snake
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === newFoodX && snake[i].y === newFoodY) {
                    foodOnSnake = true;
                    break;
                }
            }
        } while (foodOnSnake);

        food = {
            x: newFoodX,
            y: newFoodY
        };
    }

    // Draw everything on canvas
    function draw() {
        // Clear canvas
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);

        // Draw grid
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;

        for (let i = 0; i <= tileCount; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(i * gridSize, 0);
            ctx.lineTo(i * gridSize, gameBoard.height);
            ctx.stroke();

            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, i * gridSize);
            ctx.lineTo(gameBoard.width, i * gridSize);
            ctx.stroke();
        }

        // Draw food
        ctx.fillStyle = foodColor;
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            // Use different color for head
            if (i === 0) {
                ctx.fillStyle = snakeHeadColor;
            } else {
                ctx.fillStyle = snakeBodyColor;
            }

            ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);

            // Add border to snake segments
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 1;
            ctx.strokeRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
        }

        // Draw game over message
        if (gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);

            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over!', gameBoard.width / 2, gameBoard.height / 2);

            ctx.font = '20px Arial';
            ctx.fillText(`Score: ${score}`, gameBoard.width / 2, gameBoard.height / 2 + 40);
            ctx.fillText('Press Reset to play again', gameBoard.width / 2, gameBoard.height / 2 + 80);
        }
    }

    // Update game state
    function update() {
        if (gameOver) return;

        // Update direction
        direction = nextDirection;

        // Create new head based on direction
        const head = { x: snake[0].x, y: snake[0].y };

        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Check for collisions
        if (checkCollision(head)) {
            gameOver = true;
            stopGame();
            draw();
            return;
        }

        // Add new head to snake
        snake.unshift(head);

        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
            // Increase score
            score += 10;
            scoreElement.textContent = score;

            // Generate new food
            generateFood();

            // Increase speed slightly
            if (gameSpeed > 50) {
                gameSpeed -= 5;
                // Restart interval with new speed
                if (gameRunning) {
                    clearInterval(gameInterval);
                    gameInterval = setInterval(gameLoop, gameSpeed);
                }
            }
        } else {
            // Remove tail if no food was eaten
            snake.pop();
        }
    }

    // Check for collisions
    function checkCollision(head) {
        // Check wall collision
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            return true;
        }

        // Check self collision (skip the last element as it will be removed)
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }

        return false;
    }

    // Game loop
    function gameLoop() {
        update();
        draw();
    }

    // Start game
    function startGame() {
        if (!gameRunning && !gameOver) {
            gameRunning = true;
            startButton.textContent = 'Pause';
            gameInterval = setInterval(gameLoop, gameSpeed);
        } else if (gameRunning) {
            // Pause game
            gameRunning = false;
            startButton.textContent = 'Resume';
            clearInterval(gameInterval);
        } else if (gameOver) {
            // Reset and start if game over
            resetGame();
            startGame();
        }
    }

    // Stop game
    function stopGame() {
        gameRunning = false;
        startButton.textContent = 'Start Game';
        clearInterval(gameInterval);
    }

    // Reset game
    function resetGame() {
        stopGame();
        initGame();
    }

    // Handle keyboard input
    function handleKeyDown(e) {
        // Prevent default behavior for arrow keys
        if ([37, 38, 39, 40].includes(e.keyCode)) {
            e.preventDefault();
        }

        // Update direction based on key press
        // Prevent 180-degree turns
        switch (e.keyCode) {
            case 38: // Up arrow
            case 87: // W key
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 40: // Down arrow
            case 83: // S key
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 37: // Left arrow
            case 65: // A key
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 39: // Right arrow
            case 68: // D key
                if (direction !== 'left') nextDirection = 'right';
                break;
            case 32: // Space bar
                // Toggle game start/pause
                startGame();
                break;
        }
    }

    // Event listeners
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
    document.addEventListener('keydown', handleKeyDown);

    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    gameBoard.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        e.preventDefault();
    }, { passive: false });

    gameBoard.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    gameBoard.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        
        // Determine swipe direction based on which axis had the larger change
        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (dx > 0 && direction !== 'left') {
                nextDirection = 'right';
            } else if (dx < 0 && direction !== 'right') {
                nextDirection = 'left';
            }
        } else {
            // Vertical swipe
            if (dy > 0 && direction !== 'up') {
                nextDirection = 'down';
            } else if (dy < 0 && direction !== 'down') {
                nextDirection = 'up';
            }
        }
        
        e.preventDefault();
    }, { passive: false });

    // Initialize game on load
    initGame();
});