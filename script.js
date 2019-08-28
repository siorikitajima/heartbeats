// This js works with index2.html without 'loopify2.js'
/* --------- loopify --------- */
(function() {
  function loopify(uri,cb) {

    var context = new (window.AudioContext || window.webkitAudioContext)(),
        request = new XMLHttpRequest();

    request.responseType = "arraybuffer";
    request.open("GET", uri, true);

    // XHR failed
    request.onerror = function() {
      cb(new Error("Couldn't load audio from " + uri));
    };

    // XHR complete
    request.onload = function() {
      context.decodeAudioData(request.response,success,function(err){
        // Audio was bad
        cb(new Error("Couldn't decode audio from " + uri));
      });
    };

    request.send();

    function success(buffer) {

      var source;

      function start() {

        // Stop if it's already playing
        stop();

        // Create a new source (can't replay an existing source)
        source = context.createBufferSource();
        source.connect(context.destination);

        // Set the buffer
        source.buffer = buffer;
        source.loop = true;

        // Play it
        source.start(0);
      }
      
      function stop() {

        // Stop and clear if it's playing
        if (source) {
          source.stop();
          source = null;
        }
      }
      cb(null,{
        start: start,
        stop: stop
      });
    }
  }

  loopify.version = "0.1";

  if (typeof define === "function" && define.amd) {
    define(function() { return loopify; });
  } else if (typeof module === "object" && module.exports) {
    module.exports = loopify;
  } else {
    this.loopify = loopify;
  }
})();

var hbSounds = [
loopify("sounds/01BlueWhale09.ogg",ready),
loopify("sounds/02DesertTortoise12.ogg",ready),
loopify("sounds/03LargeWhale20.ogg",ready),
loopify("sounds/04Elephant30.ogg",ready),
loopify("sounds/05Alligator32.ogg",ready),
loopify("sounds/06Horse34.ogg",ready),
loopify("sounds/07Dolphin40.ogg",ready),
loopify("sounds/08Ox50.ogg",ready),
loopify("sounds/09BrownBear55.ogg",ready),
loopify("sounds/10Condor65.ogg",ready),
loopify("sounds/11Giraffe67.ogg",ready),
loopify("sounds/12DairyCow69.ogg",ready),
loopify("sounds/13Human72.ogg",ready),
loopify("sounds/14Goat73.ogg",ready),
loopify("sounds/15Sheep75.ogg",ready),
loopify("sounds/16Pig80.ogg",ready),
loopify("sounds/17Dog90.ogg",ready),
loopify("sounds/18Cat130.ogg",ready),
loopify("sounds/19Pigeon185.ogg",ready),
loopify("sounds/20Duck190.ogg",ready),
loopify("sounds/21Monkey190.ogg",ready),
loopify("sounds/22WildTurkey195.ogg",ready),
loopify("sounds/23Rabbit205.ogg",ready),
loopify("sounds/24GuineaPig250.ogg",ready),
loopify("sounds/25Chicken275.ogg",ready),
loopify("sounds/26Buzzard300.ogg",ready),
loopify("sounds/27AmericanCrow380.ogg",ready),
loopify("sounds/28Hamster450.ogg",ready),
loopify("sounds/29Mouse600.ogg",ready),
loopify("sounds/30Canary1000.ogg",ready),
loopify("sounds/31Hummingbird1260.ogg",ready),
loopify("sounds/32EtruscanSchrew1510.ogg",ready)];

/* --------- When an animal square is clicked --------- */
$('.square').click(function(){

  /* ---Grid <> Fullscreen--- */
  $(this).toggleClass('fullscreen');

  /* ---Positioning & Coloring Heart--- */
   var posAdjustTop = $(this).attr("data-post");
   var posAdjustLeft = $(this).attr("data-posl");
   var heartSize = $(this).attr("data-size");
   var heartColor = $(this).attr("data-color");
   var heartClass = $(this).attr("id");
  $('#heartid').css('top', posAdjustTop +'%');
  $('#heartid').css('left', posAdjustLeft +'%');
  $('#heartid').css('width', heartSize +'px');
  $('#heartPath').addClass(heartClass);
  $('#heartPath').css('fill', '#' + heartColor);

  /* ---Heart, Arrows and Btns, Opening to Fullscreen--- */
  if ($(this).hasClass('fullscreen')) { 
    $('#heartPosition').removeClass('displayNone');
    $('.arrows').removeClass('displayNone');
    $('.btns').removeClass('displayNone');
      }

  /* ---Heart, Arrows and Btns, Closing to Gridview--- */
  else {
    $('#heartPosition').addClass('displayNone');
    $('.arrows').addClass('displayNone');
    $('.btns').addClass('displayNone');
      };
  });
  
/* ---Clicking on Side Arrows--- */
$('#rightArrow').click(function(){
  var nextDiv = $('.fullscreen').next('.square');
  $('.fullscreen').trigger('click');
  $(nextDiv).trigger('click');
  });
$('#leftArrow').click(function(){
  var prevDiv = $('.fullscreen').prev('.square');
  $('.fullscreen').trigger('click');
  $(prevDiv).trigger('click');
});

/* ---Close Button--- */
$('#rightBtn').click(function(){
  $('.fullscreen').trigger('click');
  });
  
/* --- UnMute all ---*/
//  $('#unmute').on('click',function(){
//    $('#unmute').addClass('displayNone');
//    $('#mute').removeClass('displayNone');});
  /* --- Mute all ---*/
//  $('#mute').on('click',function(){    
//    $('#mute').addClass('displayNone');
//    $('#unmute').removeClass('displayNone');});

/* ---Header Fading--- */
  $('#header').fadeTo(5000,1).fadeOut(1000);
/* ---Header Appear when Scroll--- */
  $(window).scroll(function() {
  if ($(this).scrollTop() > 250 && $(this).scrollTop() < 1250) {
    $('#header').fadeIn();}
  else {
    $('#header').fadeTo(3000,1).fadeOut(1000); }
}); 

  /* ---Modal--- */

$(".modal-close").click (function() {
  $("#playModal").addClass("displayNone");
  $('#mute').addClass('displayNone');
  $('#unmute').removeClass('displayNone');
});

/* --------- Loopify contoll with Modal & Mute/Unmute Btn --------- */

function ready(err,loop){
  if (err) {
    console.warn(err);
  }
  document.getElementById("playHeart").addEventListener("click",function(){
    loop.start();
    $("#playModal").addClass("displayNone");
  });
  document.getElementById("mute").addEventListener("click",function(){
    loop.stop();
    $('#mute').addClass('displayNone');
    $('#unmute').removeClass('displayNone');
  });
  document.getElementById("unmute").addEventListener("click",function(){
    loop.start();
    $('#unmute').addClass('displayNone');
    $('#mute').removeClass('displayNone');
  });
  document.getElementById('bluewhale').addEventListener("click",function(){
    loop.stop()
    });
  };

