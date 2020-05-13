const game = ((board) => {

})();

const gameBoard = (() => {
    const gameBoardArray = [null, null, null,
                            null, null, null,
                            null, null, null];
    let player;
    let opponent;

    const addMark = (mark, index) => {
        gameBoardArray[index] = mark;
    };

    const setPlayer = (playerInput) => {
        player = playerInput;
    };

    const setOpponent = (opponentInput) => {
        opponent = opponentInput;
    }
    
    const getGameBoardArray = () => {
        return gameBoardArray;
    }

    const addCellListeners = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", (e) => {
                cell.textContent = player.getMark();
                gameBoardArray[index] = player.getMark();
            })
        });
    }

    return { addCellListeners, getGameBoardArray, setOpponent, setPlayer, addMark }

})();

const Player = (mark) => {

    const getMark = () => mark;

    return { getMark }
}

const human = Player("o");
const computer = Player("x");
gameBoard.setPlayer(human);
gameBoard.setOpponent(computer);
gameBoard.addCellListeners();