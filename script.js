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
  console.log('Animal Data loaded')
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


  var loops = []

  var startAll = function () {
    loops.forEach(function (loop) {
      loop.start()
    })
  }

  var handleAllOggsLoaded = function () {
    $("#playModal").addClass("displayNone");
    startAll();
  }

  var animalsLoaded = 0
  $("#loadingProgress").text(animalsLoaded + ' / ' + animals.length)
  $("#playHeart").on('click', function(){
    $('.modal-loading-status').addClass('displayBlock');
    $(".modal-close").addClass("displayNone");

    animals.forEach(function(animal) {
      var oggPath = 'sounds/' + animal.id + '.ogg'
      loopify(
        oggPath,
        function (err, loop) {
          animalsLoaded += 1
          $("#loadingProgress").text(animalsLoaded + ' / ' + animals.length)
          if (animalsLoaded === animals.length) {
            handleAllOggsLoaded()
          }
          if (loop) {
            loops.push(loop)
          }
          handleOggReady(err, loop)
        }
      )
    })
  });

  $('.animal-loading-status').addClass('displayNone');
  $('.show-starter').removeClass('displayNone');
};

getJsonData(
  'animal_data.json',
  animalDataHandler
);

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
$(document).on('click', '.square', function(){

  /* ---Grid <> Fullscreen--- */
  $(this).removeClass('square');
  $(this).addClass('fullscreen');

  /* ---Positioning & Coloring Heart--- */
   var posAdjustTop = $(this).attr("data-heart-top");
   var posAdjustLeft = $(this).attr("data-heart-left");
   var heartSize = $(this).attr("data-heart-size");
   var heartColor = $(this).attr("data-color");
   var heartClass = $(this).attr("id");
  $('#heartid').css('top', posAdjustTop +'%');
  $('#heartid').css('left', posAdjustLeft +'%');
  $('#heartid').css('width', heartSize +'px');
  $('#heartPath').addClass(heartClass);
  $('#heartPath').css('fill', heartColor);

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
      }
});

/* ---Close Button--- */
    $('#rightBtn').click(function(){
    var currentAnimal =  $(document).find('.fullscreen');
    $(currentAnimal).addClass('square');
    $(currentAnimal).removeClass('fullscreen');
    $('#heartPosition, .arrows, .btns').addClass('displayNone');
    });

/* ---Clicking on Side Arrows--- */

$('#rightArrow').click(function(){
    var nextDiv = $('.fullscreen').next('.square');
    if( nextDiv.length == 0 ) {
      var currentAnimal =  $(document).find('.fullscreen');
      $('.square:first').trigger('click');
      $(currentAnimal).addClass('square');
      $(currentAnimal).removeClass('fullscreen');
    } else {
      $(nextDiv).trigger('click');
      $('.fullscreen').trigger('click');
    }
  $('#heartid').hide(1).delay(300).show(100);
});

$('#leftArrow').click(function(){
    var prevDiv = $('.fullscreen').prev('.square');
    var currentAnimal =  $(document).find('.fullscreen');
    if( prevDiv.length == 0 ) {
        $('.square:last').trigger('click');
        $(currentAnimal).addClass('square');
        $(currentAnimal).removeClass('fullscreen');
      } else {
        $(prevDiv).trigger('click');
        $(currentAnimal).addClass('square');
        $(currentAnimal).removeClass('fullscreen');
      }
    $('#heartid').hide(1).delay(300).show(1);
});

/* ---Header Fading--- */
$(window).ready(function(){
    setTimeout(function(){ $('#header').fadeOut() }, 5000);
  });
/* ---Header Appear when Scroll--- */
$(window).scroll(function() {
    $('#header').fadeIn(500);
    setTimeout(function(){ $('#header').fadeOut() }, 3000);
});

  /* ---Modal--- */

$(".modal-close").click (function() {
  $("#playModal, #mute").addClass("displayNone");
  $('#unmute').removeClass('displayNone');
});

/* --------- Loopify contoll with Modal & Mute/Unmute Btn --------- */

function handleOggReady(err,loop){
  if (err) {
    console.warn(err);
  }
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
};

