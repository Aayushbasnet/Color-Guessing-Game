const rgbColor = document.querySelector('#rgbColor');
const boxes = document.querySelectorAll('.box');
const easyBtn = document.querySelector('.easyBtn');
const hardBtn = document.querySelector('.hardBtn');
const playBtn = document.querySelector('.playBtn');
const gameStatus = document.querySelector('.status');
const gameHeader = document.querySelector('.game-header');
const colorSelection = document.querySelector('.color-selection');
var boxCount = 6;       // default box value
var playingGame = false;

class ColorGame{
    constructor(boxCount){
        this.boxCount = boxCount;
        this.colors = [];
        this.reset();
    }

    // resetting game UI
    reset(){
        // game status
        gameStatus.textContent = "Let's Play !!!";
        gameHeader.style.backgroundColor = "rgb(233, 119, 119)";
        colorSelection.style.background = "aliceblue";
        this.boxCount = this.boxCount;
    }

    // new game
    newGame(){
       this.colorPicker(); 
    }

    // Generates random rgb color
    rgbGenerator() {
        const r = Math.floor(Math.random()*256);
        const g = Math.floor(Math.random()*256);
        const b = Math.floor(Math.random()*256);
        return `rgb(${r}, ${g}, ${b})`
    };

    // Picks random color according to boxcount
    colorPicker() {
        for(let i=0; i < this.boxCount; i++){
            this.colors.push(this.rgbGenerator());
        }
        console.log(this.colors);
        this.updateBoxBg();
        return this.colors;
    }

    // update bg-color in box
    updateBoxBg() {
        const pickedColor = this.colors[Math.floor(Math.random() * this.boxCount)];     // selects random color from this.colors
        rgbColor.textContent = pickedColor;     // Displaying Question
        gameStatus.textContent = 
            `
                Playing !!  
            `;
        var i = 0;
        // assigning random color to each (3 or 6) boxes 
        boxes.forEach(box => {
            if(this.colors[i]){
                box.style.backgroundColor = this.colors[i];
                box.style.display = "block";
            }else {
                box.style.display = "none";
            } 
            i++;
        });       
    }
}

// when players picks correct answer
const win = () =>{
    gameStatus.textContent = "Congratulations! You won";
    gameHeader.style.backgroundColor = rgbColor.textContent;
    colorSelection.style.background = rgbColor.textContent;
    boxes.forEach(box => {
        box.style.backgroundColor = rgbColor.textContent;
    });
}

// when players pick wrong answer
function lose(box) {
    gameStatus.textContent = "Please Try Again!";
    box.style.backgroundColor = "aliceblue";
}


// Easy button clicking
easyBtn.addEventListener('click', function() {
    playingGame = true;
    boxCount = 3;     // box value
    easyBtn.style.backgroundColor = "#BAFFB4";      // changing bg color of easy button on click
    hardBtn.removeAttribute("style");     // removing bg color of hard button if any
    gameHeader.lastElementChild.textContent = "Guess the color above";
    const easyGame = new ColorGame(boxCount);       // creating colorgame object with box value 3
    easyGame.colorPicker();
});

// Hard button clicking
hardBtn.addEventListener('click', function() {
    playingGame = true;
    boxCount = 6;     // box value
    easyBtn.removeAttribute("style");      // changing bg color of easy button on click
    hardBtn.style.backgroundColor = "#BAFFB4";     // removing bg color of hard button if any
    gameHeader.lastElementChild.textContent = "Guess the color above";
    const hardGame = new ColorGame(boxCount);       // creating colorgame object with box value 6
    hardGame.colorPicker();
});

// play button clicked
playBtn.addEventListener('click', function(){
    playingGame = true;
    gameHeader.lastElementChild.textContent = "Guess the color above";
    const newGame = new ColorGame(boxCount);
    newGame.newGame();
});

// when boxes are clicked

boxes.forEach(function (box){
        box.addEventListener('click', function(){
            if(playingGame){
                if(box.style.backgroundColor === rgbColor.textContent.toLowerCase()){
                    win();
                }else {
                    lose(this);
                }
            }else{
                gameStatus.textContent = "Press New color or level";
            }
        });
    
});

