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
    {sound: new Howl({ src: ['sounds/01BlueWhale09', 'sounds/01BlueWhale09'], loop: true})},
    {sound: new Howl({ src: ['sounds/02DesertTortoise12.ogg', 'sounds/02DesertTortoise12.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/04Elephant30.ogg', 'sounds/04Elephant30.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/05Alligator32.ogg', 'sounds/05Alligator32.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/06Horse34.ogg', 'sounds/06Horse34.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/07Dolphin40.ogg', 'sounds/07Dolphin40.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/08Ox50.ogg', 'sounds/08Ox50.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/09BrownBear55.ogg', 'sounds/09BrownBear55.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/11Giraffe67.ogg', 'sounds/11Giraffe67.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/12DairyCow69.ogg', 'sounds/12DairyCow69.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/13Human72.ogg', 'sounds/13Human72.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/14Goat73.ogg', 'sounds/14Goat73.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/15Sheep75.ogg', 'sounds/15Sheep75.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/16Pig80.ogg', 'sounds/16Pig80.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/17Dog90.ogg', 'sounds/17Dog90.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/18Cat130.ogg', 'sounds/18Cat130.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/19Pigeon185.ogg', 'sounds/19Pigeon185.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/20Duck190.ogg', 'sounds/20Duck190.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/21Monkey190.ogg', 'sounds/21Monkey190.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/22WildTurkey195.ogg', 'sounds/22WildTurkey195.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/23Rabbit205.ogg', 'sounds/23Rabbit205.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/25Chicken275.ogg', 'sounds/25Chicken275.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/26Buzzard300.ogg', 'sounds/26Buzzard300.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/27AmericanCrow380.ogg', 'sounds/27AmericanCrow380.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/29Mouse600.ogg', 'sounds/29Mouse600.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/30Canary1000.ogg', 'sounds/30Canary1000.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/31Hummingbird1260.ogg', 'sounds/31Hummingbird1260.ogg'], loop: true})},
    {sound: new Howl({ src: ['sounds/32EtruscanShrew1510.ogg', 'sounds/32EtruscanShrew1510.ogg'], loop: true})}       
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
    $('#heartPath').addClass(heartClass);

    if ($(window).width() < 410) {
      $('#heartid').css('width', heartSize * 0.5 +'px');
    } else if ($(window).width() < 480) {
      $('#heartid').css('width', heartSize * 0.8 +'px');
    } else {
      $('#heartid').css('width', heartSize +'px');
    }

    $(window).resize(function() {
      if ($(window).width() < 410) {
        $('#heartid').css('width', heartSize * 0.5 +'px');
      }
      else if ($(window).width() < 480 || $(window).width() > 410) {
        $('#heartid').css('width', heartSize * 0.8 +'px');
      } else if ($(window).width() > 480) {
        $('#heartid').css('width', heartSize +'px');
      }
    });

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
      // var theImgName = $(this).delay(1000).find($('.aniimg > img')).position();
      // alert(theImgName.top);
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

/* ---Header Fading in and out--- */

$(document).ready(function(){
  $("#header").css("opacity", 1);
  
$("html").mousemove(function( event ) {
  $("#header").css("opacity", 1);
var positionTop = $("#mobileNav").css("top");
  if(positionTop != "0px") {
    headerFadeOut();
  } else {
    headerNotFadeOut();
  }
  });

  window.addEventListener("scroll", function () {
    $("#header").css("opacity", 1);
    headerFadeOut();
  });
var fadingOutHandle;

  function headerFadeOut() {
    window.clearTimeout(fadingOutHandle);
      fadingOutHandle = setTimeout(function(){
        $("#header").css("opacity", 0);
        }, 2000);
  };

  $('#menuIcon').click(function() {
    var positionTop = $("#mobileNav").css("top");
    if(positionTop == "0px") {
      $("#mobileNav").animate({
        top: "-130px"
      }, 200, function() {
        $("#mobileNav").css("display", "none");
        headerFadeOut();
      });
    } else {
      $("#mobileNav").css("display", "block");
      $("#mobileNav").animate({
        top: "0px"
      }, 300, function() {
        window.clearTimeout(fadingOutHandle);
      });
    }
  });

  // function headerFadeOut() {
  //   // var dropMenuOpacity = $("#mobileNav").css("opacity");
  //   // if(dropMenuOpacity == "0"){
  //     fadingOutHandle = setTimeout(function(){
  //         $("#header").css("opacity", 0);
  //     }, 3000);
  // //  } else {}
  // }
  //   function stopFadeOut() {
  //     var positionTop = $("#mobileNav").css("top");
  //     if(positionTop == "0px") {
  //          clearTimeout(fadingOutHandle);
  //       }
  //  };
  // var dropMenuOpacity = $("#mobileNav").css("opacity");
  // if(dropMenuOpacity == 1){
  // } else {

});






