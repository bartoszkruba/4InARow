class Bot extends Player{

    constructor(player, opponent){
        super(player);
        this.opponent = opponent;
    }

    runMe(){
      if(FixEverything.game.game.currentPlayer() === this && this.game.gameOver === false){
        FixEverything.game.game.playBot(this);
      }
      return '';
    }

    //returns a valid move
    getMove(){
        //creating an AI class to check for winning moves 
        let AI = new xAI(this.game.board.gameBoard);
        let move = this.getValidMoves(this); 

        //looking for a winning move
        for(let i = 0; i < move.length; i++){
            if(AI.validate(move[i], this)){
                return move[i];
            }
        }
        
        for(let i = 0; i < move.length; i++){
            if(AI.validate(move[i], this.opponent)){
                return move[i];
            }
        }


        return this.getRandom(move)
    }


    // bug
    getRandom(validMoves){
        return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    //returns array with possible valid moves
    getValidMoves(player){
        let validMoves = [];
        for(let col = 0; col < player.game.board.gameBoard.length; col++){
            if(player.game.board.gameBoard[col][5].player === null){
                validMoves.push(col);
            }
        }
        return validMoves;
    }

}
