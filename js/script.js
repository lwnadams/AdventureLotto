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



    divlottery.innerHTML = '<div id="o0", class="play-game-random-digit"></div><div id="o1", class="play-game-random-digit"></div>'
    divinput.innerHTML = '<input type="number" id="i0", class="play-game-inputs", name="quantity" min="0" max="9"><input type="number" id="i1", class="play-game-inputs", name="quantity" min="0" max="9">'
    
    for (let i = 2; i <= x+2; i++){

        let newDigitOut = document.createElement("div");
        newDigitOut.classList.add('play-game-random-digit')
        newDigitOut.id = 'o'+i
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

function django(count){
    pcNumbers = []
    for (let i = 0; i < count; i++){
        computerNumber = Math.floor(Math.random() * 10)
        pcNumbers.push(computerNumber)
    }
    return pcNumbers
}

function compareNumbers(userNumbers, pcNumbers){
        for (let i = 0; i < userNumbers.length; i++){
            let outBox = document.querySelector('#o'+i)
            outBox.innerHTML = '<h1>'+pcNumbers[i]+'</h1>'
            outBox.style.color = 'rgb('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+')'
        }
}


function userVictory(){}


let divlottery = document.querySelector('.play-game-lottery-container');
let divinput = document.querySelector('.play-game-input-numbers-container');

document.querySelector('.play-game-input-numbers-container').addEventListener("click", (input) =>{
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


const form = document.querySelector('form'); 
form.addEventListener('submit', function(event) { 
  event.preventDefault(); 
  let count = document.querySelectorAll('.play-game-inputs').length
  let userNumbers = []
  for (let i = 0; i < count; i ++){
    id = '#'+'i'+i
    let currentBox = document.querySelector(id).value
    if (currentBox === ''){
        alert("Whoops! Please enter a number!")
        return
    } else{
        userNumbers.push(currentBox)
    }
  }
  pcNumbers = django(count)
  compareNumbers(userNumbers, pcNumbers)
}); 

