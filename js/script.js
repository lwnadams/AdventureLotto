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
        newDigitOut.textContent = 'test '+i;
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

function myFunc(key){
    if (isFinite(key.key)){
        let id = key.target.id;
        let nextBox = document.querySelector('#'+id[0]+String(Number(id[1])+1))
        if (nextBox) {
            nextBox.focus();
            nextBox.select();
        } else {
            document.querySelector('.play-game-submit-button').focus()
        }
    }
}


let divlottery = document.querySelector('.play-game-lottery-container');
let divinput = document.querySelector('.play-game-input-form');

document.querySelector(".play-game-input-form").addEventListener("click", (input) =>{
    document.querySelector('#'+input.target.id).select()
})


document.querySelector("#b0").click()

divinput.addEventListener("keydown", function(key) {
    let id = key.target.id;
    let inputBox = document.querySelector('#'+id)
    const invalidChars = ["-","+","e"];
    if (key.key === 'Backspace'){
        return
    } else if (invalidChars.includes(key.key)) {
        key.preventDefault()
        return
    } else if (document.getSelection().toString().length > 0) {
        setTimeout(myFunc, 10, key)
    } else if (inputBox.value) {
        key.preventDefault()
        return
    } 
    setTimeout(myFunc, 10, key)
  })

