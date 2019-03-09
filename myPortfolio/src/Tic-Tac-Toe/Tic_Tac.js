//I found a great Youtubue guide that taught me how to do this.
//The video is only an 51 minutes long...but it took me about 2 days.
//I understand the AI sort of...but no way could I build it with out the video guide...even then I struggled a lot.

//this is outlining my board and all possible wins
var origBoard;
const huPlayer = '0';
const aiPlayer = 'X';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
//this is saying at the start of each game sellect all the cells counted in the above
const cells = document.querySelectorAll('.cell');
startGame();
//this is saying what happens each time a new game starts it also reset the board to be blank
//it clears the cells and background color and looks to see if someone needs to take a turn
function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}
//this is saying when someone takes a turn (the human or the computer), did someone win?  is there a tie?
//the "number" is replaced by an X or O once clicked and this is saying if it is a number...then you can click there.
//If it is not a number then you can't click there.
function turnClick (square) {
    if (typeof origBoard[square.target.id] == 'number') {
    turn(square.target.id, huPlayer);
    if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
    }
}
//this shows who took a turn and shows the element that was clicked so the x or o shows
//it again checks to see if someone won the game then the game will end.
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}
//this is explaining how to check if the game has been won
//it reviews all locations on teh board via reducing them and giving the value.
//so it is showing all indexes the player has played in.
//it searches using hte wincombos to see if one of the winning ways has been played
//meaning every time somone takes a turn it loops through all the wincombos to see if it is a win and which player it is.
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player}; 
            break;
        }
    }
    //if the loops show a win then 
    return gameWon;
}
//if the game is won this is the function as to what to do.
//it will set background colors as blue or red of the winning squares
function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
                gameWon.player == huPlayer ? "blue" : "red";
    }
    //this makes it not possible to click on any cells if the game has been won and is over.
    //plus declare the winner
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? "You win!" : "You Lose.");
}
//here on down it got VERY challenging but after around 30 trys I started to understand.
//this is the endgame function of saying you won or lost
function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}
//this just tells the computer to play the next empty square
//note "number" like up on the turn click
function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}
//this is tell the AI player to determine place to play
function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}
//determines if there are no more possible places to play and no one has won.
//it will also change the background color, declare the status and prevent further clicks
function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}
//it gets crazy from here on down
//the main to functions are "newBoard and player" basicaly, who is play, did they win and review, assess and reset the board
function minimax(newBoard, player) {
    var availSpots = emptySquares();
//if 0 takes a spot return is -10, X is 10, if no places left 0
    if (checkWin(newBoard, huPlayer)) {
        return {score: -10};
    }   else if (checkWin(newBoard, aiPlayer)){
        return {score: 10};
    }   else if (availSpots.length === 0){
        return {score: 0};
    }
    //this collects the score from the checkwin and resets the "number of the square to a letter"
    //this loops through all empty spots and collects each move and score.
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;
//reset as to who is playing...ai or human and what is the score "-10, 10 or 0" meaning who played, what happened and does the board need resting?
        if (player == aiPlayer) {
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        }   
        else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }
//this helps the AI choose the best move or hightest score via its loop aray
//also if there is move that is equal in score it only stores/scores the first move.
    var bestMove;
    if(player === aiPlayer) {
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++){
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }   
    //enter the human playing and the AI reviewing the human players moves
    else {
        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }    
    }

    return moves[bestMove];
}
