
const game = (() => {
    const updateGameboard = (gameBoard, player, index) => {
        gameBoard.addMark(player.getMark(), index);
        document.getElementById("game-board").innerHTML = "";
        gameBoard.render();
    }

    return { updateGameboard }

})();

const gameBoard = (() => {
    gameBoardArray = [null, null, null,
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

    const addCellListeners = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", (e) => {
                cell.textContent = player.getMark();
            })
        });
    }

    return { addCellListeners, setOpponent, setPlayer, addMark }

})();

const Player = (mark) => {

    const getMark = () => mark;

    const placeMark = (gameBoardIndex) => {
        return gameBoardIndex;
    }

    return { getMark, placeMark }
}

const human = Player("o");
const computer = Player("x");
gameBoard.setPlayer(human);
gameBoard.addCellListeners();