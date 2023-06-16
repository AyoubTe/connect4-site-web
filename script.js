
// 
var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board = [];

var rows = 6;
var columns = 7;
var currColumns;

window.onload = function(){
    setGame();
}

function setGame(){
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    for(let i=0; i<rows; i++){
        let row = [];
        for(let j=0; j<columns; j++){
            // JS
            row.push(' ');

            //HTML
            // <div id="i-j" class="tile"></div>
            let tile = document.createElement('div');
            tile.id = i.toString() + '-' + j.toString();
            tile.classList.add('tile');
            tile.addEventListener('click', setPiece);
            document.getElementById('board').append(tile);
        }
        board.push(row);
    }
}

function setPiece(){
    if(gameOver){
        return;
    }

    let coords = this.id.split("-"); 
    let i = parseInt(coords[0]);
    let j = parseInt(coords[1]);

    i = currColumns[j];
    if(i<0){
        return;
    }

    board[i][j] = currPlayer;
    let tile = document.getElementById(i.toString() + "-" + j.toString());

    if (currPlayer == playerRed){
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else{
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    i -= 1; // Mise en a jour de la prochène colonne
    currColumns[j] = i; //
    checkwinner();
}

// La fonction pour tester si on une situation de gain
function checkwinner(){
    // Vérifier si les lignes
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c]==board[r][c+1]&&board[r][c+2]==board[r][c+3]&&board[r][c+1]==board[r][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Vérifier si les colonnes
    for(let r=0; r<rows-2; r++){
        for(let c=0; c<columns; c++){
            if(board[r][c] != ' '){
                if(board[r+1][c]==board[r][c] && board[r+2][c]==board[r+3][c]&&board[r+1][c]==board[r+3][c]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Vérifier si les anti-diagonales
    for(let r=0; r<rows-3; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r+1][c+1]==board[r][c] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2]==board[r+3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Vérifier si les diagonales
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r-1][c+1]==board[r][c] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2]==board[r-3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    
}

function setWinner(r, c){
    let winner = document.getElementById("gagnant");
    if (board[r][c] == playerRed){
        winner.innerText = "Le rouge gagne";
    }
    else{
        winner.innerText = "Le jaune gagne";
    }

    gameOver = true;
}





