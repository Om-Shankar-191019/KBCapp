const kbcQuestions = 
    [
        [{
            question:"Who is the Prime minister of India?",
            a:"Manmohan Singh",
            b:"Nitesh Kumar",
            c:"Narendra Modi",
            d:"Shushil Modi",
            correct:"Narendra Modi",
        }],
        [{
            question:"Who is the governor of bihar?",
            a:"Phagu Chauhan",
            b:"Nitesh Kumar",
            c:"RamNath Kovind",
            d:"Sushil Modi",
            correct:"Phagu Chauhan",
        }],
        [{
            question:"In which state Kedarnath temple is located?",
            a:"Uttar Pradesh",
            b:"Himachal Pradesh",
            c:"Uttarakhand",
            d:"Jharkhand",
            correct:"Uttarakhand",
        }],
        [{
            question:"Where is the capital of Rajasthan?",
            a:"Raipur",
            b:"Jaipur",
            c:"Gandhi Nagar",
            d:"Shimla",
            correct:"Jaipur",
        }],
        [{
            question:"How many district are there in bihar?",
            a:"36",
            b:"38",
            c:"40",
            d:"41",
            correct:"38",
        }]
];
const page1Sound = new Audio("./sounds/Kaun_Banega_Crorepati_Bgm.mp3");
const welcomeSound = new Audio("./sounds/kbc_background.mp3")
const timerSound = new Audio("./sounds/Kbc Timer - Tik Tik KBC Clock.mp3");

let currentQuestIndex = 0;
let prevQuestIndex;
let currSetTimeoutId ;


const stopWatch = ()=>{
    tikTikSound();
}
const tikTikSound = ()=>{
    document.querySelector(".timer").innerText = 30;
    timerSound.currentTime=0;
    timerSound.play();
    tikTikText();
}

const tikTikText = ()=>{
    let innerTextValue = document.querySelector(".timer").innerText;
    if(innerTextValue>0)
    {
        innerTextValue--;
        document.querySelector(".timer").innerText = innerTextValue;
        clearTimeout(currSetTimeoutId);
        currSetTimeoutId = setTimeout(tikTikText,1000);
    }
}

const optButtonDisabled = ()=>{
    document.querySelectorAll(".answer-opt").forEach((e)=>{
        e.classList.add("pointer-events-none");
    })
}

const correctOptionAnsEle = ()=>{
    obj = kbcQuestions[currentQuestIndex][0];
    for(let items in obj)
    {
        if(obj[items] == correctAns)
            return items;
    }
}

//Result Analysis--------
const resultAnalysis = (e)=>{
    contestantAnsObject = e.childNodes;
    contestantAns = contestantAnsObject[1].nodeValue;
    correctAns = kbcQuestions[currentQuestIndex][0].correct;
    if(contestantAns == correctAns)
    {
        document.getElementById("result").innerText = "Correct Answer";
        e.style.backgroundColor = "greenyellow";
    }
    else
    {
        document.getElementById("result").innerText = "Wrong Answer";
        e.style.backgroundColor = "lightcoral";
        correctOptionId = correctOptionAnsEle();
        document.getElementById(correctOptionId).style.backgroundColor = "greenyellow";
        document.getElementById(correctOptionId).style.color = "black";
    }
}

const disableNextButton = ()=>{
    document.getElementById("Next").classList.add("pointer-events-none");
}

const enableNextButton = ()=>{
    document.getElementById("Next").classList.remove("pointer-events-none");
}

const bulletTimeout = (flag,bullets,clearTimeoutId,e)=>{
    if(flag==3)
        {
            document.querySelector("#game-area-result").classList.remove("checking-bullets-container");
            let resultBack = `<div id="result" class="result">Welcome to Kaun Banega Crorepati</div>`;
            document.getElementById("game-area-result").innerHTML = resultBack;
            resultAnalysis(e);
            enableNextButton();
        }
    else
      {
          let ele = document.querySelector(".checking-bullets-container");
          ele.innerHTML = bullets;
          ele.children[flag].style.backgroundColor = "gold";
          clearTimeout(clearTimeoutId);
          flag++;
          clearTimeoutId = setTimeout(bulletTimeout,800,flag,bullets,clearTimeoutId,e);
      }

    }

const bulletsRunning = (e)=>{
    document.querySelector("#game-area-result").classList.add("checking-bullets-container");
    let bullets = `
      <div class="bullets"></div>
      <div class="bullets"></div>
      <div class="bullets"></div>
    `
    disableNextButton();
    let clearTimeoutId;
    let flag=0;
    bulletTimeout(flag,bullets,clearTimeoutId,e);
}

// on click any option by the player----------
const optionFun = ()=>{
    document.querySelectorAll(".answer-opt").forEach((e)=>{
        // e.addEventListener("click",pickAnyOption(e));
        e.addEventListener("click",()=>{
            e.style.backgroundColor = "gold";
            e.style.color = "black";
            clearStopWatch();
            optButtonDisabled();
            // resultAnalysis(e);
            bulletsRunning(e);
        })
    })
}

const buildKBCquestions = ()=>{
    const kbcQuestionsContent = `
        <div class="timer-container">
            <div class="timer">0</div>
        </div>
        <div class="question-box">
            <div class="question">${kbcQuestions[currentQuestIndex][0].question}</div>
        </div>
        <div class="answer-box">
            <div id="a" class="answer-opt"><span>A)</span>${kbcQuestions[currentQuestIndex][0].a}</div>
            <div id="b" class="answer-opt"><span>B)</span>${kbcQuestions[currentQuestIndex][0].b}</div>
            <div id="c" class="answer-opt"><span>C)</span>${kbcQuestions[currentQuestIndex][0].c}</div>
            <div id="d" class="answer-opt"><span>D)</span>${kbcQuestions[currentQuestIndex][0].d}</div>
        </div>
    `;

    document.querySelector(".game-area-ques-ans").innerHTML = kbcQuestionsContent;
    optionFun();
}


