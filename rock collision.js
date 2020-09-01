let rect3 = $rock[i].getBoundingClientRect();
let rect4 = $laser.getBoundingClientRect();

if(rect3.x < rect4.x + rect4.width && 
  rect3.x + rect3.width > rect4.x && 
  rect3.y < rect4.y + rect4.height &&
  rect3.y + rect3.height > rect4.y){
    $laser.style.display = "none";
    $laser.remove();
    console.log('ship laser impact on rock');

     }