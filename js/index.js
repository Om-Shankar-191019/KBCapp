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
        }],
        [{
            question:"In which year India got independence?",
            a:"1945",
            b:"1947",
            c:"1948",
            d:"1951",
            correct:"1947",
        }]
];
const page1Sound = new Audio("./sounds/Kaun_Banega_Crorepati_Bgm.mp3");
const welcomeSound = new Audio("./sounds/page2_kbc_intro_audio.mp3")
const timerSound = new Audio("./sounds/Kbc Timer - Tik Tik KBC Clock.mp3");
const wrongAnswerSound = new Audio("./sounds/wrong_with_dramatic.mp3");
const correctAnswerSound = new Audio("./sounds/kbc_background.mp3");
const answerLockSound = new Audio("./sounds/ans_lock2.mp3");
const lifelineComesUpSound = new Audio("./sounds/lifeline-comesUp.mp3");
const audiencePollSound = new Audio("./sounds/audience_poll.mp3");

let currentQuestIndex = 0;
let prevQuestIndex;
let currSetTimeoutId ;

let lifelineFlag = {
    audiencePollFlag : 1,
    flipTheQuestionFlag : 1,
    fiftyFiftyFlag : 1,
    doubleDipFlag : 1,
}

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

const clearStopWatch = ()=>{
    clearTimeout(currSetTimeoutId);
    timerSound.pause();
}

const optButtonDisabled = ()=>{
    document.querySelectorAll(".answer-opt").forEach((e)=>{
        e.classList.add("pointer-events-none");
    })
}

const optButtonEnabled = ()=>{
    document.querySelectorAll(".answer-opt").forEach((e)=>{
        e.classList.remove("pointer-events-none");
    })
}

const correctOptionAnsEle = (correctAns)=>{
    obj = kbcQuestions[currentQuestIndex][0];
    for(let items in obj)
    {
        if(obj[items] == correctAns)
            return items;
    }
}

const CorrectAnswerSound = ()=>{
    correctAnswerSound.currentTime = 0;
    correctAnswerSound.play();
}

const WrongAnswerSound = ()=>{
    wrongAnswerSound.currentTime = 0;
    wrongAnswerSound.play();
}