const clearStopWatch = ()=>{
    clearTimeout(currSetTimeoutId);
    timerSound.pause();
}

const nextButtonFun = ()=>{
    if(currentQuestIndex < kbcQuestions.length-1)
    {
        currentQuestIndex++;
        buildKBCquestions();
        buildMoneyArea();
        questForSpecificPrizeMoney();
        clearStopWatch();
        stopWatch();
    }
}

const buildMoneyArea = ()=>{
    let moneyAreaPrizes = `
            <div id="0" class="each-prize">1000</div>
            <div id="1" class="each-prize">2000</div>
            <div id="2" class="each-prize">3000</div>
            <div id="3" class="each-prize">5000</div>
            <div id="4" class="each-prize">10,000</div>
            <div id="5" class="each-prize">20,000</div>
            <div id="6" class="each-prize">40,000</div>
            <div id="7" class="each-prize">80,000</div>
            <div id="8" class="each-prize">1,60,000</div>
            <div id="9" class="each-prize">3,20,000</div>
            <div id="10" class="each-prize">6,40,000</div>
            <div id="11" class="each-prize">12,50,000</div>
            <div id="12" class="each-prize">25,00,000</div>
            <div id="13" class="each-prize">50,00,000</div>
            <div id="14" class="each-prize">1 Crore</div>
    `;
    document.querySelector("#money-area").classList.add("money-area");
    document.querySelector("#money-area").innerHTML = moneyAreaPrizes;
    let prizeId = `${currentQuestIndex}`;
    document.getElementById(prizeId).style.backgroundColor = "blueviolet";
    document.getElementById(prizeId).style.borderRadius = "5px";
}

const questForSpecificPrizeMoney = ()=>{
    let prizeId = `${currentQuestIndex}`;
    let prizeValue = document.getElementById(prizeId).innerText ;
    document.getElementById("result").innerText = `Question for ${prizeValue}`;
}

document.querySelector(".lets-play-container").addEventListener("click",()=>{
    buildKBCquestions();
    buildMoneyArea();
    questForSpecificPrizeMoney();
    welcomeSound.pause();
    stopWatch();
    document.querySelector("#Next").addEventListener("click",nextButtonFun);
})

document.querySelector("#Quit").addEventListener("click",()=>{
    document.querySelector(".timer").innerText = 0;
});



const openingSound = ()=>{
    page1Sound.currentTime = 0;
    page1Sound.play();
}

const WelcomeSound = ()=>{
    welcomeSound.currentTime = 0;
    welcomeSound.play();
}

// just to show the money stack before the game begins..
const showMoneyStack = ()=>{
    let moneyAreaPrizes = `
            <div id="0" class="each-prize">1000</div>
            <div id="1" class="each-prize">2000</div>
            <div id="2" class="each-prize">3000</div>
            <div id="3" class="each-prize">5000</div>
            <div id="4" class="each-prize">10,000</div>
            <div id="5" class="each-prize">20,000</div>
            <div id="6" class="each-prize">40,000</div>
            <div id="7" class="each-prize">80,000</div>
            <div id="8" class="each-prize">1,60,000</div>
            <div id="9" class="each-prize">3,20,000</div>
            <div id="10" class="each-prize">6,40,000</div>
            <div id="11" class="each-prize">12,50,000</div>
            <div id="12" class="each-prize">25,00,000</div>
            <div id="13" class="each-prize">50,00,000</div>
            <div id="14" class="each-prize">1 Crore</div>
    `;
    document.querySelector("#money-area").classList.add("money-area");
    document.querySelector("#money-area").innerHTML = moneyAreaPrizes;
}

// adding modal on clicking sitHotSeat button
const sitOnTheHotSeatFun = ()=>{
    let contestantName = document.getElementById("contestant-name-input").value;
    if(contestantName=="")
        contestantName = "Anonymous";
    page1Sound.pause();
    WelcomeSound();
    document.getElementById("page2").classList.add("show-modal");
    document.getElementById("contestant-name").innerText = contestantName;
    showMoneyStack();
}
document.getElementById("sitOnTheHotSeat").addEventListener("click",sitOnTheHotSeatFun);



// adding modal on clicking rules button
document.getElementById("btn-rules").addEventListener("click",()=>{   
    document.getElementById("modal-container-rules").classList.add("show-modal");
})

document.getElementById("close-modal-btn").addEventListener("click",()=>{
    document.getElementById("modal-container-rules").classList.remove("show-modal");
})



//show that the button is clicked by flicking shadow
const allBtns = document.querySelectorAll('.btn');  
allBtns.forEach((ele)=>{
    ele.addEventListener("click",()=>{
        buttonSelect(ele);
        transitionEndListener(ele);
    })
})

const buttonSelect = (element)=>{
    element.style.boxShadow = "0px 0px 15px 3px rgb(64, 189, 189)";
}

const buttonDeselect = (element)=>{
    element.style.boxShadow = "none";
}

const transitionEndListener = (element)=>{
    element.addEventListener("transitionend",()=>{
        buttonDeselect(element);
    })
}

