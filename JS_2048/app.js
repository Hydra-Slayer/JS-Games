document.addEventListener('DOMContentLoaded', ()=>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    const width = 4
    let tiles = []
    let score = 0;
    function createBoard() {
        for(let i = 0; i<width * width; i++){
            const tile = document.createElement('div')
            tile.innerHTML = 0
            gridDisplay.appendChild(tile)
            tiles.push(tile)
        }
        generate()
        generate()
    }
    createBoard()

    function generate(){
        const randomNumber = Math.floor(Math.random() * tiles.length)
        
        if(tiles[randomNumber].innerHTML==0){
            tiles[randomNumber].innerHTML=2
            //checkGameOver()
        }
        else generate()
    }
    function moveRight(){
        for(let i = 0; i<16; i++){
            if(i%4==0){
                let totalOne = tiles[i].innerHTML;
                let totalTwo = tiles[i+1].innerHTML;
                let totalThree = tiles[i+2].innerHTML;
                let totalFour = tiles[i+3].innerHTML;
                let rows = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                console.log(rows);
                let filteredRow = rows.filter(num => num)
                let missing = 4-filteredRow.length;
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow);
                tiles[i].innerHTML = newRow[0];

                tiles[i+1].innerHTML = newRow[1];
                tiles[i+2].innerHTML = newRow[2];
                tiles[i+3].innerHTML = newRow[3];
            }
        }
    } 
    function combineRows(){
        for(let i = 0; i<15; i++){
            if(tiles[i].innerHTML === tiles[i+1].innerHTML){
                let combinedTotal = parseInt(tiles[i].innerHTML) * 2;
                tiles[i].innerHTML = combinedTotal;
                tiles[i+1].innerHTML = 0;
                score+= combinedTotal;
            }
        }
    }
   /////assign controls
    function control(e){
        if(e.key === 'ArrowLeft'){
            // keyLeft();
        }
        else if (e.key === 'ArrowRight'){
            keyRight();
        }
    } 
    document.addEventListener('keydown', control);
    function keyRight(){
        moveRight()
        combineRows()
        moveRight()
        generate()
    }
})