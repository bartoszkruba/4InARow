class Game extends Component {


    constructor(playerOne, playerTwo, game) {
        super();
        this.game = game;
        this.players = [playerOne, playerTwo];
        this.players[0].game = this;
        this.players[1].game = this;
        this.board = new Board(this);
        this.turn = 0;
        this.gameOver = false;
        this.winner;
        this.activePage;
        this.addEvents({
            'click .btn-resetGame': 'resetGame',
        });
    }

    currentPlayer() {
        this.activePage = !this.gameOver; // Need to know if game is active
        // Decides whos turn it is
        let playerTurn = (this.turn % 2);
        return this.players[playerTurn];
    }

    playBot(current) {
        setTimeout(() => {
            let validSlot = this.board.placeDisc(current.getMove(), current);
            this.ifValidMove(validSlot, current);
        }, 2000); //*
        return '';
    }

    // Get input of a slot object
    playTurn(slot) {
        if (!this.gameOver) {
            // Get player in turn
            let current = this.currentPlayer();
            // Check with board if the move is valid
            let validSlot;
            validSlot = this.board.placeDisc(slot.col, current);
            this.ifValidMove(validSlot, current);
        }
    }


    ifValidMove(slot, current) {
        let validSlot = slot;
        // Was the move valid?
        if (validSlot) {
            current.discs--;
            this.turn++;
            validSlot.render();
            this.players[0].render();
            this.players[1].render();

            // Check with board if it was a winning move
            let validatedTurn = new WinChecker().validate(validSlot);

            if (validatedTurn) {
                // If move was a win
                this.gameOver = true;
                this.winner = current;
                if (this.winner.type !== 'bot') {
                    this.game.saveScore({name: this.winner.name, score: 21 - this.winner.discs});
                }
                this.game.winningPage = new WinningPage(this.game, this.winner);
                this.game.render();

                //*
                // if(this.game.gamesPlayed < 500){
                //     this.game.gamesPlayed++;
                //     this.game.rematch(); 
                // }else{alert(`Games Played: ${this.game.gamesPlayed}, Draws: ${this.game.draws}`)} 
                //*
            }
        }

        if ((this.players[0].discs + this.players[1].discs) === 0) {
            // If no more discs
            this.gameOver = true;
            this.game.winningPage = new WinningPage(this.game);
            this.game.render();

            //*
            // if(this.game.gamesPlayed < 500){
            //     this.game.gamesPlayed++;
            //     this.game.draws++;
            //     this.game.rematch(); // *
            // }else{alert(`Games Played: ${this.game.gamesPlayed}, Draws: ${this.game.draws}`)}
            //*
        }
    }

    resetGame() {
        if (!this.game.winningPage) {
            this.game.rematch();
        }
    }
}
