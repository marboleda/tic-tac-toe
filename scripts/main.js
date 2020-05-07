const gameBoard = (() => {
    gameBoardArray = [null, null, null,
                      null, null, null,
                      null, null, null];

    const addMark = (mark, index) => {
        gameBoardArray[index] = mark;
    };

    const render = () => {
        const gameBoardDiv = document.getElementById("game-board");
        gameBoardArray.forEach((val, index) => {
            const newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.textContent = val;
            newCell.setAttribute("data-cellnum", index.toString());
            gameBoardDiv.appendChild(newCell);
        })
    }

    return { render, addMark }

})();

const playerFactory = () => {

}

gameBoard.addMark("x", 0);
gameBoard.addMark("o", 3);
gameBoard.render();