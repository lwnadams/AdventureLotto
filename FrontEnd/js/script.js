//Scroll to the bottom for initial code loaded outside functions.

function changeBet(x){ //'x' represents the button ID (0 to 3), and the function loads the page based on that button. The buttons are tabs that represent different betting options.
    if(gameInProgress) {location.reload()} //If user changes the button/tab mid game this variable will be true and the page will refresh.
    let buttons = document.querySelectorAll(".play-game-buttons");
    
    for (let i = 0; i < buttons.length; i++){
        document.querySelector("#b"+i).classList.remove("JS-button-pressed") //Removes CSS class from any previous buttons not selected.
    }

    document.querySelector("#b"+x).classList.add("JS-button-pressed") //Adds CSS class to new button as to ensure only the selected button is decorated.
    drawSquares(x) //calls function that creates the appropriate amount of digits for the button/bet selected.
}

function drawSquares(x){
    let session = window.localStorage; //These two lines set the current button ID in local storage, protected from browser refresh, so if browser refreshes page, the previous button they were working on will be loaded.
    session.setItem("button", x);

    //Draws 2 boxes that every game would have. Up to this point HTML code is empty for lottery boxes. Javascript draws everything.
    divLottery.innerHTML = '<div id="o0", class="play-game-random-digit"></div><div id="o1", class="play-game-random-digit"></div>'
    divInput.innerHTML = '<input type="number" id="i0", class="play-game-inputs", name="quantity" min="0" max="9"><input type="number" id="i1", class="play-game-inputs", name="quantity" min="0" max="9">'
    
    for (let i = 2; i <= x+2; i++){ //Iterates drawing the appropriate amount of boxes for the appropriate lottery selected, defined by variable x.
        let newDigitOut = document.createElement("div"); //Next 4 lines draw output lottery boxes in HTML and use the for loop iterations to define ID's for each box.
        newDigitOut.classList.add('play-game-random-digit')
        newDigitOut.id = 'o'+i
        divLottery.appendChild(newDigitOut)

        let newDigitIn = document.createElement("input"); //Next 4 lines do the same thing for input boxes with added HTML parameters that include limitation to numbers only.
        newDigitIn.classList.add('play-game-inputs')
        newDigitIn.id = 'i'+i
        newDigitIn.type = 'number'
        newDigitIn.min = '0'
        newDigitIn.max = '9'
        divInput.appendChild(newDigitIn)
    }

}

async function djangoGuess(userNumbers){ //Fetch function.
    try{        
    const ipResponse = await fetch("https://ipinfo.io/json") //Code collects IP address so if user wins, there is a way to identify them. If their computer crashes and they're unable to submit a winning form, they can still contact with their IP to claim victory.
    const IP = await ipResponse.json()
    console.log(IP.ip)

    const res = await fetch('http://127.0.0.1:8000/sendGuess/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //JS sends usersNumber to django so only backend verification can prove victory. Protects front end from tampering and hacking.
            ipAddress: IP.ip,
            userNumber: userNumbers.join(''), //Turns array of numbers into single string.
            forceWin: forceWin //If user wants to force win for concept purposes, this will tell Django to replicate userNumber instead of randomize.
        }),
    })

    const data = await res.json()
    console.log(data)
    pcNumbers = data.pcNumber.split('') //Turns pcNumber into an array to match the format of userNumbers.
    compareNumbers(userNumbers, pcNumbers) //Function to look at the numbers.
    } catch(error) { //If any of the API code fails, JS will throw this error and reload.
        alert("Ooops! Error connecting to backend, or error catching IP address. Please try again later: "+error)
        location.reload()
    }

}

async function djangoFormSubmit(event, email, name, sortCode, accountNumber){ //Fetch functions. Sends form details to django so winner can be paid.
    event.preventDefault()
    try{
        const ipResponse = await fetch("https://ipinfo.io/json")
        const IP = await ipResponse.json()

        const res = await fetch('http://127.0.0.1:8000/claimWin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ipAddress: IP.ip,
                email: email,
                name: name,
                sortCode: sortCode,
                accountNumber: accountNumber
            }),
        })
        const data = await res.json()
        console.log(data)
        alert("Submitted successfully!")
        location.reload()
    } catch(error) {alert("Ooops! Error processing the request. To claim victory, please try again or contact site owner and provide IP address to prove victory: "+error)}
    }




