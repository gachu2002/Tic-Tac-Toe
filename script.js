const gameBoard = (function(doc){
    const boardElement = doc.querySelector('.board');
    const cellElements = doc.querySelectorAll('.cell');
    const cells = [];
    let playerSymbol = '';

    const getPlayerSymbol = () => {
        return playerSymbol;
    }

    const setPlayerSymbol = (symbol) => {
        playerSymbol = symbol;
    } 

    cellElements.forEach(element => {
        cells.push(element);
    });

    const disableBoard = () => {
        boardElement.classList.add('disable');
    }

    const enableBoard = () => {
        boardElement.classList.remove('disable');
    }

    // Check the board state - Win or Draw or Continue
    const getBoardState = () => {
        let isFull = true;

        for(let i = 0; i < 3; i++){
            if(cells[i].innerText === '') {
                isFull = false;
                continue;   
            }
            if(cells[i].innerText === cells[i+3].innerText && cells[i].innerText === cells[i+6].innerText) {
                return cells[i].innerText;
            }
        }      
        for(let i = 0; i < 9; i+=3){
            if(cells[i].innerText === '') {
                isFull = false;
                continue;   
            }
            if(cells[i].innerText === cells[i+1].innerText && cells[i].innerText === cells[i+2].innerText) {
                return cells[i].innerText;
            }
        }

        if(cells[0].innerText !== '' && cells[0].innerText === cells[4].innerText && cells[0].innerText === cells[8].innerText) 
            return cells[0].innerText;
        if(cells[2].innerText !== '' && cells[2].innerText === cells[4].innerText && cells[2].innerText === cells[6].innerText) 
            return cells[2].innerText;

        return isFull ? "Draw" : "Continue";
    }

    const clearBoard = () => {
        cells.forEach((cell) => {
            cell.innerText = '';
        })
    }

    return {
        disableBoard,
        enableBoard,
        getBoardState,
        setPlayerSymbol,
        getPlayerSymbol,
        clearBoard,
    }
})(document);

const playerMenu = (function(doc){
    const menuElement = doc.querySelector('.pick-symbol');
    let playerSymbol = '';
    
    const getPlayerChoice = () => {
        return playerSymbol;
    }

    const enableMenu = () => {
        menuElement.classList.remove('disable');
    }
    const disableMenu = () => {
        menuElement.classList.add('disable');
    }

    const restartPlayerChoice = () => {
        playerSymbol = '';
    }

    return {
        enableMenu,
        disableMenu,
        getPlayerChoice,
        restartPlayerChoice,
    }
})(document);

const game = (function(doc){
    // Function to play the game
    let turnNum = 0;
    let firstPlayerSymbol = "X";
    let secondPlayerSymbol = "O"; 

    const playGame = () => {
        doc.querySelector('.board').addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains("cell") && target.innerText === '') {
                if(gameBoard.getBoardState().toLowerCase() === "continue"){
                    if(turnNum % 2 === 0) gameBoard.setPlayerSymbol(firstPlayerSymbol);
                    else gameBoard.setPlayerSymbol(secondPlayerSymbol);
                    target.innerText = gameBoard.getPlayerSymbol();
                    turnNum += 1;
                    console.log(`${turnNum} ${gameBoard.getBoardState()}`);
                }
                switch(gameBoard.getBoardState()){
                    case 'Draw':
                        doc.querySelector('.result>span').innerText = 'DRAW';
                        break;
                    case firstPlayerSymbol:
                        doc.querySelector('.result>span').innerText = "FIRST PLAYER WIN";
                        break;
                    case secondPlayerSymbol:
                        doc.querySelector('.result>span').innerText = "SECOND PLAYER WIN";
                        break;
                }     
            }
        })
    }

    const restartGame = () => {
        gameBoard.clearBoard();
        gameBoard.disableBoard();
        playerMenu.restartPlayerChoice();
        playerMenu.enableMenu();
        doc.querySelector('.result>span').innerText = '';
    }

    doc.addEventListener('DOMContentLoaded', () => {
        gameBoard.disableBoard();
        playerMenu.enableMenu();

        doc.querySelector('.pick-symbol').addEventListener('click',(event) => {
            const target = event.target;
            if(["X", "O"].includes(target.getAttribute("id"))){
                if(target.getAttribute('id') === "X") {
                    gameBoard.setPlayerSymbol('X');
                    console.log("X");
                }
                else if(target.getAttribute('id') === "O") {
                    gameBoard.setPlayerSymbol('O');
                    console.log("O");
                }
                firstPlayerSymbol = gameBoard.getPlayerSymbol();
                secondPlayerSymbol = firstPlayerSymbol === 'X' ? 'O' : 'X'; 

                console.log(firstPlayerSymbol + " " + secondPlayerSymbol);
                
                gameBoard.enableBoard();
                playerMenu.disableMenu();

                playGame();
            }
        });
        doc.querySelector('#restart').addEventListener('click',() => {
            restartGame();
            turnNum = 0;
        })
    })
})(document); 

