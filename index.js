window.onresize = function(){ location.reload(); }

var $container = document.getElementById('container');
var $spriteWrapper = document.getElementById('sprite-wrapper');
var $ship = document.getElementById('ship');
var $enemyArray = document.getElementById('enemy-array');
var $score = document.getElementById('score');
var $rockArray = document.getElementById('rock-array');
let $enemy = document.getElementsByClassName('enemy');
let $arcade = document.getElementById('arcade');




spritePositionX = 0;
isOverlapping = false;
ship = true;  
score = 0;


$score.innerHTML = ("Score = " + score)


// Create Enemy Array

let createEnemy = (i) => {
    let enemy = document.createElement('div');
    enemy.className = "enemy"
    enemy.id = 'enemy-' + i;
    $enemyArray.appendChild(enemy);
};

for (i = 1; i < 16; i++) {
    createEnemy(i);
  }
;

enemiesLeft = $enemy.length;



// Create Rock Array

let createRock = (i) => {
  let rock = document.createElement('div');
  rock.className = "rock"
  rock.id = 'rock-' + i;
  rock.value = 50;
  $rockArray.appendChild(rock);
  rock.style.backgroundImage = ('url(rock-' + i + '.png)') 
};

for (i = 1; i < 5; i++) {
  createRock(i);
}
;

let $rock = document.getElementsByClassName('rock');

// Square Calc
var positionInfo = $arcade.getBoundingClientRect();
var height = positionInfo.height;
var width = positionInfo.width;
$container.style.height = width/1.9 + "px"; 
$arcade.style.height = width + 'px';

//Sprite Movement & Firing

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;


// Space to fire + collision check

    if (e.keyCode == '32') {
        console.log("space Key"); 
        let laser = document.createElement('div');
        laser.className = "laser";
        laser.id = 'laser';
        $spriteWrapper.appendChild(laser);
        let $laser = document.getElementById('laser');
        var laserNoise = new Audio ('sfx_laser2.ogg')
        laserNoise.play()
        $laser.style.display = "block";
        $laser.style.visibility = "visible";
        $laser.style.animation = "";
        $laser.style.animation = "fire 2s";

          const checkCollision = setInterval(function() {

            for (i = 0; i < $enemy.length; ++i) {

              let rect1 = $enemy[i].getBoundingClientRect();
              let rect2 = $laser.getBoundingClientRect();


              if(rect1.x < rect2.x + rect2.width && 
                rect1.x + rect1.width > rect2.x && 
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y){
                  score++,
                  $score.innerHTML = ("Score = " + score),
                  $enemy[i].style.display = 'hidden',
                  $enemy[i].className = "dead",
                  $laser.style.display = "none",
                  $laser.style.animation = "",
                  $laser.remove(),
                  console.log('ship hit enemy');
                  checkWinState($enemy.length);

                }
                
            }}, 100);
          
            const checkRockCollision = setInterval(function() {

              for (i = 0; i < $rock.length; ++i) {
  
                let rect3 = $rock[i].getBoundingClientRect();
                let rect4 = $laser.getBoundingClientRect();
                
                if(rect3.x < rect4.x + rect4.width && 
                  rect3.x + rect3.width > rect4.x && 
                  rect3.y < rect4.y + rect4.height &&
                  rect3.y + rect3.height > rect4.y){
                    $laser.style.display = "none";
                    $laser.remove();
                    console.log('ship laser impact on rock-' + i);
                    $rock[i].value = $rock[i].value - 10;
                    $rock[i].style.height = $rock[i].value + '%';
                    $rock[i].style.width = $rock[i].value + '%';
                    if ($rock[i].value <= 0) {$rock[i].className ='dead'};

                
                     }
                  
              }}, 100);

        setTimeout(function (){
          $laser.remove();
            $laser.style.visibility = "hidden";
            clearInterval(checkCollision);             
            clearInterval(checkRockCollision); 


          }, 1000);


// Left Key and Sprite Position
    }
    else if (e.keyCode == '37'&& spritePositionX >= -440) {
        spritePositionX = spritePositionX - 10;
       $spriteWrapper.style.transform = "translateX(" + spritePositionX + "%)"
    }
// Right Key and Sprite Position
    else if
            (e.keyCode == '39'&& spritePositionX <= 440) {
            spritePositionX = spritePositionX + 10;
           $spriteWrapper.style.transform = "translateX(" + spritePositionX + "%)"
    }

};

// Mobile Buttons

document.getElementById("left-button").addEventListener("click", function () {
  if (spritePositionX >= -440) 
  spritePositionX = spritePositionX - 10;
  $spriteWrapper.style.transform = "translateX(" + spritePositionX + "%)";
});

document.getElementById("right-button").addEventListener("click", function () {
  (spritePositionX <= 440) 
    spritePositionX = spritePositionX + 10;
   $spriteWrapper.style.transform = "translateX(" + spritePositionX + "%)";
});

