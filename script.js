const gameBoard = (function(doc){
    const boardElement = doc.querySelector('.board');
    const cellElements = doc.querySelectorAll('.cell');
    const cells = [];
    const cellValues = [];
    let playerSymbol = 'X';
    
    const makingMove = () => {
        boardElement.addEventListener('click', (event) => {
            const target = event.target;
            if(target.getAttribute('class') === 'cell' && target.innerText === '') {
                target.innerText = playerSymbol;
            }
        })
    }

    const setPlayerSymbol = (symbol) => {
        this.playerSymbol = symbol;
    } 

    cellElements.forEach(element => {
        cells.push(element);
        cellValues.push(element.innerText);
    });

    const disableBoard = () => {
        boardElement.classList.add('disable');
    }

    const enableBoard = () => {
        boardElement.classList.remove('disable');
    }

    const getBoardState = () => {
        let isFull = true;

        for(let i = 0; i < 3; i++){
            if(cellValues[i] === '') {
                isFull = false;
                continue;   
            }
            if(cellValues[i] === cellValues[i+3] && cellValues[i] === cellValues[i+6]) {
                return cellValues[i];
            }
        }      
        for(let i = 0; i < 9; i+=3){
            if(cellValues[i] === '') {
                isFull = false;
                continue;   
            }
            if(cellValues[i] === cellValues[i+1] && cellValues[i] === cellValues[i+2]) {
                return cellValues[i];
            }
        }

        if(cellValues[0] === cellValues[4] && cellValues[0] === cellValues[8]) 
            return cellValues[0];
        if(cellValues[2] === cellValues[4] && cellValues[2] === cellValues[6]) 
            return cellValues[2];

        return isFull ? "Draw" : "Continue";
    }

    return {
        makingMove,
        disableBoard,
        enableBoard,
        getBoardState,
        setPlayerSymbol,
    }
})(document);

const playerMenu = (function(doc){
    const menuElement = doc.querySelector('.pick-symbol');
    let playerSymbol = '';

    menuElement.addEventListener('click', (event)=>{
        let target = event.target;
        if(target.getAttribute('id') === "X") playerSymbol = 'X';
        else if(target.getAttribute('id') === "O") playerSymbol = "O";
    });
    
    const getPlayerChoice = () => {
        return playerSymbol;
    }

    const enableMenu = () => {
        menuElement.classList.remove('disable');
    }
    const disableMenu = () => {
        menuElement.classList.add('disable');
    }
    return {
        enableMenu,
        disableMenu,
        getPlayerChoice,
    }
})(document);

const game = (function(doc){
    const playGame = (firstPlayer, secondPlayer) => {
        let turnNum = 0;
        switch(gameBoard.getBoardState().toLowerCase()){
            case 'continue':
                turnNum++;
                if(turnNum%2 === 0) gameBoard.setPlayerSymbol(firstPlayer);
                else gameBoard.setPlayerSymbol(secondPlayer);
                break;
            case 'draw':
                return 'DRAW';
            case firstPlayer:
                return "FIRST PLAYER WIN";
            case secondPlayer:
                return "SECOND PLAYER WIN";
        }     
    }

    doc.addEventListener('DOMContentLoaded', () => {
        gameBoard.disableBoard();
        playerMenu.enableMenu();

        doc.querySelector('.pick-symbol').addEventListener('click',() => {
            if(playerMenu.getPlayerChoice() !== ''){
                gameBoard.enableBoard();
                playerMenu.disableMenu();
            }
        });

        let firstPlayerSymbol = playerMenu.getPlayerChoice();
        let secondPlayerSymbol = firstPlayerSymbol === 'X' ? 'O' : 'X'; 

        doc.querySelector('.board').addEventListener('click', () => {
            if(playGame(firstPlayerSymbol, secondPlayerSymbol) !== 'continue') 
                doc.querySelector('.result>span').innerText = playGame(firstPlayerSymbol, secondPlayerSymbol);
        })
    })
})(document); 

