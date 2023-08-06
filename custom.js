const card = [{name: "2-Hearts", value: 2},{name: "3-Hearts", value: 3},{name: "4-Hearts", value: 4},{name: "5-Hearts", value: 5},{name: "6-Hearts", value: 6},{name: "7-Hearts", value: 7},{name: "8-Hearts", value: 8},{name: "9-Hearts", value: 9},{name: "10-Hearts", value: 10},{name: "King-Hearts", value: 10},{name: "Queen-Hearts", value: 10},{name: "Jack-Hearts", value: 10},{name: "Ace-Hearts", value: 11},
              {name: "2-Diamonds", value: 2},{name: "3-Diamonds", value: 3},{name: "4-Diamonds", value: 4},{name: "5-Diamonds", value: 5},{name: "6-Diamonds", value: 6},{name: "7-Diamonds", value: 7},{name: "8-Diamonds", value: 8},{name: "9-Diamonds", value: 9},{name: "10-Diamonds", value: 10},{name: "King-Diamonds", value: 10},{name: "Queen-Diamonds", value: 10},{name: "Jack-Diamonds", value: 10},{name: "Ace-Diamonds", value: 11},
              {name: "2-Spades", value: 2},{name: "3-Spades", value: 3},{name: "4-Spades", value: 4},{name: "5-Spades", value: 5},{name: "6-Spades", value: 6},{name: "7-Spades", value: 7},{name: "8-Spades", value: 8},{name: "9-Spades", value: 9},{name: "10-Spades", value: 10},{name: "King-Spades", value: 10},{name: "Queen-Spades", value: 10},{name: "Jack-Spades", value: 10},{name: "Ace-Spades", value: 11},
              {name: "2-Clubs", value: 2},{name: "3-Clubs", value: 3},{name: "4-Clubs", value: 4},{name: "5-Clubs", value: 5},{name: "6-Clubs", value: 6},{name: "7-Clubs", value: 7},{name: "8-Clubs", value: 8},{name: "9-Clubs", value: 9},{name: "10-Clubs", value: 10},{name: "King-Clubs", value: 10},{name: "Queen-Clubs", value: 10},{name: "Jack-Clubs", value: 10},{name: "Ace-Clubs", value: 11}
             ]


const dealer = []
const player = []
let dealerCardStatus = false;
let dealerScore = 0
let playerScore = 0


const dealerCard = document.querySelector('.dealerCard');
const playerCard = document.querySelector('.playerCard');

function deal() {
    const startDiv = document.querySelector('.start');
    startDiv.style.display = 'none';

    const boardDiv = document.querySelector('.board');
    boardDiv.style.display = 'block';

    for(let i=0;i<4;i++){
        if(i%2){
            const randomIndex = Math.floor(Math.random() * card.length);
            dealer.push(card[randomIndex]);
            card.splice(randomIndex, 1);
        } else {
            const randomIndex = Math.floor(Math.random() * card.length);
            player.push(card[randomIndex]);
            card.splice(randomIndex, 1);
        }
    }
    scoreCount('dealer')
    scoreCount('player')
    for (i = 0; i < dealer.length; i++) {
        const newDiv = document.createElement("p");
        newDiv.textContent = dealer[i].name;
        dealerCard.append(newDiv);

        if(dealerCardStatus === false){
            dealerCard.firstElementChild.textContent = ''
            const dealerContent = document.querySelector('.dealerScore');
            dealerContent.textContent = `Dealer (${dealerScore - dealer[0].value})`;
        }
    }
    
    for (i = 0; i < player.length; i++) {
        const newDiv = document.createElement("p");
        newDiv.textContent = player[i].name;
        playerCard.append(newDiv);
    }
    if(playerScore === 21){
        setTimeout(() => {
            checkResult('player', playerScore)
        }, 100);
    }
    
}

function hit(){
    const randomIndex = Math.floor(Math.random() * card.length);
    player.push(card[randomIndex]);
    card.splice(randomIndex, 1);
    const newDiv = document.createElement("p");
    newDiv.textContent = player[player.length -1].name;
    playerCard.append(newDiv);
    playerScore = 0
    scoreCount('player')
    setTimeout(() => {
        checkResult('player', playerScore)
    }, 100);
}

function stand(){
    dealerCardStatus = true;
    scoreCount("dealer")
    dealerCard.firstElementChild.textContent = dealer[0].name
    while(dealerScore<17){
            const randomIndex = Math.floor(Math.random() * card.length);
            dealer.push(card[randomIndex]);
            card.splice(randomIndex, 1);
            const newDiv = document.createElement("p");
            newDiv.textContent = dealer[dealer.length -1].name;
            dealerCard.append(newDiv);
            dealerScore=0;
            scoreCount("dealer")
    }
    setTimeout(() => {
        checkResult('dealer', dealerScore)
    }, 100);
}

function aceValue(score, cards) {
    let numberOfAces = 0;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].name.includes("Ace")) {
            numberOfAces++;
        }
    }
    for (let i = 0; score > 21 && i < numberOfAces; i++) {
        score -= 10;
    }
    return score;
}

function scoreCount(type) {
    if (type === "dealer") {
        dealerScore = 0; 

        for (let i = 0; i < dealer.length; i++) {
            dealerScore += dealer[i].value;
        }
        dealerScore = aceValue(dealerScore, dealer);
    }

    if (type === "player") {
        playerScore = 0; // Reset player score
        for (let i = 0; i < player.length; i++) {
            playerScore += player[i].value;
        }
        playerScore = aceValue(playerScore, player);
    }

    const dealerContent = document.querySelector('.dealerScore');
    const playerContent = document.querySelector('.playerScore');
    dealerContent.textContent = `Dealer (${dealerScore})`;
    playerContent.textContent = `Player (${playerScore})`;
}

function checkResult(type, value){
    if(type === 'player' && value > 21){
        alert("You are Busted. Please click ok to play again.")
        window.location = '/'
    }
    if(type === 'dealer' && value > 21){
        alert("Dealer is busted! You've won!!!! Please click ok to play again.")
        window.location = '/'
    } 
    if(type === 'player' && value === 21){
        alert("You've won!!!! Please click ok to play again.")
        window.location = '/'
    } 
    if(type === 'dealer' && value === 21){
        alert("You've Lost! Please click ok to play again.")
        window.location = '/'
    } 
    if(type === 'dealer' && value >16 && value<21){
        if(playerScore>dealerScore){
            alert("You've won!!!! Please click ok to play again.")
            window.location = '/'
        } else {
            alert("You've Lost! Please click ok to play again.")
            window.location = '/'
        }
    } 
}

