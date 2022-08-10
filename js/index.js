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

const openingSound = ()=>{
    page1Sound.currentTime = 0;
    page1Sound.play();
}

const WelcomeSound = ()=>{
    welcomeSound.currentTime = 0;
    welcomeSound.play();
}

// let contestantName;



// adding modal on clicking sitHotSeat button
const sitOnTheHotSeatFun = ()=>{
    let contestantName = document.getElementById("contestant-name-input").value;
    if(contestantName=="")
        contestantName = "Anonymous";
    page1Sound.pause();
    WelcomeSound();
    document.getElementById("page2").classList.add("show-modal");
    document.getElementById("contestant-name").innerText = contestantName;
    
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
