const cards = document.querySelectorAll('.card');
const mains = document.querySelectorAll('.main');
const btn = document.querySelector('.restart');
const btnStart = document.querySelector('.start');
const imgStart = document.querySelector('.img');
const content = document.querySelector('.container');
let time = document.querySelector('.time');
let correct = new Audio('correct.mp3');

let x = 0;
let y = 0;
let z = 0;
let addtime = false ;
let hasFliped = false;
let lockBord = false;
let firstCard,socendCard;

shuffle();
function flipCard() {
    if (lockBord) return;
    if (firstCard === this) return;
    this.classList.add('flip');

    if (!hasFliped) {
        firstCard = this;
        hasFliped = true;
        return;
    }
    secondCard = this;

    checkMatch();
}

function checkMatch() {
    let isMatch =  firstCard.dataset.image === secondCard.dataset.image ;

    isMatch ? disableCards() : unflipCards(); 
}

function disableCards() {
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    correct.play();
    x++;
    if (x == 10) {
        btn.style.display = 'block' ;
        addtime = false;
        content.classList.add('complete');
    }
    resetBoard();
}
function resetBoard() {
    hasFliped = false;
    lockBord = false;
    firstCard = null;
    secondCard = null;
}
function unflipCards() {
    lockBord = true ;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}


btn.onclick =()=>{
    cards.forEach(card => {
        card.classList.remove('flip');
    });
    shuffle();
    cards.forEach(card => card.addEventListener('click',flipCard));
    btn.style.display = 'none';
    x = 0;
    content.classList.remove('complete');
    addtime = true;
    y = 0 ;
    z = 0;
}
btnStart.onclick=()=> {
    content.style.display = 'flex';
    btnStart.style.display = 'none';
    imgStart.style.display = 'none';
    time.style.display = 'block';
    addtime = true ;
}

setInterval(() => {
    if (addtime) {
        if (z < 10) {
            if (y < 10) {
                time.innerHTML = ' 0'+z+' : 0'+y ;
            } else if (y< 60){
                time.innerHTML = ' 0'+z+' : '+y  ;
            }else{
                y = 0 ;
                z++;
                time.innerHTML = '0'+z+' : 0'+y  ;
            }
        } else if(z < 60){
            if (y < 10) {
                time.innerHTML = z+' : 0'+y ;
            } else if (y< 60){
                time.innerHTML = z+' : '+y  ;
            }else{
                y = 0 ;
                z++;
                time.innerHTML = z+' : 0'+y  ;
            }
        }
        y++;  
    }
    
}, 1000);

function shuffle() {
    mains.forEach(main => {
      let randomPos = Math.floor(Math.random() * 20);
      main.style.order = randomPos;
    });
  };
cards.forEach(card => card.addEventListener('click',flipCard));