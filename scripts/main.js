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

    const populateCell = (cellIndex, mark) => {
        document.querySelector(`[data-cellnum='${cellIndex}']`).textContent = mark;       
    }

    return {getTurnStatus, setTurnStatus, populateCell }

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
                displayController.populateCell(cellIndex, opponent.getMark());
                displayController.setTurnStatus(true);
            };
        }
    }

    const addCellListeners = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", (e) => {
                if (displayController.getTurnStatus() && gameInProgress) {
                    gameBoardArray[index] = player1.getMark();
                    displayController.populateCell(index, player1.getMark());
                    displayController.setTurnStatus(false);
                    if (isWinner(player1)) {
                        
                    }
                    if (!isBoardFull() && gameInProgress) {
                        takeComputerTurn();
                    }
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
                gameInProgress = false;
                winner = player.getName();
                return true;
            }
        }
        return false;
    };

    const isBoardFull = () => {
        return gameBoardArray.every((cell) => {
            return cell !== null;
        });
    }

    return { addCellListeners, takeComputerTurn, getGameBoardArray, setOpponent, setPlayer1, addMark, isWinner, isBoardFull }

})();

const Player = (mark, name) => {

    const getMark = () => mark;

    const getName = () => name;

    return { getMark, getName }
}

const human = Player("o", "Marco");
const computer = Player("x", "Computer");
gameBoard.setPlayer1(human);
gameBoard.setOpponent(computer);
gameBoard.addCellListeners();