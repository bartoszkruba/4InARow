class WinChecker {

    // check if for the wining move
    validate(slot) {
        if (this.checkHorizontal(slot) || this.checkVertical(slot) || this.checkDiagonal(slot)) {
            return true;
        }
    }


    checkHorizontal(slot) {
        let gameboard = slot.board.gameBoard;
        for (let j = 0; j <= 4; j++) {
            let discs = [];
            let slotsConnected = 0;
            for (let i = -4; i < 0; i++) {
                let currCol = slot.col + i + j;
                if (this.checkBoundary(currCol, slot.row, slot)) {
                    if (gameboard[currCol][slot.row].player === gameboard[slot.col][slot.row].player) {
                        discs.push(gameboard[currCol][slot.row]);
                        slotsConnected++;
                        if (slotsConnected === 4) {
                            discs.forEach(cur=>{
                                cur.player = {color: slot.player.color,
                                animation: "pulse 1.5s infinite"};
                                cur.render();
                            });
                            return true;
                        }
                    }
                }
            }
        }
    }

    checkVertical(slot) {
        let gameboard = slot.board.gameBoard;
        let slotsConnected = 0;
        let discs = [];
        for (let i = 0; i < 4; i++) {
            if (this.checkBoundary(slot.col, slot.row - i, slot)) {
                if (gameboard[slot.col][slot.row - i].player === gameboard[slot.col][slot.row].player) {
                    discs.push(gameboard[slot.col][slot.row - i]);
                    slotsConnected++;
                    if (slotsConnected === 4) {
                        discs.forEach(cur=>{
                            cur.player = {color: slot.player.color,
                                animation: "pulse 1.5s infinite"};
                            cur.render();
                        });
                        return true;
                    }
                }
            }
        }
    }

    checkDiagonal(slot) {
        let gameboard = slot.board.gameBoard;
        for (let k = 0; k < 2; k++) {
            for (let j = 0; j <= 4; j++) {
                let slotsConnected = 0;
                let discs = [];
                for (let i = -4; i < 0; i++) {
                    let currCol = slot.col + i + j;
                    let currRow = (k === 0) ? slot.row - (i + j) : slot.row + (i + j);
                    if (this.checkBoundary(currCol, currRow, slot)) {
                        if (gameboard[currCol][currRow].player === gameboard[slot.col][slot.row].player) {
                            discs.push(gameboard[currCol][currRow]);
                            slotsConnected++;
                            if (slotsConnected === 4) {
                                discs.forEach(cur=>{
                                    cur.player = {color: slot.player.color,
                                        animation: "pulse 1.5s infinite"};
                                    cur.render();
                                });
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }

    checkBoundary(col, row, slot) {
        return col < slot.board.gameBoard.length && col >= 0 && row >= 0 && row < slot.board.gameBoard[col].length;
    }
}