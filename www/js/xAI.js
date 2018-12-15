class xAI {

    constructor(gameboard) {
        this.gameboard = gameboard;
    }

    // check if for the wining move
    validate(col, player){
        // creating a "test" disc to see if it would be a winning move 
        let disc =  this.placeDisc(col);
        disc.player = player;

        if (this.checkHorizontal(disc) || this.checkVertical(disc) || this.checkDiagonal(disc)) {
            // changing the player back to null
            // otherwise it would stay red/yellow and we dont want it becaouse its just a test
            disc.player = null;
            return true;
        }else{
            disc.player = null;
            return false;
        }
    }



    // copied function from WinChecker - changed a little bit
    checkHorizontal(slot) {
        let gameboard = this.gameboard;
        for (let j = 0; j <= 4; j++) {
            let slotsConnected = 0;
            for (let i = -4; i < 0; i++) {
                let currCol = slot.col + i + j;
                if (this.checkBoundary(currCol, slot.row, slot)) {
                    if (gameboard[currCol][slot.row].player === gameboard[slot.col][slot.row].player) {
                        slotsConnected++;
                        if (slotsConnected === 4) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    // copied function from WinChecker - changed a little bit
    checkVertical(slot) {
        let gameboard = this.gameboard;
        let slotsConnected = 0;
        for (let i = 0; i < 4; i++) {
            if (this.checkBoundary(slot.col, slot.row - i, slot)) {
                if (gameboard[slot.col][slot.row - i].player === gameboard[slot.col][slot.row].player) {
                    slotsConnected++;
                    if (slotsConnected === 4) {
                        return true;
                    }
                }
            }
        }
    }

    // copied function from WinChecker - changed a little bit
    checkDiagonal(slot) {
        let gameboard = this.gameboard;
        for (let k = 0; k < 2; k++) {
            for (let j = 0; j <= 4; j++) {
                let slotsConnected = 0;
                for (let i = -4; i < 0; i++) {
                    let currCol = slot.col + i + j;
                    let currRow = (k === 0) ? slot.row - (i + j) : slot.row + (i + j);
                    if (this.checkBoundary(currCol, currRow, slot)) {
                        if (gameboard[currCol][currRow].player === gameboard[slot.col][slot.row].player) {
                            slotsConnected++;
                            if (slotsConnected === 4) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }

    // copied function from WinChecker - changed a little bit
    checkBoundary(col, row, slot) {
        return col < this.gameboard.length && col >= 0 && row >= 0 && row < this.gameboard[col].length;
    }


    // copied function from board
    placeDisc(col) {
            for (let i = 0; i < this.gameboard[col].length; i++) {
                if (!this.gameboard[col][i].player) {
                    // this.gameBoard[col][i].render();
                    return this.gameboard[col][i];
                }
            }
        return false;
    }
}
