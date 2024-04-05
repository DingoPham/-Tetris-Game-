const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const board = [];
const bgm = document.createElement('audio');
const breakSound = document.createElement('audio');
const drop = document.createElement('audio');
let rotatedShape;

bgm.setAttribute('src' , '../sounds/');
bgm.muted = true;

breakSound.setAttribute('src' , '../sounds/');
bgm.muted = true;

breakSound.setAttribute('src' , '../sounds/');
bgm.muted = true;

for(let row = 0; row < BOARD_HEIGHT; row++){
    board[row] = [];
    for (let col = 0; col < BOARD_WIDTH; col++){
        board[row][col] = 0;
    }
}

const tetrominoes = [
    {
        shape : [
            [1,1],
            [1,1]
        ],
        color: '#ffd800'
    },
    {
        shape : [
            [0,2,0],
            [2,2,2]
        ],
        color: '#7925dd'
    },
    {
        shape : [
            [0,3,3],
            [3,3,0]
        ],
        color: 'orange'
    },
    {
        shape : [
            [4,4,0],
            [0,4,4,]
        ],
        color: 'red'
    },
    {
        shape : [
            [5,0,0],
            [5,5,5]
        ],
        color: 'green',
    },
    {
        shape : [
            [0,0,6],
            [6,6,6]
        ],
        color: '#ff6440',
    },
    {
        shape : [
            [7,7,7,7]
        ],
        color: '#00b5ff', 
    },
];

function randomTetromino(){
    const index = Math.floor(Math.random() * tetrominoes.length);
    const tetromino = tetrominoes[index];
    return{
        shape: tetromino.shape,
        color: tetromino.color,
        row: 0,
        col : Math.floor(Math.random() * (BOARD_WIDTH - tetromino.shape[0].length +1))
    };
}
 
let currentTetromino = randomTetromino();
let currentGhostTetromino;

function drawTetromino(){
    const shape = currentTetromino.shape;
    const color = currentTetromino.color;
    const row = currentTetromino.row;
    const col = currentTetromino.col;

    for(let r = 0; r < shape.length; r++){
        for(let c = 0; c < shape[r].length; c++){
            if(shape[r][c]){
                const block = document.createElement('div');
                block.classList.add('block');
                block.style.backgroundColor = color;
                block.style.top = (row + r) * 24 + 'px';
                block.style.left = (col + c) * 24 + 'px';
                block.setAttribute('id',`block-${row + r}-${col + c}`);
                document.getElementById('game_board').appendChild(block);
            }
        }
    }
}

// Xoá tetromino from board
function eraseTetromino(){
    for(let i = 0; i < currentTetromino.shape.length; i++){
        for( let j = 0; j < currentTetromino.shape[i].length; j++){
            if(currentTetromino.shape[i][j] !== 0){
                let row = currentTetromino.row + i;
                let col = currentTetromino.row + j;
                let block = document.getElementById(`block-${row}-${col}`);

                if(block){
                    document.getElementById('game_board').removeChild(block);
                }
            }
        }
    }
}

function rotateTetromino(){
    rotatedShape = [];
    for(let i = 0; i < currentTetromino.shape[0].length; i++){
        let row = [];
        for(let j = currentTetromino.shape.length - 1; j >= 0; j--){
            row.push(currentTetromino.shape[j][i]);
        }
        rotatedShape.push(row);
    }

    

    eraseTetromino();
    currentTetromino.shape = rotatedShape;
    drawTetromino();
}

drawTetromino();

function moveTetromino(direction){
    let row = currentTetromino.row;
    let col = currentTetromino.col;

    if(direction === "left"){
        eraseTetromino();
        col -= 1;
        currentTetromino.col = col;
        currentTetromino.row = row;
        drawTetromino();
    }
    else if(direction === "right"){
        eraseTetromino();
        col += 1;
        currentTetromino.col = col;
        currentTetromino.row = row;
        drawTetromino();
    }
    else{
        eraseTetromino();
        row++;
        currentTetromino.col = col;
        currentTetromino.row = row;
        drawTetromino();
    }
}

drawTetromino();
setInterval(moveTetromino, 500);

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event){
    switch(event.keyCode){
        case 37: // Mũi tên trái
            moveTetromino("left");
            break;
        case 39: // Mũi tên phải
            moveTetromino("right");
            break;
        case 40: // Mũi tên xuống
            moveTetromino("down");
            break;
        case 38: // Mũi tên lên
            // lật
            rotateTetromino();
            break;
        case 32: //SpaceBar
            // thả nhanh
            break;   
    }
}