//Result Analysis--------
const resultAnalysis = (e)=>{
    answerLockSound.pause();
    contestantAnsObject = e.childNodes;
    contestantAns = contestantAnsObject[1].nodeValue;
    correctAns = kbcQuestions[currentQuestIndex][0].correct;
    if(contestantAns == correctAns)
    {
        CorrectAnswerSound();
        document.getElementById("result").innerText = "Correct Answer";
        e.style.backgroundColor = "greenyellow";
    }
    else
    {
        WrongAnswerSound();
        document.getElementById("result").innerText = "Wrong Answer";
        e.style.backgroundColor = "lightcoral";
        correctOptionId = correctOptionAnsEle(correctAns);
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
            let lifelineBox = `
                <div class="lifeline-box">
                    <div class="lifeline-item audience-poll">
                        <div id="audience-cross-one" class="cross-mark cross-one "></div>
                        <div id="audience-cross-two"  class="cross-mark cross-two "></div>
                    </div>
                    <div class="lifeline-item flip-the-question"></div>
                    <div class="lifeline-item fifty-fifty">
                        <div class="cross-mark cross-one "></div>
                        <div class="cross-mark cross-two "></div>
                    </div>
                    <div class="lifeline-item double-dip"></div>
                </div>
            `;
            let gameAreaFullItem = resultBack + lifelineBox;
            document.getElementById("game-area-result").innerHTML = gameAreaFullItem;
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

const AnswerLockSound = ()=>{
    answerLockSound.currentTime = 0;
    answerLockSound.play();
}

const clearScreenFromAudiencePoll = ()=>{
    document.querySelector(".audience-poll-outer-container").innerHTML = "";
}

const disableLifelineButton = ()=>{
    document.getElementById("lifeline-button").classList.add("pointer-events-none");
}

const enableLifelineButton = ()=>{
    document.getElementById("lifeline-button").classList.remove("pointer-events-none");
}

// on click any option by the player----------
const optionFun = ()=>{
    document.querySelectorAll(".answer-opt").forEach((e)=>{
        // e.addEventListener("click",pickAnyOption(e));
        e.addEventListener("click",()=>{
            AnswerLockSound();
            e.style.backgroundColor = "gold";
            e.style.color = "black";
            clearStopWatch();
            optButtonDisabled();
            bulletsRunning(e);
            clearScreenFromAudiencePoll();
            disableLifelineButton();
        })
    })
}


//Life-line.............
// flip the question lifeline -------------


// const flipTheQuestionCrossMark = ()=>{
//     let t = document.querySelector(".flip-the-question").children;
//     for(let i=0;i<t.length;i++)
//         t[i].classList.add("opacity-one");
// }

// const FiftyFiftySound = ()=>{
//     audiencePollSound.currentTime = 8.2;
//     audiencePollSound.play();
// }

// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
//     return array;
// }

// function correctAnsIndex(array,key){
//     for(let i=0;i<array.length;i++)
//     {
//         if(array[i]==key)
//             return i;
//     }
//     return 0;
// }

// const fiftyFiftyLogic = ()=>{
//     let arr = ["a","b","c","d"];
//     arr = shuffleArray(arr);
//     let correctAns = kbcQuestions[currentQuestIndex][0].correct;
//     correctOptionId = correctOptionAnsEle(correctAns);
//     ansIndex = correctAnsIndex(arr,correctOptionId);

//     temp = arr[0];
//     arr[0] = arr[ansIndex];
//     arr[ansIndex] = temp;

//     document.getElementById(arr[1]).innerText = "";
//     document.getElementById(arr[2]).innerText = "";
// }

// const fiftyFiftyHandler = ()=>{
//     lifelineFlag["fiftyFiftyFlag"] = 0;
//     document.querySelector(".lifeline-box").classList.remove("show-lifeline");
//     document.getElementById("result").innerText = "Implementing 50-50 ...";
//     document.querySelector(".fifty-fifty").classList.add("pointer-events-none");
//     fiftyFiftyCrossMark();
//     lifelineNum = document.querySelector(".lifeline-no").innerText ;
//     lifelineNum--;
//     document.querySelector(".lifeline-no").innerText = lifelineNum;
//     setTimeout(()=>{
//         document.getElementById("result").innerText = "Two Wrong Answers Removed!!";
//         FiftyFiftySound();
//         fiftyFiftyLogic();
//         enableLifelineButton();
//         optButtonEnabled();
        
//     },1500);
// }

// const fiftyFifty = ()=>{
//     if(lifelineFlag["fiftyFiftyFlag"])
//     {
//         document.querySelector(".fifty-fifty").addEventListener("click",fiftyFiftyHandler);
//     }
//     else
//     {
//         fiftyFiftyCrossMark();
//         document.querySelector(".fifty-fifty").classList.add("pointer-events-none"); 
//     }
// }
// 50-50 lifeline-----------

const fiftyFiftyCrossMark = ()=>{
    let t = document.querySelector(".fifty-fifty").children;
    for(let i=0;i<t.length;i++)
        t[i].classList.add("opacity-one");
}

const FiftyFiftySound = ()=>{
    audiencePollSound.currentTime = 8.2;
    audiencePollSound.play();
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function correctAnsIndex(array,key){
    for(let i=0;i<array.length;i++)
    {
        if(array[i]==key)
            return i;
    }
    return 0;
}

const fiftyFiftyLogic = ()=>{
    let arr = ["a","b","c","d"];
    arr = shuffleArray(arr);
    let correctAns = kbcQuestions[currentQuestIndex][0].correct;
    correctOptionId = correctOptionAnsEle(correctAns);
    ansIndex = correctAnsIndex(arr,correctOptionId);

    temp = arr[0];
    arr[0] = arr[ansIndex];
    arr[ansIndex] = temp;

    document.getElementById(arr[1]).innerText = "";
    document.getElementById(arr[2]).innerText = "";
}

const fiftyFiftyHandler = ()=>{
    lifelineFlag["fiftyFiftyFlag"] = 0;
    document.querySelector(".lifeline-box").classList.remove("show-lifeline");
    document.getElementById("result").innerText = "Implementing 50-50 ...";
    document.querySelector(".fifty-fifty").classList.add("pointer-events-none");
    fiftyFiftyCrossMark();
    lifelineNum = document.querySelector(".lifeline-no").innerText ;
    lifelineNum--;
    document.querySelector(".lifeline-no").innerText = lifelineNum;
    setTimeout(()=>{
        document.getElementById("result").innerText = "Two Wrong Answers Removed!!";
        FiftyFiftySound();
        fiftyFiftyLogic();
        enableLifelineButton();
        optButtonEnabled();
        
    },1500);
}

const fiftyFifty = ()=>{
    if(lifelineFlag["fiftyFiftyFlag"])
    {
        document.querySelector(".fifty-fifty").addEventListener("click",fiftyFiftyHandler);
    }
    else
    {
        fiftyFiftyCrossMark();
        document.querySelector(".fifty-fifty").classList.add("pointer-events-none"); 
    }
}
// audience-poll---------------

const audiencePollCrossMark = ()=>{
    let t = document.querySelector(".audience-poll").children;
    for(let i=0;i<t.length;i++)
        t[i].classList.add("opacity-one");
}


const audiencePollLogic = ()=>{
    let ans = getRandom(40,90);
    let one = getRandom(0,100-ans);
    let two = getRandom(0,100-ans-one);
    let three = 100-(ans+one+two);

    let correctAns = kbcQuestions[currentQuestIndex][0].correct;
    correctOptionId = correctOptionAnsEle(correctAns);
    
    let audienceOpt = ["a","b","c","d"];
    let audienceScore = [ans,one,two,three];

    for(let i=0;i<audienceOpt.length;i++)
    {
        if(audienceOpt[i]==correctOptionId)
        {
            let temp = audienceOpt[0];
            audienceOpt[0] = correctOptionId;
            audienceOpt[i] = temp;
            break;
        }
    }
    
    for(let i=0;i<audienceOpt.length;i++)
    {
        let percentageId = `percentage_${audienceOpt[i]}`;
        let barId = `bar_${audienceOpt[i]}`;
        document.getElementById(percentageId).innerText = audienceScore[i]+"%";
        document.getElementById(barId).style.height = audienceScore[i]+"%";
    }    
}

const audiencePollTimeout = (flag,justBeforeAudiencePoll,clearTimeoutId)=>{
    if(flag==8)
        {
            let audiencePollInnerContainer = `
                <div class="audience-poll-inner-container">
                    <div class="audience-percentage-box">
                        <div id="percentage_a" class="percentage">34%</div>
                        <div id="percentage_b" class="percentage">32%</div>
                        <div id="percentage_c" class="percentage">10%</div>
                        <div id="percentage_d" class="percentage">18%</div>
                    </div>
                    <div class="audience-bar-box">
                        <div id="bar_a" class="bar"></div>
                        <div id="bar_b" class="bar"></div>
                        <div id="bar_c" class="bar"></div>
                        <div id="bar_d" class="bar"></div>
                    </div>
                    <div class="audience-letter-box">
                        <div class="letter">A</div>
                        <div class="letter">B</div>
                        <div class="letter">C</div>
                        <div class="letter">D</div>
                    </div>

                </div>
            `;
            document.querySelector(".audience-poll-outer-container").innerHTML = audiencePollInnerContainer;
            audiencePollLogic();
            enableLifelineButton();
            optButtonEnabled();
        }
    else
      {
        let tempFlag = flag;
        if(tempFlag>3)
            tempFlag = flag-4;
        let ele = document.querySelector(".audience-poll-outer-container");
        ele.innerHTML = justBeforeAudiencePoll;
        ele.children[0].children[tempFlag].style.backgroundColor = "aqua";
        clearTimeout(clearTimeoutId);
        flag++;
        clearTimeoutId = setTimeout(audiencePollTimeout,1000,flag,justBeforeAudiencePoll,clearTimeoutId);
      }

}

const AudiencePollSound = ()=>{
    audiencePollSound.currentTime = 0;
    audiencePollSound.play();
}

const audiencePollAddHandler = ()=>{
    lifelineFlag["audiencePollFlag"] = 0;
    // console.log("in Handler: ",lifelineFlag.audiencePollFlag);
    // const el = document.getElementById("audience-cross-one");
        // console.log("before:  ",el);
    document.querySelector(".lifeline-box").classList.remove("show-lifeline");
    document.getElementById("result").innerText = "Implementing Audience Poll ...";
    document.querySelector(".audience-poll").classList.add("pointer-events-none");
    audiencePollCrossMark();
    lifelineNum = document.querySelector(".lifeline-no").innerText ;
    lifelineNum--;
    document.querySelector(".lifeline-no").innerText = lifelineNum;
    setTimeout(()=>{
        let justBeforeAudiencePoll = `
            <div class="audience-bar-box just-before-audience-poll">
                <div id="bar_a" class="bar"></div>
                <div id="bar_b" class="bar"></div>
                <div id="bar_c" class="bar"></div>
                <div id="bar_d" class="bar"></div>
            </div>
        `;
        document.getElementById("result").innerText = "";
        AudiencePollSound();
        let clearTimeoutId;
        // console.log("before timeout: ", el);
        audiencePollTimeout(0,justBeforeAudiencePoll,clearTimeoutId);
        // console.log("after timeout: ", el);
    },1500);
}
// audiencePollCrossMark();

const audiencePoll = ()=>{
    if(lifelineFlag["audiencePollFlag"])
    {
        document.querySelector(".audience-poll").addEventListener("click",audiencePollAddHandler);
    }
    else
    {
        audiencePollCrossMark();
        document.querySelector(".audience-poll").classList.add("pointer-events-none"); 
    }
}

const audiencePollRemoveHandler = ()=>{
    if(lifelineFlag["audiencePollFlag"] == 1)
        document.querySelector(".audience-poll").removeEventListener("click",audiencePollAddHandler);    
}

const lifelineApplied = ()=>{
    let lifelineNum = document.querySelector(".lifeline-no").innerText;
    if(lifelineNum>0)
    {
        document.getElementById("lifeline-button").addEventListener("click",()=>{
            clearScreenFromAudiencePoll();
            clearStopWatch();
            optButtonDisabled();
            disableNextButton();
            disableLifelineButton();
        })
    }
    else
    {
        disableLifelineButton();
        document.getElementById("result").innerText = "You have NO lifeline left !!";
    }
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
    lifelineApplied();
    audiencePoll();
    fiftyFifty();
}


const nextButtonFun = ()=>{
    if(currentQuestIndex < kbcQuestions.length-1)
    {
        currentQuestIndex++;
        audiencePollRemoveHandler();
        buildKBCquestions();
        buildMoneyArea();
        questForSpecificPrizeMoney();
        clearStopWatch();
        stopWatch();
        correctAnswerSound.pause();
        wrongAnswerSound.pause();
        enableLifelineButton();
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

document.querySelector(".lets-play-image").addEventListener("click",()=>{
    buildKBCquestions();
    buildMoneyArea();
    questForSpecificPrizeMoney();
    welcomeSound.pause();
    stopWatch();
    document.querySelector("#Next").addEventListener("click",nextButtonFun);
    document.querySelector(".lifeline-box").classList.remove("show-lifeline");
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

const hoverLifeline = ()=>{
    let beforeInnerText = document.getElementById("result").innerText;
    document.querySelectorAll(".lifeline-item").forEach((ele)=>{
        ele.addEventListener("mouseover",()=>{
            document.getElementById("result").innerText = ele.classList[1];
        })
    })
}

const LifelineComesUpSound = ()=>{
    lifelineComesUpSound.currentTime = 0;
    lifelineComesUpSound.play();
}

const showLifeline = ()=>{
    document.querySelector("#lifeline-button").addEventListener("click",()=>{
        document.querySelector(".lifeline-box").classList.toggle("show-lifeline");
        hoverLifeline();
        LifelineComesUpSound();
        
    })
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
    showLifeline();
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


function getRandom(first,last){
    var r = Math.random()*(last+1-first);
    return(Math.floor(r)+first)
}