function compareNumbers(userNumbers, pcNumbers){ //Takes the arrays of userNumbers and pcNumberNumbers and throws each digit to function to 'delay()', 1000ms apart
    for (let i = 0; i < userNumbers.length+1; i++){
        setTimeout(delay, i*1000, i, userNumbers, pcNumbers)
    }
}

function delay(i, userNumbers, pcNumbers) { //function looks at each digit.
    if (i === userNumbers.length) { //Executed on the last round.
        console.log(userNumbers.join())
        console.log(pcNumbers.join())
        if (userNumbers.join() == pcNumbers.join()) {userVictory()} //Should all numbers match, the winning function is called. All numbers have to match.
        else {
            alert("Aww BUMMER!! Unfortunately no victory this time. Better luck next time!") //On loss, page is refreshed.
            location.reload()
        }
        return
    }
    let outBox = document.querySelector('#o'+i) //Next 14 lines of code draws the numbers and changes the box colors to match whether the user won or not.
    outBox.innerHTML = '<h1>'+pcNumbers[i]+'</h1>'
    outBox.style.color = 'rgb('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+')' //This line changes the color of the output number to a random color.
    const winColor = 'gold'
    const loseColor = 'red'
    if (userNumbers[i] === pcNumbers[i]){
    document.querySelector('#i'+i).style.borderColor = winColor
    document.querySelector('#o'+i).style.borderColor = winColor
    } else {
    document.querySelector('#i'+i).style.borderColor = loseColor
    document.querySelector('#o'+i).style.borderColor = loseColor
    }
    } 

function inputSelect(e){
    e.select();
}

function userVictory(){ //Function is only called if user has won
    alert("OMG, you WON!! Please fill out the form to claim the appropriate cash prize.")
    //Next 13 lines draw the HTML of the form. For each form input the template data in each input field is sent to inputSelect() just so the text can be highlighted for easy edit.
    //On submit, values are sent to djangoFormSubmit() so they can be sent to django.
    divGameParent.innerHTML = ` 
    <div class='play-game-victory-title'>
       <h1>VICTORY FORM!</h1>
       <P>Congratulations! All your numbers matched! In order to receive winnings, please fill out the form. DO NOT REFRESH THE PAGE!</P>
    </div>
    <form class='play-game-victory-form'>
        <input class = "play-game-victory-inputs", id="wi1", type="text", onclick='inputSelect(document.querySelector("#wi1"))', value="Email"/><br>
        <input class = "play-game-victory-inputs", id="wi2", type="text", onclick='inputSelect(document.querySelector("#wi2"))', type="text" value="Full Name"/><br>
        <input class = "play-game-victory-inputs", id="wi3", type="text", onclick='inputSelect(document.querySelector("#wi3"))', type="text" value="Sort Code"/><br>
        <input class = "play-game-victory-inputs", id="wi4", type="text", onclick='inputSelect(document.querySelector("#wi4"))', type="text" value="Account Number"/><br>
        <input class = "play-game-victory-submit-button", type="submit", value="Submit", onclick='djangoFormSubmit(event, document.querySelector("#wi1").value, document.querySelector("#wi2").value, document.querySelector("#wi3").value, document.querySelector("#wi4").value)'/>
    </form>
    `
    divGameParent.style.overflow = "auto"
}

function toNext(key){//Moves focus to next box after user enters a number.
    if (isFinite(key.key)){
        let id = key.target.id;
        let nextBox = document.querySelector('#'+id[0]+String(Number(id[1])+1)) //ID of next box.
        if (nextBox) { //If the next box exists ie. if its not on the last box.
            nextBox.focus(); //Focus cursor on that box.
            nextBox.select(); //Highlights any text that may already be in the box.
        } else {
            document.querySelector('.play-game-submit-button').focus() //Focuses on submit button after last digit is entered.
        }
    }
}

