const displayController = (() => {
    let player1Turn = true;
    results = document.getElementById("results");

    const getTurnStatus = () => {
        return player1Turn;
    }

    const setTurnStatus = (status) => {
        player1Turn = status;
    }

    const startGame = (mode) => {
        gameBoard.setGameStatus(mode);
        gameBoard.setOpponent(Player("x", "Computer"));
        gameBoard.addCellListeners();
        results.textContent = `Game in Progress: ${nameInput} vs. Computer`;
    }

    const endGameWithWinner = (winnerName) => {
        results.textContent = `${winnerName} is the winner!`;
    }

    const endGameWithTie = () => {
        results.textContent = ("It's a tie!");
    }

    const populateCell = (cellIndex, mark) => {
        document.querySelector(`[data-cellnum='${cellIndex}']`).textContent = mark;       
    }

    const addUIFunctionality = () => {
        document.getElementById("start-button").addEventListener("click", () => {
            addStartFunctionalityToButton("normal");
        });

        document.getElementById("impossible-button").addEventListener("click", () => {
            addStartFunctionalityToButton("impossible");
        });
        
        document.getElementById("reset-button").addEventListener("click", () => {
            document.querySelectorAll(".cell").forEach((cell) => {
                cell.textContent = "";
            });
            results.textContent = "";
            gameBoard.resetGameBoard();
            setTurnStatus(true);
        });
    }

    const addStartFunctionalityToButton = (mode) => {
        nameInput = document.getElementById("player-1-name").value;
        if (!gameBoard.gameIsInProgress() && !gameBoard.impossibleGameIsInProgress()) {
            if (nameInput == "") {
                results.textContent = "You must enter a name before starting a game!";
            }
            else {
                gameBoard.setPlayer1(Player("o", nameInput));
                startGame(mode);
            }
        }
    };

    return {getTurnStatus, setTurnStatus, populateCell, endGameWithWinner, endGameWithTie, addUIFunctionality }

})();

const gameBoard = (() => {
    const gameBoardArray = [null, null, null,
                            null, null, null,
                            null, null, null];
    let player1;
    let opponent;
    let gameInProgress = false;
    let impossibleGameInProgress = false;

    const addMark = (mark, index) => {
        gameBoardArray[index] = mark;
    };

    const setPlayer1 = (playerInput) => {
        player1 = playerInput;
    };

    const setOpponent = (opponentInput) => {
        opponent = opponentInput;
    }

    const takeComputerTurn = () => {
        let cellFilledIn = true;
        let cellIndex;

        while (cellFilledIn && gameInProgress) {
            cellIndex = Math.floor(Math.random() * 10);

            if (gameBoardArray[cellIndex] === null) {
                cellFilledIn = false;
                addMark(opponent.getMark(), cellIndex);
                displayController.populateCell(cellIndex, opponent.getMark());
                displayController.setTurnStatus(true);

                if (isWinner(gameBoardArray, opponent)) {
                    displayController.endGameWithWinner(opponent.getName());
                } else {
                    if (isBoardFull()) {
                        setTiedGame();
                    }
                }
            };
        }
    }

    const takeImpossibleComputerTurn = () => {
        let optimalMove = getBestMoveViaMinimax(gameBoardArray, opponent);
        addMark(opponent.getMark(), optimalMove.index);
        displayController.populateCell(optimalMove.index, opponent.getMark());
        displayController.setTurnStatus(true);

        if (isWinner(gameBoardArray, opponent)) {
            displayController.endGameWithWinner(opponent.getName());
        } else {
            if (isBoardFull()) {
                setTiedGame();
            }
        }
    }

    const getBestMoveViaMinimax = (newBoard, player) => {
        const availSpots = [];
        gameBoardArray.forEach((cell, index) => {
            if (cell === null) {
                availSpots.push(index);
            }
        });

        //check if we are at a terminal state, i.e. a state where the game ends
        if (isWinner(newBoard, player1)) {
            return {score: -10};
        } else if (isWinner(newBoard, opponent)) {
            return {score: 10};
        } else if (availSpots.length == 0) {
            return {score: 0};
        }

        const moves = [];
        availSpots.forEach((element) => {
            let result;
            const move = {index: element};
            
            //try placing your mark on one of the available spots
            newBoard[element] = player.getMark();

            //collect score from opposing player
            if (player.getName() == "Computer") {
                result = getBestMoveViaMinimax(newBoard, player1);
            } else {
                result = getBestMoveViaMinimax(newBoard, opponent);
            }

            move.score = result.score;
            newBoard[element] = null;
            moves.push(move);
        });

            /*
             * If we are the computer, choose the move with the highest score
             * otherwise, choose move with the lowest
            */
           let bestMove;
           let bestScore;

           if (player.getName() == "Computer") {
            bestScore = -9999;
            moves.forEach((move, index) => {
                if (move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = index;
                }
            });
        } else {
            bestScore = 9999;
            moves.forEach((move, index) => {
                if (move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = index;
                }
            });
        }

        return moves[bestMove];


    }

    const addCellListeners = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", (e) => {
                if (displayController.getTurnStatus() && (gameInProgress || impossibleGameInProgress) && cell.textContent == "") {
                    gameBoardArray[index] = player1.getMark();
                    displayController.populateCell(index, player1.getMark());
                    displayController.setTurnStatus(false);
                    if (isWinner(gameBoardArray, player1)) {
                        displayController.endGameWithWinner(player1.getName());
                    } else {
                        if (isBoardFull()) {
                            setTiedGame();
                        }
                    }

                    if (!isBoardFull()) {
                        if (gameInProgress) {
                            takeComputerTurn();
                        } else if (impossibleGameInProgress) {
                            takeImpossibleComputerTurn();
                        }
                    }
                }
            })
        });
    }

    const isWinner = (gameState, player) => {
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
                if (gameState[winningStates[i][j]] != player.getMark()) {
                    playerIsWinner = false;
                }
            }
            if (playerIsWinner) {
                gameInProgress = false;
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

    const gameIsInProgress = () => {
        return gameInProgress;
    }

    const impossibleGameIsInProgress = () => {
        return impossibleGameInProgress;
    }

    const setGameStatus = (mode) => {
        if (mode == "normal") {
            gameInProgress = true;
        } else if (mode == "impossible") {
            impossibleGameInProgress = true;
        }
    }

    const setTiedGame = () => {
        gameInProgress = false;
        impossibleGameInProgress = false;
        displayController.endGameWithTie();         
    }

    const resetGameBoard = () => {
        gameBoardArray.fill(null);
        player1 = undefined;
        opponent = undefined;
        gameInProgress = false;
        impossibleGameInProgress = false;
    }


    return { addCellListeners, setOpponent, setPlayer1, gameIsInProgress, setGameStatus, resetGameBoard, impossibleGameIsInProgress }

})();

const Player = (mark, name) => {

    const getMark = () => mark;

    const getName = () => name;

    return { getMark, getName }
}

displayController.addUIFunctionality();
