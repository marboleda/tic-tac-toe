
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

    const addMark = (mark, index) => {
        gameBoardArray[index] = mark;
    };

    const render = (player) => {
        /*
        const gameBoardDiv = document.getElementById("game-board");
        gameBoardArray.forEach((val, index) => {
            const newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.textContent = val;
            newCell.setAttribute("data-cellnum", index.toString());
            gameBoardDiv.appendChild(newCell);
        });
        */
    }

    return { render, addMark }

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

//gameBoard.render(human);