const displayController = (() => {
    let player1Turn = true;

    const getTurnStatus = () => {
        return player1Turn;
    }

    const setTurnStatus = (status) => {
        player1Turn = status;
    }

    const startGame = () => {
               
    }

    return {getTurnStatus, setTurnStatus}

})();

const gameBoard = (() => {
    const gameBoardArray = [null, null, null,
                            null, null, null,
                            null, null, null];
    let player1;
    let opponent;
    let winner = "";
    let gameInProgress = true;

    const addMark = (mark, index) => {
        gameBoardArray[index] = mark;
    };

    const setPlayer1 = (playerInput) => {
        player1 = playerInput;
    };

    const setOpponent = (opponentInput) => {
        opponent = opponentInput;
    }
    
    const getGameBoardArray = () => {
        return gameBoardArray;
    }

    const takeComputerTurn = () => {
        let cellFilledIn = true;
        let cellIndex;

        while (cellFilledIn && gameInProgress) {
            cellIndex = Math.floor(Math.random() * 10);
            if (gameBoardArray[cellIndex] === null) {
                cellFilledIn = false;
                addMark(opponent.getMark(), cellIndex);
                document.querySelector(`[data-cellnum='${cellIndex}']`).textContent = opponent.getMark();
                displayController.setTurnStatus(true);
            };
        }
    }

    const addCellListeners = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", (e) => {
                if (displayController.getTurnStatus() && gameInProgress) {
                    cell.textContent = player1.getMark();
                    gameBoardArray[index] = player1.getMark();
                    displayController.setTurnStatus(false);
                    takeComputerTurn();
                }
            })
        });
    }

    const isWinner = (player) => {
        let playerIsWinner;
        let winningStates = [[0,1,2],
                             [3,4,5],
                             [6,7,8],
                             [0,3,6],
                             [1,4,7],
                             [2,5,8],
                             [0,4,8],
                             [2,4,6]];

        for (let i = 0; i < winningStates.length; i++) {
            playerIsWinner = true;
            for (let j = 0; j < 3; j++) {
                if (gameBoardArray[winningStates[i][j]] != player.getMark()) {
                    playerIsWinner = false;
                }
            }
            if (playerIsWinner) {
                return true;
            }
        }
        return false;

        /* cannot break out of forEach loop with return statement, 
         *  needed to convert logic to use for loops as above
        winningStates.forEach((state) => {
            let playerIsWinner = true;
            state.forEach((index) => {
                if (gameBoardArray[index] != player.getMark()) {
                    playerIsWinner = false;
                } 
            });
            console.log(playerIsWinner);
            if (playerIsWinner) {
                return true;
            }
        });
        return false;
        */

    };

    return { addCellListeners, takeComputerTurn, getGameBoardArray, setOpponent, setPlayer1, addMark, isWinner }

})();

const Player = (mark) => {

    const getMark = () => mark;

    return { getMark }
}

const human = Player("o");
const computer = Player("x");
gameBoard.setPlayer1(human);
gameBoard.setOpponent(computer);
gameBoard.addCellListeners();