const gameBoard = (() => {
    gameBoardArray = ["x", "o", "x",
                      "x", "o", "x",
                      "o", "x", "o"]

    const render = () => {
        const gameBoardDiv = document.getElementById("game-board");
        gameBoardArray.forEach((val) => {
            const newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.textContent = val;
            gameBoardDiv.appendChild(newCell);
        })
    }

    return { render }

})();

const playerFactory = () => {

}

gameBoard.render();