const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question:'Red planet',
        choice1: 'Earth',
        choice2: 'mars',
        choice3: 'kepler',
        choice4: 'arel',
        answer: 2,

    },

    {
        question:'which of these comprise the intermediate layer of a neutron star',
        choice1: 'Neutrons and superfluid state',
        choice2: 'neutrons and fluid state',
        choice3: 'only neutrons',
        choice4: 'Neutrons and solid state',
        answer: 1,

    },
    {
        question:'Which is the name of a radio source that is very far from Earth?',
        choice1: 'Phaser',
        choice2: 'tracer',
        choice3: 'quasar',
        choice4: 'taser',
        answer: 3,

    },
    {
        question:'The atmosphere in Mars is mostly composed of:',
        choice1: 'Nitrogen',
        choice2: 'Helium',
        choice3: 'Oxygen',
        choice4: 'Carbon dioxide',
        answer: 4,

    },
    {
        question:'Who discovered dark matter',
        choice1: 'Halton Arp',
        choice2: 'Vera Rubin',
        choice3: 'Fritz Zwicky',
        choice4: 'Jan Oort',
        answer: 3,

    },
    {
        question:'The doughnut-shaped zones of highly energetic charged particles trapped at high altitudes in the magnetic field of Earth are known as:',
        choice1: 'Magnetosheath',
        choice2: 'Magnetosphere',
        choice3: 'Van Allen radiation',
        choice4: 'Magnetopause',
        answer: 3,

    },
    {
        question:'Which type of telescope is used for examining the moon and other planets of the solar system?',
        choice1: 'Reflecting telescope',
        choice2: 'Refracting telescope',
        choice3: 'Schmidt Telescope',
        choice4: 'catadioptric Telesope',
        answer: 2,

    },
    {
        question:'Who discovered the Crab Nebula?',
        choice1: 'John Flamsteed',
        choice2: 'Charles Messier',
        choice3: 'Ernst Otto Fischer',
        choice4: 'John Bevis',
        answer: 4,

    },
    {
        question:'The instance when the Sun is exactly above the Equator and day and night are of equal length is called:',
        choice1: 'Beginning of spring',
        choice2: 'Winter solstice',
        choice3: 'vernal epuinox',
        choice4: 'Summer Solstic',
        answer: 3,

    },
    {
        question:'Who invented the telescope?',
        choice1: 'Galileo',
        choice2: 'Johannes Kepler',
        choice3: 'Hans Lippershey',
        choice4: 'Hypatia',
        answer: 3,

    },
    {
        question:'Who was the first person to enter outer space twice?',
        choice1: 'Scott kelly',
        choice2: 'christina koch',
        choice3: 'vladimir komarov',
        choice4: 'yuri Gagarin',
        answer: 3,

    },
    {
        question:'what is the great red spot on jupiter',
        choice1: 'A Crater',
        choice2: 'A storm',
        choice3: 'A volcano',
        choice4: 'A lake',
        answer: 2,

    },
    {
        question:'The largest volcano in the solar system is called olympus Mons.where is it?',
        choice1: 'venus',
        choice2: 'mars',
        choice3: 'earth',
        choice4: 'jupiter',
        answer: 2,

    },
    {
        question:'What are comets mostly made of',
        choice1: 'Dirt ice and dust',
        choice2: 'hot,liquid rock',
        choice3: 'rusty metal',
        choice4: 'poisonous iquid',
        answer: 1,

    },
    {
        question:'which is closect planet to sun',
        choice1: 'Neptune',
        choice2: 'mars',
        choice3: 'Mercury',
        choice4: 'Earth',
        answer: 3,

    },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 15



startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

var time = 60;
var timer=document.getElementById("time");
var timerId;
function startTimer(){
    time=60;
    timer.innerHTML=time;
    timerId=setInterval(()=>{
        time--;
        if(time==0){
            location.href="./end.html"
        }
        else if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score)
    
            return window.location.assign('/end.html')
        }
        timer.innerHTML = time;


    },1000)
    scoreText.innerText = score
}
function resetTime(intervalId){
    clearInterval(intervalId);
    startTimer();
}
startTimer();

startGame()