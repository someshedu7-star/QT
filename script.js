const CONFIG = {
    personName: 'CUTIE',
    senderName: 'Somesh',
    birthdayISO: '2026-08-18T00:00:00+05:30',
    passcode: '18AUG2012'
};

const steps = Array.from(document.querySelectorAll('.step'));
const personNameNodes = document.querySelectorAll('[data-person-name]');
const senderName = document.getElementById('senderName');
const startButton = document.getElementById('startButton');
const envelopeButton = document.getElementById('envelopeButton');
const letterCard = document.getElementById('letterCard');
const revealButton = document.getElementById('revealButton');
const continueButton = document.getElementById('continueButton');
const momentsCard = document.getElementById('momentsCard');
const momentsContinueButton = document.getElementById('momentsContinueButton');
const nextNoteButton = document.getElementById('nextNoteButton');
const shyYesButton = document.getElementById('shyYesButton');
const whyButton = document.getElementById('whyButton');
const flirtContinueButton = document.getElementById('flirtContinueButton');
const loveYesButton = document.getElementById('loveYesButton');
const loveNoButton = document.getElementById('loveNoButton');
const loveContinueButton = document.getElementById('loveContinueButton');
const teaseButton = document.getElementById('teaseButton');
const replayButton = document.getElementById('replayButton');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const backgroundMusic = document.getElementById('backgroundMusic');
const typedGreeting = document.getElementById('typedGreeting');
const noteCard = document.getElementById('noteCard');
const noteCount = document.getElementById('noteCount');
const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const flirtCard = document.getElementById('flirtCard');
const flirtCount = document.getElementById('flirtCount');
const flirtQuestion = document.getElementById('flirtQuestion');
const flirtActions = document.getElementById('flirtActions');
const flirtAnswer = document.getElementById('flirtAnswer');
const flirtAnswerText = document.getElementById('flirtAnswerText');
const countDays = document.getElementById('countDays');
const countHours = document.getElementById('countHours');
const countMinutes = document.getElementById('countMinutes');
const countSeconds = document.getElementById('countSeconds');
const countdownTitle = document.getElementById('countdownTitle');
const passwordGate = document.getElementById('passwordGate');
const celebrationPassword = document.getElementById('celebrationPassword');
const passwordMessage = document.getElementById('passwordMessage');
const sparkLayer = document.getElementById('sparkLayer');
const heartRainLayer = document.getElementById('heartRainLayer');

const colors = ['#ff6f79', '#ffb47e', '#60d6d1', '#ffe082', '#ffffff'];
const countdownTarget = new Date(CONFIG.birthdayISO).getTime();
let noteIndex = 0;
let flirtIndex = 0;
let musicWanted = false;
let celebrationTimerIds = [];
let loveTimerId = null;

const notes = [
    {
        title: 'A tiny confession',
        text: 'You are not just cute. You are dangerously cute, the kind that makes my brain forget what it was doing.'
    },
    {
        title: 'Your smile is trouble',
        text: 'Your smile should come with a warning, because one look and suddenly my whole day starts behaving better.'
    },
    {
        title: 'Your eyes win',
        text: 'The way you look at me says more than a thousand messages. It feels calm, soft, and impossible to forget.'
    },
    {
        title: 'Birthday rule',
        text: 'Today you are allowed to be spoiled, complimented, adored, and treated like the prettiest main character.'
    }
];

const flirts = [
    {
        question: 'Are you made of moonlight?',
        answer: 'Because you make everything softer just by being there.'
    },
    {
        question: 'Are you a secret wish?',
        answer: 'Because my heart gets suspiciously happy around you.'
    },
    {
        question: 'Are you today?',
        answer: 'Because I have been waiting for you like something special was about to happen.'
    }
];

function initNames() {
    personNameNodes.forEach((node) => {
        node.textContent = CONFIG.personName;
    });
    senderName.textContent = CONFIG.senderName;
    document.title = `Happy Birthday, ${CONFIG.personName}`;
}

function showStep(stepId) {
    steps.forEach((step) => {
        step.classList.toggle('active', step.id === stepId);
    });
}

function updateCountdown() {
    const distance = Math.max(0, countdownTarget - Date.now());
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    countDays.textContent = String(days).padStart(2, '0');
    countHours.textContent = String(hours).padStart(2, '0');
    countMinutes.textContent = String(minutes).padStart(2, '0');
    countSeconds.textContent = String(seconds).padStart(2, '0');

    if (distance <= 0) {
        passwordGate.classList.add('is-unlocked');
        countdownTitle.textContent = 'The birthday surprise is unlocked';
    }
}

function isLocked() {
    return Date.now() < countdownTarget;
}

function canEnter() {
    if (!isLocked()) return true;

    if (celebrationPassword.value.trim().toUpperCase() === CONFIG.passcode.toUpperCase()) {
        passwordGate.classList.remove('has-error');
        passwordMessage.textContent = 'Unlocked. Come closer.';
        return true;
    }

    passwordMessage.textContent = 'Not yet. Try the secret birthday code.';
    passwordGate.classList.remove('has-error');
    void passwordGate.offsetWidth;
    passwordGate.classList.add('has-error');
    celebrationPassword.focus();
    celebrationPassword.select();
    makeHeartSparks(10);
    return false;
}

