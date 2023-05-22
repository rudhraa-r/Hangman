const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");


let options = {
    fruits: [
        "Apple",
        "Blueberry", "Mandarin", "Pineapple" , "Pomegranate" , "Watermelon",
    ],
    animals: ["Hedgehog", "Rhinoceros", "Squirrel" ,"Panther", "Walrus", "Zebra"],
    countries: [
        "India", "Hungary", "Kyrgyzstan","Switzerland", "Zimbabwe", "Dominica"
    ],
};

//count 
let winCount = 0;
let count =0;

let chosenWord = "";

//Display option buttons 
const displayOptions = () => {
    let buttonCon = document.createElement("div");
    for (let value in options) {
      buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
  };

const initializer = () => {
    winCount=0;
    count=0;

    userInputSection.innerHTML ="";
    optionsContainer.innerHTML="";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML="";

    //For creating letter buttons
    for(let i=65 ; i<91 ; i++){
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText=String.fromCharCode(i);

        button.addEventListener('click' , () =>{
            let charArray = chosenWord.split('');
            let dashes = document.querySelectorAll(".dashes");

            if(charArray.includes(button.innerText)){
                charArray.forEach((char , index) =>{
                    //if character in array is same as clciked buton
                    if(char === button.innerText){
                        //replace dash with letter
                        dashes[index].innerHTML=char;
                        //increment counter
                        winCount+= 1;
                        if(winCount == charArray.length) {
                            resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                            blocker();
                        }
                    }
                })
            }
            else{
                count+=1;
                //for drawing man
                drawMan(count);
                //count == 6 , head, body , left arm , right arm , left leg , right leg
                console.log(count);
                if(count == 6){
                    resultText.innerHTML = `<h2 class='lose-msg'>You Lose :( </h2><p>The word was <span>${chosenWord}</span></p>`;
                     blocker();      
                }
            }
            //disable clicked button
            button.disabled = true;
        })

        letterContainer.append(button);
    }

    displayOptions();
    //call to canvascreator
    let {initialDrawing} = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
}

const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    //For drawing lines 
    const drawLine = (fromX , fromY , toX , toY) => {
        context.moveTo(fromX , fromY);
        context.lineTo (toX, toY);
        context.stroke();
    };

    const head = () =>{
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2 , true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40 , 70 , 80);
    };

    const leftArm = () =>{
        drawLine(70,50,50,70);
    };

    const rightArm = () =>{
        drawLine(70,50,90,70);
    };

    const leftLeg = () =>{
        drawLine(70,80,50,110);
    };

    const rightLeg = () =>{
        drawLine(70,80,90,100);
    };

    //initial frame
const initialDrawing = () =>{
    //clear canvas
    context.clearRect(0, 0 , context.canvas.width , context.canvas.height);
    //bottom line
    drawLine(10,130,130,130);
    //left line
    drawLine(10,10,10,131);
    //top line
    drawLine(10,10,70,10);
    //small top line
    drawLine(70,10,70,20);
};

return {initialDrawing,head,body,leftArm,rightArm , leftLeg,rightLeg};

};

const drawMan = (count) => {
    let { head , body , leftArm , rightArm , leftLeg , rightLeg} = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
}


newGameButton.addEventListener("click", initializer);
window.onload = initializer;

const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");

    optionsButtons.forEach((button) =>{
        if(button.innerHTML === optionValue){
            button.classList.add("active");
        }
        button.disabled= true;
    });

    letterContainer.classList.remove("hide");
    userInputSection.innerText="";

    let optionArray = options[optionValue];
    //choose random word
    
    chosenWord = optionArray[Math.floor(Math.random()*optionArray.length)]
    chosenWord = chosenWord.toUpperCase();
    console.log(chosenWord); 

    //replace each element with dash and display

    let displayItem = chosenWord.replace(/./g , '<span class = "dashes"> -</span>');
    userInputSection.innerHTML = displayItem;
}

const blocker = ()=>{
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

    optionsButtons.forEach((button) => {
        button.disabled =true;
    })

    letterButtons.forEach((button)=>{
        button.disabled = true;
    })
    newGameContainer.classList.remove("hide");
}


 










