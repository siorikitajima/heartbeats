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
    callback(parsedData);
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

  var animalSound = [
    {sound: new Howl({ src: ['sounds/bluewhale.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/deserttortoise.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/elephant.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/alligator.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/horse.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/dolphin.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/ox.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/brownbear.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/giraffe.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/dairycow.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/human.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/goat.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/sheep.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/pig.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/dog.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/cat.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/pigeon.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/duck.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/monkey.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/wildturkey.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/rabbit.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/chicken.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/buzzard.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/americancrow.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/mouse.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/canary.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/hummingbird.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/etruscanshrew.ogg'], loop: true})}       
  ];

  $("#playHeart").on('click', function(){
    $(".modal-close").addClass("displayNone");
    $("#playModal").addClass("displayNone");
        for (i = 0; i < animalSound.length; i++) {
            var id1 = animalSound[i].sound.play();
            animalSound[i].sound.fade(0, 0.7, 2000, id1);
        }
  });

  /* --------- Loopify contoll with Modal & Mute/Unmute Btn --------- */

  $("#mute").click (function() {
    Howler.mute(true);
    $('#mute').addClass('displayNone');
    $('#unmute').removeClass('displayNone');
  });

  $("#unmute").click (function() {
      Howler.mute(false);
    $('#unmute').addClass('displayNone');
    $('#mute').removeClass('displayNone');
  });

    /* ---Modal--- */

$(".modal-close").click (function() {
  $("#playModal, #mute").addClass("displayNone");
  $('#unmute').removeClass('displayNone');
  for (i = 0; i < animalSound.length; i++) {
    animalSound[i].sound.play();
    animalSound[i].sound.volume(0.7);
    Howler.mute(true);
  }
});

  $('.animal-loading-status').addClass('displayNone');
  $('.show-starter').removeClass('displayNone');

  /* --------- When an animal square is clicked --------- */
$(document).on('click', '.square', function(){

    /* ---Grid <> Fullscreen--- */
    $('#heartPath').removeClass();
    $(this).removeClass('square');
    $(this).addClass('fullscreen');
  
    /* ---Positioning & Coloring Heart--- */
     var posAdjustTop = $(this).attr("data-heart-top");
     var posAdjustLeft = $(this).attr("data-heart-left");
     var heartSize = $(this).attr("data-heart-size");
//     var heartColor = $(this).attr("data-color");
     var heartClass = $(this).attr("id");
    $('#heartid').css('top', posAdjustTop +'%');
    $('#heartid').css('left', posAdjustLeft +'%');
    $('#heartid').css('width', heartSize +'px');
    $('#heartPath').addClass(heartClass);
//    $('#heartPath').css('fill', heartColor);
  
    var animalNumber = $(this).attr('data-animalNumber');
    for (i = 0; i < animalSound.length; i++) {
        if(i == animalNumber) {
            animalSound[i].sound.volume(1.0);
        } else {
            animalSound[i].sound.volume(0.1);
        }
    }

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

    /* ---Close Button--- */
    $('#rightBtn').click(function(){
        var currentAnimal =  $(document).find('.fullscreen');
        $(currentAnimal).addClass('square');
        $(currentAnimal).removeClass('fullscreen');
        $('#heartPosition, .arrows, .btns').addClass('displayNone');
        for (i = 0; i < animalSound.length; i++) {
            if(i == animalNumber) {
                animalSound[i].sound.fade(1, 0.7, 1000);
            } else {
                animalSound[i].sound.fade(0.1, 0.7, 2000);
            }
        }
        });
  });
};

getJsonData(
  'animal_data.json',
  animalDataHandler
);

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
    setTimeout(function(){ 
      $('#header').fadeOut() }, 5000);
  });
/* ---Header Appear when Scroll--- */
$(window).scroll(function() {
    $('#header').fadeIn(500);
    setTimeout(function(){ $('#header').fadeOut() }, 3000);
});