async function playMusic() {
    if (!backgroundMusic) return;

    musicWanted = true;
    backgroundMusic.volume = 0.55;

    try {
        await backgroundMusic.play();
        musicLabel.textContent = 'Music On';
        musicToggle.classList.add('is-playing');
    } catch (error) {
        musicLabel.textContent = 'Tap Music';
        musicToggle.classList.remove('is-playing');
    }
}

function pauseMusic() {
    if (!backgroundMusic) return;

    backgroundMusic.pause();
    musicWanted = false;
    musicLabel.textContent = 'Music Off';
    musicToggle.classList.remove('is-playing');
}

function typeGreeting() {
    const message = `Happy Birthday ${CONFIG.personName}`;
    let index = 0;
    typedGreeting.textContent = '';

    const timerId = window.setInterval(() => {
        typedGreeting.textContent += message[index];
        index += 1;

        if (index >= message.length) {
            window.clearInterval(timerId);
        }
    }, 75);
}

function makeHeartSparks(amount = 8) {
    for (let i = 0; i < amount; i += 1) {
        const heart = document.createElement('span');
        heart.className = 'heart-spark';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${12 + Math.random() * 76}%`;
        heart.style.color = colors[i % colors.length];
        heart.style.animationDelay = `${Math.random() * 0.4}s`;
        heart.style.animationDuration = `${2.4 + Math.random() * 1.6}s`;
        heart.style.transform = `scale(${0.7 + Math.random() * 0.8})`;
        sparkLayer.appendChild(heart);
        window.setTimeout(() => heart.remove(), 4600);
    }
}

function makeHeartRain(amount = 22) {
    if (!heartRainLayer) return;

    for (let i = 0; i < amount; i += 1) {
        const heart = document.createElement('span');
        heart.className = 'rain-heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.color = colors[i % colors.length];
        heart.style.animationDelay = `${Math.random() * 1.2}s`;
        heart.style.animationDuration = `${3.8 + Math.random() * 3.4}s`;
        heart.style.width = `${13 + Math.random() * 18}px`;
        heartRainLayer.appendChild(heart);
        window.setTimeout(() => heart.remove(), 8200);
    }
}

function getActiveStage() {
    return document.querySelector('.step.active .celebration-stage, .step.active .moments-card, .step.active .note-card, .step.active .flirt-card, .step.active .love-card, .step.active .final-card');
}

function makeFloatingHearts(amount = 20) {
    const stage = getActiveStage();
    if (!stage) return;

    for (let i = 0; i < amount; i += 1) {
        const heart = document.createElement('span');
        heart.className = 'float-heart';
        heart.style.left = `${5 + Math.random() * 90}%`;
        heart.style.color = colors[i % colors.length];
        heart.style.animationDelay = `${Math.random() * 1.2}s`;
        heart.style.animationDuration = `${4 + Math.random() * 3}s`;
        heart.style.width = `${15 + Math.random() * 18}px`;
        stage.appendChild(heart);
        window.setTimeout(() => heart.remove(), 8200);
    }
}

function launchRibbons(amount = 70) {
    const layer = document.querySelector('.ribbon-layer');
    if (!layer) return;

    for (let i = 0; i < amount; i += 1) {
        const ribbon = document.createElement('span');
        ribbon.className = 'ribbon';
        ribbon.style.left = `${Math.random() * 100}%`;
        ribbon.style.background = colors[i % colors.length];
        ribbon.style.animationDelay = `${Math.random() * 0.9}s`;
        ribbon.style.animationDuration = `${2.8 + Math.random() * 2.1}s`;
        layer.appendChild(ribbon);
        window.setTimeout(() => ribbon.remove(), 6000);
    }
}

function launchBursts(amount = 8) {
    const layer = document.querySelector('.burst-layer');
    if (!layer) return;

    for (let i = 0; i < amount; i += 1) {
        const burst = document.createElement('span');
        burst.className = 'burst';
        burst.style.left = `${14 + Math.random() * 72}%`;
        burst.style.top = `${14 + Math.random() * 46}%`;
        burst.style.color = colors[i % colors.length];
        burst.style.animationDelay = `${Math.random() * 0.8}s`;
        layer.appendChild(burst);
        window.setTimeout(() => burst.remove(), 1800);
    }
}

function startCelebrationEffects() {
    stopCelebrationEffects();
    typeGreeting();
    makeHeartSparks(24);
    makeHeartRain(48);
    makeFloatingHearts(38);
    launchRibbons(90);
    launchBursts(10);

    celebrationTimerIds = [
        window.setInterval(() => makeHeartSparks(8), 2500),
        window.setInterval(() => makeHeartRain(16), 1800),
        window.setInterval(() => makeFloatingHearts(12), 2800),
        window.setInterval(() => launchRibbons(24), 4200),
        window.setInterval(() => launchBursts(4), 5200)
    ];
}

function stopCelebrationEffects() {
    celebrationTimerIds.forEach((timerId) => window.clearInterval(timerId));
    celebrationTimerIds = [];
}

function renderNote() {
    const note = notes[noteIndex];
    noteCount.textContent = `Note ${noteIndex + 1} of ${notes.length}`;
    noteTitle.textContent = note.title;
    noteText.textContent = note.text;
    nextNoteButton.textContent = noteIndex === notes.length - 1 ? 'Ask Me Something' : 'Next Flirty Note';

    noteCard.classList.remove('note-enter');
    void noteCard.offsetWidth;
    noteCard.classList.add('note-enter');
    makeHeartSparks(12);
    makeHeartRain(12);
    makeFloatingHearts(18);
}

function renderFlirt() {
    const flirt = flirts[flirtIndex];
    flirtCount.textContent = `Question ${flirtIndex + 1} of ${flirts.length}`;
    flirtQuestion.textContent = flirt.question;
    flirtAnswerText.textContent = flirt.answer;
    flirtContinueButton.textContent = flirtIndex === flirts.length - 1 ? 'One Last Question' : 'Next Question';
    flirtActions.classList.remove('is-hidden');
    flirtAnswer.classList.remove('is-visible');
    shyYesButton.style.transform = '';

    flirtCard.classList.remove('note-enter');
    void flirtCard.offsetWidth;
    flirtCard.classList.add('note-enter');
}

function showFlirtAnswer() {
    flirtActions.classList.add('is-hidden');
    flirtAnswer.classList.add('is-visible');
    makeHeartSparks(16);
    makeHeartRain(18);
    makeFloatingHearts(24);
}

function moveShyButton() {
    const x = Math.round(Math.random() * 140 - 70);
    const y = Math.round(Math.random() * 80 - 40);
    const rotate = Math.random() > 0.5 ? 7 : -7;
    shyYesButton.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    makeHeartSparks(5);
}

function startLoveLoop() {
    if (loveTimerId) window.clearInterval(loveTimerId);
    makeHeartSparks(34);
    makeHeartRain(44);
    makeFloatingHearts(48);
    loveTimerId = window.setInterval(() => {
        makeHeartSparks(12);
        makeHeartRain(14);
        makeFloatingHearts(18);
    }, 2100);
}

function stopLoveLoop() {
    if (!loveTimerId) return;
    window.clearInterval(loveTimerId);
    loveTimerId = null;
}

startButton.addEventListener('click', () => {
    if (!canEnter()) return;
    playMusic();
    showStep('stepEnvelope');
    makeHeartSparks(18);
    makeHeartRain(18);
});

celebrationPassword.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') startButton.click();
});

envelopeButton.addEventListener('click', () => {
    envelopeButton.classList.add('open');
    makeHeartSparks(16);
    makeHeartRain(18);

    window.setTimeout(() => {
        showStep('stepLetter');
        letterCard.classList.add('note-enter');
        if (musicWanted) playMusic();
    }, 650);
});

revealButton.addEventListener('click', () => {
    showStep('stepCelebrate');
    if (musicWanted) playMusic();
    startCelebrationEffects();
});

continueButton.addEventListener('click', () => {
    showStep('stepMoments');
    momentsCard.classList.add('note-enter');
    makeHeartSparks(24);
    makeHeartRain(32);
    makeFloatingHearts(24);
});

momentsContinueButton.addEventListener('click', () => {
    noteIndex = 0;
    showStep('stepNotes');
    renderNote();
});

nextNoteButton.addEventListener('click', () => {
    if (noteIndex < notes.length - 1) {
        noteIndex += 1;
        renderNote();
        return;
    }

    flirtIndex = 0;
    showStep('stepFlirt');
    renderFlirt();
    makeFloatingHearts(20);
});

shyYesButton.addEventListener('pointerenter', moveShyButton);
shyYesButton.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    moveShyButton();
});
shyYesButton.addEventListener('focus', moveShyButton);
whyButton.addEventListener('click', showFlirtAnswer);

flirtContinueButton.addEventListener('click', () => {
    if (flirtIndex < flirts.length - 1) {
        flirtIndex += 1;
        renderFlirt();
        makeFloatingHearts(16);
        return;
    }

    showStep('stepLoveQuestion');
    makeHeartSparks(26);
    makeHeartRain(28);
    makeFloatingHearts(28);
});

loveYesButton.addEventListener('click', () => {
    showStep('stepLoveYes');
    startLoveLoop();
});

loveNoButton.addEventListener('click', () => {
    showStep('stepTease');
    makeHeartSparks(22);
    makeHeartRain(24);
    makeFloatingHearts(24);
});

teaseButton.addEventListener('click', () => {
    showStep('stepLoveYes');
    startLoveLoop();
});

loveContinueButton.addEventListener('click', () => {
    stopLoveLoop();
    stopCelebrationEffects();
    showStep('stepFinal');
    makeHeartSparks(30);
    makeHeartRain(30);
    makeFloatingHearts(30);
});

replayButton.addEventListener('click', () => {
    stopLoveLoop();
    showStep('stepCelebrate');
    startCelebrationEffects();
});

musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
});

initNames();
updateCountdown();
window.setInterval(updateCountdown, 1000);
