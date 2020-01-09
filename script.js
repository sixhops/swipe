const touchSurface = document.querySelector('main');
var swipeDir
var startX
var startY

var prevX
var prevY
var curX
var curY

var distX
var distY
var threshold = 150 //required min distance traveled to be considered swipe
var restraint = 100 // maximum distance allowed at the same time in perpendicular direction
var allowedTime = 30000 // maximum time allowed to travel that distance (originally 300)
var elapsedTime
var startTime

var startingLeft = 200
var currentLeft = startingLeft;
  // var handleswipe = callback || function (swipeDir) { };

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
  touchSurface.style.left = currentLeft.toString() + "px";
}, false)

touchSurface.addEventListener('touchend', function (e) {
  var touchObj = e.changedTouches[0]
  distX = touchObj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
  distY = touchObj.pageY - startY // get vertical dist traveled by finger while in contact with surface
  elapsedTime = new Date().getTime() - startTime // get time elapsed
  if (elapsedTime <= allowedTime) { // first condition for swipe met
    if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
      swipeDir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
    }
    else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
      swipeDir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
    }
  }
  console.log(swipeDir)
  e.preventDefault()
}, false)