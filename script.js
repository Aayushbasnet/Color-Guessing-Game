const rgbColor = document.querySelector('.rgbColor');
const boxes = document.querySelectorAll('.box');
const easyBtn = document.querySelector('.easyBtn');
const hardBtn = document.querySelector('.hardBtn');
const playBtn = document.querySelector('.playBtn');
const gameStatus = document.querySelector('.status');

class ColorGame{
    constructor(boxCount){
        this.boxCount = boxCount;
        this.colors = [];
    }

    // resetting game
    reset(){
        // game status
        gameStatus.textContent = "Let's Play !!!";
        boxes.forEach(box => {
            box.style.backgroundColor = "white";
        });
        this.boxCount = 6;
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
        return this.colors;
    }

    // update bg-color in box
    updateBoxBg() {
        
    }

}

const game = new ColorGame(6);
easyBtn.addEventListener('click', function() {
    const boxCount = 3;
    const easyGame = new ColorGame(boxCount);
    console.log(easyGame.boxCount);
    console.log(easyGame.colorPicker());
})
console.log(game.boxCount);
console.log(game.colorPicker());