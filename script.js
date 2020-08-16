const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
let questions = [
    {
        question: "what is an array?",
        choiceA: "data structure",
        choiceB: "range of a particular type of thing",
        choiceC: "ordered series or arrangement",
        correct: "A"
    }, {
        question: "what is this?",
        choiceA: "a quiz",
        choiceB: "the object, class, or other entity",
        choiceC: "i dont know, i forgot",
        correct: "B"
    }, {
        question: "what is the correct javascript for <p id=demo>deminstration.</p>?",
        choiceA: "#demo.innerHTML= Hello World!",
        choiceB: "document.getElementByName(p).innerHTML = Hello World!",
        choiceC: "document.getElementById(demo).innerHTML= Hello World!",
        correct: "C"
    }, {
        question: "inside which HTML element do we put the javascript?",
        choiceA: "scripting",
        choiceB: "script",
        choiceC: "javascript",
        correct: "B"
    }, {
        question: "Where is the correct place to put a javascript?",
        choiceA: "the head",
        choiceB: "the body",
        choiceC: "it doesnt matter, put it anywhere.",
        correct: "B"
    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);


function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}

function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}


function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
    
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
        
            clearInterval(TIMER);
            scoreRender();
        }
    }
}



function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
       
        score++;
       
        answerIsCorrect();
    } else {
       
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
    
        clearInterval(TIMER);
        scoreRender();
    }
}


function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender() {
    scoreDiv.style.display = "block";


    const scorePerCent = Math.round(100 * score / questions.length);

    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}