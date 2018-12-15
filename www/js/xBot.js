class Bot extends Player{

    constructor(player, opponent){
        super(player);
        this.opponent = opponent;
    }

    runMe(){
      if(FixEverything.game.game.currentPlayer() === this){
        FixEverything.game.game.playBot(this);
      }
      return '';
    }

    //returns a valid move
    getMove(){
        //creating an AI class to check for winning moves 
        let AI = new xAI(this.game.board.gameBoard);
        let move = this.getValidMoves(this);
        let MoveToReturn = this.getRandom(move)

        //looking for a winning move
        move.forEach(cur=>{
            if(AI.validate(cur, this)){
                MoveToReturn = cur;
            }
        });

        move = this.getValidMoves(this.opponent);
        move.forEach(cur=>{
            if(AI.validate(cur, this.opponent)){
                MoveToReturn = cur;
            }
        });

        return move[MoveToReturn];
    }

    getRandom(validMoves){
        return Math.floor(Math.random() * validMoves.length);
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
