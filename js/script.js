function changebet(x){

    let buttons = document.querySelectorAll(".play-game-buttons");
    
    for (let i = 0; i < buttons.length; i++){
        
       // document.querySelector("#b"+i).onclick = null
        document.querySelector("#b"+i).classList.remove("JS-button-pressed")
    }

    
    document.querySelector("#b"+x).classList.add("JS-button-pressed")
    drawSquares(x)

}

function drawSquares(x){

    divlottery.innerHTML = '<div id="#0", class="play-game-random-digit"></div><div id="#1", class="play-game-random-digit"></div>'
    divinput.innerHTML = '<input type="number" id="i0", class="play-game-inputs", name="quantity" min="0" max="9"><input type="number" id="i1", class="play-game-inputs", name="quantity" min="0" max="9">'
    
    for (let i = 2; i <= x+2; i++){

        let newDigitOut = document.createElement("div");
        newDigitOut.classList.add('play-game-random-digit')
        newDigitOut.id = '#'+i
        newDigitOut.textContent = 'cunt '+i;
        divlottery.appendChild(newDigitOut)

        let newDigitin = document.createElement("input");
        newDigitin.classList.add('play-game-inputs')
        newDigitin.id = 'i'+i
        newDigitin.type = 'number'
        newDigitin.min = '0'
        newDigitin.max = '9'
        divinput.appendChild(newDigitin)
    }

}
/*
function beenClicked(id){
    alert("ID "+id+" has been clicked")
}*/

let divlottery = document.querySelector('.play-game-lottery-container');
let divinput = document.querySelector('.play-game-input-form');
var invalidChars = ["-","+","e",];

document.querySelector("#b0").click()

divinput.addEventListener("keydown", function(key) {
    setTimeout(myFunc, 10, key)
  })


  
function myFunc(key){
    if (invalidChars.includes(key.key)) {
        key.preventDefault();
    }
    if (isFinite(key.key)){
    //if (key.key === '1' || key.key === '2' || key.key === '3' || key.key === '4' || key.key === '5' || key.key === '6' || key.key === '7' || key.key === '8' || key.key === '9' || key.key === '0'){
        let id = key.target.id;
        let nextBox = id[0]+String(Number(id[1])+1)

        document.querySelector('#'+nextBox).focus();
    }
}

/*
divinput.addEventListener("keyup", (key) => {
    setTimeout(code, delay)
    if (isFinite(key.key)){
    //if (key.key === '1' || key.key === '2' || key.key === '3' || key.key === '4' || key.key === '5' || key.key === '6' || key.key === '7' || key.key === '8' || key.key === '9' || key.key === '0'){
        alert(key.key)
        let id = key.target.id;
        
        let nextBox = id[0]+String(Number(id[1])+1)

        document.querySelector('#'+nextBox).focus();
    }
})

*/