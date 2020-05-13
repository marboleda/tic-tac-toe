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

        while (cellFilledIn) {
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
                if (displayController.getTurnStatus()) {
                    cell.textContent = player1.getMark();
                    gameBoardArray[index] = player1.getMark();
                    displayController.setTurnStatus(false);
                    takeComputerTurn();
                }
            })
        });
    }

    return { addCellListeners, takeComputerTurn, getGameBoardArray, setOpponent, setPlayer1, addMark }

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