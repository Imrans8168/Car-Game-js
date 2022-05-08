const score = document.querySelector('.score');
const startscreen = document.querySelector('.startscreen');
const gamearea = document.querySelector('.gamearea');

// console.log(gamearea);

startscreen.addEventListener('click', start);
let player = { speed: 5, score:0 };

let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false }

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

function keydown(e) {
    e.preventDefault();
    keys[e.key] = true;
    //  console.log(e.key);
    // console.log(keys)
}

function keyup(e) {
    e.preventDefault();
    keys[e.key] = false;
    //  console.log(e.key);
}

function iscollide(a, b) {
    arect = a.getBoundingClientRect();
    brect = b.getBoundingClientRect();
    return !((arect.bottom < brect.top) || (arect.top > brect.bottom) || (arect.right < brect.left) || (arect.left > brect.right))
}

function movelines() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function endgame(){
    player.start=false;
    startscreen.classList.remove('hide');
    startscreen.innerHTML="Game over <br> Your final score is " + player.score + " <br>Press here to restart the Game. ";
}

function moveenemy(car) {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (item) {

        if(iscollide(car,item)){
            console.log("boomhit");
            endgame();
        }

        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function gameplay() {
    // console.log("hey i am cliked");

    let car = document.querySelector('.car');
    let road = gamearea.getBoundingClientRect();

    // console.log(road);

    if (player.start) {

        movelines();
        moveenemy(car);

        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gameplay);
        console.log(player.score++);

        player.score++;
        let ps = player.score - 2;
        score.innerText ="Score : " + ps;
    }
}
function start() {

    // gamearea.classList.remove('hide');
    startscreen.classList.add('hide');
    gamearea.innerHTML="";

    player.start = true;
    player.score= 0;
    window.requestAnimationFrame(gameplay);

    for (x = 0; x < 5; x++) {
        let roadline = document.createElement('div');
        roadline.setAttribute('class', 'lines');
        roadline.y = (x * 150);
        roadline.style.top = roadline.y + "px";
        gamearea.appendChild(roadline);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    //car.innerText="iamcar";
    gamearea.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // 

    for (x = 0; x < 3; x++) {
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class', 'enemy');
        enemycar.y = ((x + 1) * 350) * -1;
        enemycar.style.top = enemycar.y + "px";
        enemycar.style.background = 'blue';
        enemycar.style.left = Math.floor(Math.random() * 350) + "px";
        gamearea.appendChild(enemycar);
    }

}