document.getElementById("fire-button").addEventListener("click", function () {
  let laser = document.createElement('div');
  laser.className = "laser";
  laser.id = 'laser';
  $spriteWrapper.appendChild(laser);
  let $laser = document.getElementById('laser');
  var laserNoise = new Audio ('sfx_laser2.ogg')
  laserNoise.play()
  $laser.style.display = "block";
  $laser.style.visibility = "visible";
  $laser.style.animation = "";
  $laser.style.animation = "fire 2s";

    const checkCollision = setInterval(function() {

      for (i = 0; i < $enemy.length; ++i) {

        let rect1 = $enemy[i].getBoundingClientRect();
        let rect2 = $laser.getBoundingClientRect();


        if(rect1.x < rect2.x + rect2.width && 
          rect1.x + rect1.width > rect2.x && 
          rect1.y < rect2.y + rect2.height &&
          rect1.y + rect1.height > rect2.y){
            score++,
            $score.innerHTML = ("Score = " + score),
            $enemy[i].style.display = 'hidden',
            $enemy[i].className = "dead",
            $laser.style.display = "none",
            $laser.style.animation = "",
            $laser.remove(),
            console.log('ship hit enemy');
            checkWinState($enemy.length);

          }
          
      }}, 100);
    
      const checkRockCollision = setInterval(function() {

        for (i = 0; i < $rock.length; ++i) {

          let rect3 = $rock[i].getBoundingClientRect();
          let rect4 = $laser.getBoundingClientRect();
          
          if(rect3.x < rect4.x + rect4.width && 
            rect3.x + rect3.width > rect4.x && 
            rect3.y < rect4.y + rect4.height &&
            rect3.y + rect3.height > rect4.y){
              $laser.style.display = "none";
              $laser.remove();
              console.log('ship laser impact on rock-' + i);
              $rock[i].value = $rock[i].value - 10;
              $rock[i].style.height = $rock[i].value + '%';
              $rock[i].style.width = $rock[i].value + '%';
              if ($rock[i].value <= 0) {$rock[i].className ='dead'};

          
               }
            
        }}, 100);

  setTimeout(function (){
    $laser.remove();
      $laser.style.visibility = "hidden";
      clearInterval(checkCollision);             
      clearInterval(checkRockCollision); 


    }, 1000);
});


  

// Enemy Fire

// Random Enemy
 



// Make Div

let createEnemyLaser = () => {
    let randomNumber = (Math.round(Math.random() * 10));
    let enemyLaser = document.createElement('div');
    enemyLaser.className = "enemy-laser";
    enemyLaser.style.animation = "enemy-fire 1s"
    enemyLaser.id = 'enemy-laser';
    $enemy[randomNumber - 1].appendChild(enemyLaser);
    var enemyLaserNoise = new Audio ('sfx_laser1.ogg');
    // enemyLaserNoise.play();


// Fire with Animation
var $enemyLaserId = document.getElementById('enemy-laser');


  const checkEnemyCollision = setInterval(function() 
  {
      const rect1 = $enemyLaserId.getBoundingClientRect();
      const rect2 = $spriteWrapper.getBoundingClientRect();

      if (rect1.x < rect2.x + rect2.width && 
        rect1.x + rect1.width > rect2.x && 
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y){
          $spriteWrapper.style.display = 'none',
          $spriteWrapper.className = "dead",
          console.log('enemy laser impact on ship');
          $enemyLaserId.remove();
          checkWinState($enemy.length);

        }

        for (i = 0; i < 5; ++i) {

        let rect3 = $rock[i].getBoundingClientRect();
        let rect4 = $enemyLaserId.getBoundingClientRect();

          
        if(rect3.x < rect4.x + rect4.width && 
          rect3.x + rect3.width > rect4.x && 
          rect3.y < rect4.y + rect4.height &&
          rect3.y + rect3.height > rect4.y){
            $enemyLaserId.remove();
            console.log('enemy laser impact on rock');
            $rock[i].value = $rock[i].value - 10;
            $rock[i].style.height = $rock[i].value + '%';
            $rock[i].style.width = $rock[i].value + '%';
            if ($rock[i].value <= 0) {$rock[i].className ='dead'};
        
             }}}, 100);
        
setTimeout(function (){

    $enemyLaserId.remove();
    enemyLaser.style.display = 'none';
    clearInterval(checkEnemyCollision); 

  }, 1000);}; 

  window.setInterval(function(){

    createEnemyLaser();
    
}, 1000);


// Game State

let checkWinState = (enemiesLeft, enemyLaserNoise) => {
if (enemiesLeft == 0 ) {
  let winMessage = document.createElement('div');
  winMessage.className = "pop-up";
  winMessage.id = 'win-pop-up';
  $arcade.appendChild(winMessage);
  winMessage.innerHTML = '<h1> YOU WIN! </h1>' + '<p> Please Reload </p>';
  var winNoise = new Audio ('sfx_win.ogg')
  winNoise.play()
  

} else if ($spriteWrapper.className === "dead") {
  let winMessage = document.createElement('div');
  winMessage.className = "pop-up";
  winMessage.id = 'win-pop-up';
  $arcade.appendChild(winMessage);
  winMessage.innerHTML = '<h1> YOU LOSE </h1>' + '<p> Please Reload </p>';
  var loseNoise = new Audio ('sfx_lose.ogg')
  loseNoise.play()


}
};