let gameInProgress = false //On first load. Set to global.
let forceWin = confirm("Would you like to force win? CONCEPT ONLY. By clicking OK, user forces lottery to win allowing functions that execute upon user victory to be demonstrated."); //Only for concept version. Allows observer to examine functionality on user win.
let divGameParent = document.querySelector('.play-game-container') //Parent container for the dynamic javascript section.
let divLottery = document.querySelector('.play-game-lottery-container'); //Container for the lottery response.
let divInput = document.querySelector('.play-game-input-numbers-container'); //Container for where the user inputs numbers.




try { //If the page is refreshed whilst the user was working on a specific button tab, the button ID will be stored in window.localStorage, protected from page reload.
    let session = window.localStorage;
    let firstButton = session.getItem("button")
    console.log(firstButton)
    changeBet(Number(firstButton))
} catch {
    changeBet(0) //If the user has deleted cookies or browses for the first time, retrieving session from the 'try' statement will fail and within the catch statement the default button ID of '0' will be processed in function changBet().
}

//The next 3 lines of code make sure any input box selected that has data already inside can be highlighted for edit. Inspired by Natwest OPT for maximum user interface.
document.querySelector('.play-game-input-numbers-container').addEventListener("click", (input) =>{
document.querySelector('#'+input.target.id).select()
})

//The next block of code ensures only certain conditions can be met when typing into the number boxes.
divInput.addEventListener("keydown", function(key) {
    let id = key.target.id;
    let inputBox = document.querySelector('#'+id) //Extract HTML ID of the box the user is attempting to type in.
    const invalidChars = ["-","+","e"];
    if (key.key === 'Backspace'){ //If the user wants to backspace, we don't want to stop this, we let the user do it and return from the function.
        return
    } else if (invalidChars.includes(key.key)) { //The HTML code prohibits use of letters, only numbers are accepted. The array of invalid characters above are registered as numbers by JS so as a workaround, if the user enters any of these, its prevented and the function is aborted.
        key.preventDefault()
        return
    } else if (document.getSelection().toString().length > 0) { //"If a number is entered whilst content is highlighted", it executes the async timeout function and doesn't prevent the key press.
        setTimeout(toNext, 10, key) //toNext function moves the key focus to the next box, executed after 10ms so HTML has a chance to print the number in the current box.
    } else if (inputBox.value) { //If the box is already occupied (yet not highlighted as previously looked at), box is treated as full (limited to one digit) and key press is prevented.
        key.preventDefault()
        return
    } else {
        setTimeout(toNext, 10, key) //If the box is simply empty, no special conditions above, key is allowed and toNext() moves to next box.
    }
  }) //After this block no code is submitted until user interacts, usually by pressed submit 'button'.


const form = document.querySelector('form'); 
form.addEventListener('submit', function(event) { //Submit button after user enters numbers.
    event.preventDefault(); //Stops page reloading.
    if (gameInProgress) {return} //Set to 'false' if user is playing for first time since page reload, otherwise user is prevented from pressing submit during game by returning from function.
    let count = document.querySelectorAll('.play-game-inputs').length //Counts number of user digits available to input.
    let userNumbers = []
    for (let i = 0; i < count; i ++){ //For loop iterates through each box and checks if there's a value inside. The function above has already ensured only valid digits are inside.
        id = '#'+'i'+i //identifies box HTML ID each iteration.
        let currentBox = document.querySelector(id).value //Collects users entered value and stores is in 'currentBox'.
        if (currentBox === ''){ //If any boxes are empty function will break and code will tell user to enter a number.
            alert("Whoops! Please enter a number!")
            return
        } else{
            userNumbers.push(currentBox) //Adds current box to array of users values.
        }
    }
    gameInProgress = true //If user interrupts the game, this condition will alter the codes response
    pcNumbers = djangoGuess(userNumbers) //fetch function
}); 

