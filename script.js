document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('reset-button').addEventListener('click', resetGame);

let board;
let currentPlayer = 'white';
let selectedPiece = null;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    initializeBoard();
    renderBoard();
}

function resetGame() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-board').style.display = 'none';
    currentPlayer = 'white';
    document.getElementById('turn-info').textContent = 'Хід гравця: Білі';
    selectedPiece = null;
}

function initializeBoard() {
    board = Array(8).fill().map(() => Array(8).fill(null));
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 1) {
                board[row][col] = 'black';
            }
        }
    }
    for (let row = 5; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 1) {
                board[row][col] = 'white';
            }
        }
    }
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            if ((row + col) % 2 === 1) {
                square.classList.add('dark');
                if (board[row][col]) {
                    const piece = document.createElement('div');
                    piece.classList.add('piece', board[row][col]);
                    square.appendChild(piece);
                }
                square.addEventListener('click', () => handleSquareClick(row, col));
            } else {
                square.classList.add('light');
            }
            boardElement.appendChild(square);
        }
    }
}

function handleSquareClick(row, col) {
    if (selectedPiece) {
        movePiece(row, col);
    } else if (board[row][col] === currentPlayer) {
        selectPiece(row, col);
    }
}

function selectPiece(row, col) {
    selectedPiece = { row, col };
    renderBoard();
}

function movePiece(row, col) {
    if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
        board[row][col] = currentPlayer;
        board[selectedPiece.row][selectedPiece.col] = null;
        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        document.getElementById('current-player').textContent = currentPlayer === 'white' ? 'Білі' : 'Чорні';
        selectedPiece = null;
        renderBoard();
    }
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
    // Додайте логіку перевірки коректності ходу
    const deltaRow = toRow - fromRow;
    const deltaCol = Math.abs(toCol - fromCol);
    if (deltaRow === (currentPlayer === 'white' ? -1 : 1) && deltaCol === 1 && !board[toRow][toCol]) {
        return true;
    }
    return false;
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
    const deltaRow = toRow - fromRow;
    const deltaCol = Math.abs(toCol - fromCol);
    
    if (deltaRow === (currentPlayer === 'white' ? -1 : 1) && deltaCol === 1 && !board[toRow][toCol]) {
        return true;
    }
    
    // Перевірка можливості бити шашку
    if (deltaRow === (currentPlayer === 'white' ? -2 : 2) && deltaCol === 2) {
        const middleRow = fromRow + (deltaRow / 2);
        const middleCol = fromCol + (toCol - fromCol) / 2;
        if (board[middleRow][middleCol] && board[middleRow][middleCol] !== currentPlayer && !board[toRow][toCol]) {
            // Вибити шашку супротивника
            board[middleRow][middleCol] = null;
            return true;
        }
    }
    
    return false;
}

function movePiece(row, col) {
    if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
        board[row][col] = currentPlayer;
        board[selectedPiece.row][selectedPiece.col] = null;
        
        // Перевірка перетворення в дамку
        if (currentPlayer === 'white' && row === 0) {
            board[row][col] = 'whiteKing';
        } else if (currentPlayer === 'black' && row === 7) {
            board[row][col] = 'blackKing';
        }
        
        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        document.getElementById('current-player').textContent = currentPlayer === 'white' ? 'Білі' : 'Чорні';
        selectedPiece = null;
        renderBoard();
    }
}

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('reset-button').addEventListener('click', resetGame);



function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    initializeBoard();
    renderBoard();
}

function resetGame() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-board').style.display = 'none';
    currentPlayer = 'white';
    document.getElementById('turn-info').textContent = 'Хід гравця: Білі';
    selectedPiece = null;
}

function initializeBoard() {
    board = Array(8).fill().map(() => Array(8).fill(null));
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 1) {
                board[row][col] = 'black';
            }
        }
    }
    for (let row = 5; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 1) {
                board[row][col] = 'white';
            }
        }
    }
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            if ((row + col) % 2 === 1) {
                square.classList.add('dark');
                if (board[row][col]) {
                    const piece = document.createElement('div');
                    piece.classList.add('piece', board[row][col]);
                    square.appendChild(piece);
                }
                square.addEventListener('click', () => handleSquareClick(row, col));
            } else {
                square.classList.add('light');
            }
            boardElement.appendChild(square);
        }
    }
}

function handleSquareClick(row, col) {
    if (selectedPiece) {
        movePiece(row, col);
    } else if (board[row][col] === currentPlayer || board[row][col] === currentPlayer + 'King') {
        selectPiece(row, col);
    }
}

function selectPiece(row, col) {
    selectedPiece = { row, col };
    renderBoard();
}

function movePiece(row, col) {
    if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
        board[row][col] = board[selectedPiece.row][selectedPiece.col];
        board[selectedPiece.row][selectedPiece.col] = null;
        
        // Перевірка перетворення в дамку
        if (currentPlayer === 'white' && row === 0) {
            board[row][col] = 'whiteKing';
        } else if (currentPlayer === 'black' && row === 7) {
            board[row][col] = 'blackKing';
        }
        
        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        document.getElementById('current-player').textContent = currentPlayer === 'white' ? 'Білі' : 'Чорні';
        selectedPiece = null;
        renderBoard();
    }
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
    const deltaRow = toRow - fromRow;
    const deltaCol = Math.abs(toCol - fromCol);
    
    if (deltaRow === (currentPlayer === 'white' ? -1 : 1) && deltaCol === 1 && !board[toRow][toCol]) {
        return true;
    }
    
    // Перевірка можливості бити шашку
    if (deltaRow === (currentPlayer === 'white' ? -2 : 2) && deltaCol === 2) {
        const middleRow = fromRow + (deltaRow / 2);
        const middleCol = fromCol + (toCol - fromCol) / 2;
        if (board[middleRow][middleCol] && board[middleRow][middleCol] !== currentPlayer && !board[toRow][toCol]) {
            // Вибити шашку супротивника
            board[middleRow][middleCol] = null;
            return true;
        }
    }
    
    return false;
}
