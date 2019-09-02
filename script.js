var getJsonData = function (path, callback) {
  var request = new XMLHttpRequest();

  request.open("GET", path, true);

  // XHR failed
  request.onerror = function() {
    cb(new Error("Couldn't load JSON from " + path));
  };

  // XHR complete
  request.onload = function() {
    var dataString = request.response
    var parsedData = JSON.parse(dataString)
    callback(parsedData)
  };

  request.send();
} 

var populateTemplateWithData = function (templateString, data) {
  var variableRegex = /{{(.*)}}/gm
  var replaceFunction = function (
    wholeVariable,
    variableName
  ) {
    return data[variableName]
  }
  return templateString.replace(
    variableRegex,
    replaceFunction
  )
}

var animalTemplateHolderElement = document.getElementById(
  'animal-template'
)
var animalTemplateString = animalTemplateHolderElement.innerText
var animalDataHandler = function(animals) {
  console.log('Animal Data Handler Was Called')
  var parsedAnimalTemplateStrings = animals.map(function(animal) {
    return populateTemplateWithData(
      animalTemplateString,
      animal
    )
  })
  var gridWrapperElement = document.getElementById(
    'grid-wrapper'
  )
  
  gridWrapperElement.innerHTML = parsedAnimalTemplateStrings.join('');

  animals.forEach(function(animal) {
    var oggPath = 'sounds/' + animal.id + '.ogg'
    loopify(
      oggPath,
      handleOggReady
    )
  })
}
console.log('Before data was requested')

getJsonData(
  'animal_data.json',
  animalDataHandler
);

console.log('After data was requested');

// This js works with index2.html without 'loopify2.js'
/* --------- loopify --------- */
(function() {
  function loopify(uri,cb) {

    var context = new (window.AudioContext || window.webkitAudioContext)()
    var request = new XMLHttpRequest();

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

document.getElementById("playHeart").addEventListener("click",function(){
  $("#playModal").addClass("displayNone");
});
document.getElementById("mute").addEventListener("click",function(){
  $('#mute').addClass('displayNone');
  $('#unmute').removeClass('displayNone');
});
document.getElementById("unmute").addEventListener("click",function(){
  $('#unmute').addClass('displayNone');
  $('#mute').removeClass('displayNone');
});

function handleOggReady(err,loop){
  if (err) {
    console.warn(err);
  }
  document.getElementById("playHeart").addEventListener("click",function(){
    loop.start();
  });
  document.getElementById("mute").addEventListener("click",function(){
    loop.stop();
  });
  document.getElementById("unmute").addEventListener("click",function(){
    loop.start();
  });
};

