const touchSurface = document.querySelector('section');
const div1 = document.querySelector('div.one');
const div2 = document.querySelector('div.two');
const div3 = document.querySelector('div.three');
const msgConsole = document.querySelector('p');

var swipeDir
var startX
var startY

var prevX
var prevY
var curX
var curY
var curBox = "two";

var distX
var distY
var threshold = 150 //required min distance traveled to be considered swipe
var restraint = 100 // maximum distance allowed at the same time in perpendicular direction
var allowedTime = 300 // maximum time allowed to travel that distance (originally 300)
var elapsedTime
var startTime

var startingLeft = 200
var currentLeft = startingLeft;
  // var handleswipe = callback || function (swipeDir) { };

function moveBoxes(box) {
  switch (box) {
    case 'one':
      div1.style.left = "0";
      div2.style.left = "100vw";
      div3.style.left = "200vw";
      break;
    case 'two':
      div1.style.right = "-1";
      div2.style.left = "0";
      div3.style.left = "100vw";
      break;
    case 'three':
      div1.style.right = "-100vw";
      div2.style.left = "-100vw";
      div3.style.left = "0";
      break;
  }
}

touchSurface.addEventListener('touchstart', function (e) {
  var touchObj = e.changedTouches[0]
  swipeDir = 'none'
  distX = 0;
  distY = 0;
  startX = touchObj.pageX
  startY = touchObj.pageY
  curX = startX;
  curY = startY;
  startTime = new Date().getTime() // record time when finger first makes contact with surface
  e.preventDefault()
}, false)

touchSurface.addEventListener('touchmove', function (e) {
  e.preventDefault() // prevent scrolling when inside DIV
  var touchObj = e.changedTouches[0];
  prevX = curX;
  prevY = curY;
  curX = touchObj.pageX
  curY = touchObj.pageY
  let distX = curX - prevX;
  currentLeft += distX;
  // touchSurface.style.left = currentLeft.toString() + "px";
}, false)

touchSurface.addEventListener('touchend', function (e) {
  var touchObj = e.changedTouches[0]
  distX = touchObj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
  distY = touchObj.pageY - startY // get vertical dist traveled by finger while in contact with surface
  elapsedTime = new Date().getTime() - startTime // get time elapsed
  if (elapsedTime <= allowedTime) { // first condition for swipe met
    if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
      swipeDir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
      if (swipeDir === 'left') {
        console.log("We are swiping left...")
        if (curBox === 'one') {
          // go to two
          curBox = 'two';
        } else if (curBox === 'two') {
          // go to three
          curBox = 'three';
        } else if (curBox === 'three') {
          return;
        }
      }
      if (swipeDir === 'right') {
        console.log("We are swiping right...")
        if (curBox === 'one') {
          return;
        } else if (curBox === 'two') {
          // go to one
          curBox = 'one';
        } else if (curBox === 'three') {
          // go to two
          curBox = 'two';
        }
      }
    }
    else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
      swipeDir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
    }
  }
  msgConsole.textContent = `swipe ${swipeDir}, current box is ${curBox}`;
  e.preventDefault()
}, false)