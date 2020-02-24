///////////////////////////// Generate Grid Animals

// Connect to JSON
var animalRequest = new XMLHttpRequest();
if (!animalRequest) {
  alert('Giving up :( Cannot create an XMLHTTP instance');
}

animalRequest.open('GET','animal_data.json', true);

animalRequest.onload = function() {
var animalData = JSON.parse(animalRequest.responseText);

// Generate divs for template

  var animalTemplate = document.getElementById("template-animal");
  var animalTemplateHtml = animalTemplate.innerHTML;
  var listHtml = "";
  
  for (var key in animalData) {

    listHtml += animalTemplateHtml
        .replace(/{{animalId}}/g, animalData[key]["id"])
        .replace(/{{animalNumber}}/g, animalData[key]["animalNumber"])
        .replace(/{{animalName}}/g, animalData[key]["name"])
  }
  
  document.getElementById("grid-wrapper").innerHTML = listHtml;

// Generate Dots for Analytics

var dotTemplate = document.getElementById("template-dots");
var dotTemplateHtml = dotTemplate.innerHTML;
var listHtml = "";

$('#dotInfo').hide();

for (var key in animalData) {

  listHtml += dotTemplateHtml
      .replace(/{{animalId}}/g, animalData[key]["id"])
      .replace(/{{animalNumber}}/g, animalData[key]["animalNumber"])
      .replace(/{{lifePercent}}/g, animalData[key]["years"])
      .replace(/{{bpmPercent}}/g, animalData[key]["bpmPercent"])
}

document.getElementById("chartWrap").innerHTML = listHtml;

///////////////// Focus on an Animal in Analytics Features

function animalDotFocus(animalNumber) {
        var lifePercentValue = animalData[animalNumber]["years"];
        var bpmPercentValue = animalData[animalNumber]["bpmPercent"];
        var bpmPercent = "calc(" + bpmPercentValue + "% + 30px)";
        var bpmPercentString = bpmPercentValue + "%";
        var lifePercent = lifePercentValue + "%";
        var lifePercentString = "calc(" + lifePercentValue + "% - 30px)";
        var animalID = animalData[animalNumber]["id"];
        var animalName = animalData[animalNumber]["name"];
        var animalBPM = animalData[animalNumber]["beatsPerMinute"];
        var animalBPL = animalData[animalNumber]["beatsPerLife"];
        var dotInfoString = "<img src='images/static-animals/" + animalID + "_static.svg'><p class='dotInfoLarge'>" + animalName + "</p><p class='dotInfoSmall'>" + animalName + "'s average heart rate is <span>" + animalBPM + "</span> beats per minute, and they live about <span> " + lifePercentValue + " </span>years. Their total heartbeats per life is about <span> " + animalBPL + " </span> beats.</p>";
        var bpmBubbleString = "<div class='bubbles'>" + animalBPM + "</div>";
        var lifeBubbleString = "<div class='bubbles-life'>" + lifePercentValue + "</div>";
        $('#verticalLine').css({
          'right': bpmPercent,
          'display':'block'
        });
        $('#verticalLine').after(bpmBubbleString);
        $('#horizontalLine').css({
          'bottom': lifePercent,
          'display':'block'
        });
        $('#horizontalLine').before(lifeBubbleString);
        $('#dotInfo').html(dotInfoString);
        $('#dotInfo').fadeIn(100);
        $('.bubbles').css({
          'right': bpmPercentString
        });
        $('.bubbles-life').css({
          'bottom': lifePercentString
          });

          var animalIDString = "#" + animalID
          var theAnimalDot = $(animalIDString);
          $(theAnimalDot).css({
            "opacity":"1"
          });
};

function animalDotUnFocus() {
    $('#verticalLine').css({
      'display':'none'
    });
    $('.bubbles').fadeOut(100);
    $('.bubbles-life').fadeOut(100);
    $('#horizontalLine').css({
      'display':'none'
    });
    $('#dotInfo').html('');
    $('#dotInfo').fadeOut(100);
    $('.chart-animals').css({
      "opacity":"0.5"
    });
};

// Open/Close Analytics features

function openAnalytics() {
  var positionTop = $("#mobileNav").css("top");
    if(positionTop == "0px") {
      $("#mobileNav").animate({
        top: "-130px"
      });
    }
    $('#analytics').css({
      'bottom':'0',
      'transition-duration':'300ms'
    });
    $('#rightBtnAnalytics').removeClass('displayNone');
  };

  function closeAnalytics() {
    $('#analytics').css({
      'bottom':'-100vh',
      'transition-duration':'300ms'
    });
    $('#rightBtnAnalytics').addClass('displayNone');
  };

/////////////////////////////////////////// Sounds

  var animalSound = [
    {sound: new Howl({ src: ['sounds/01BlueWhale09.ogg', 'sounds/01BlueWhale09.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/02DesertTortoise12.ogg', 'sounds/02DesertTortoise12.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/04Elephant30.ogg', 'sounds/04Elephant30.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/05Alligator32.ogg', 'sounds/05Alligator32.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/06Horse34.ogg', 'sounds/06Horse34.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/07Dolphin40.ogg', 'sounds/07Dolphin40.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/08Ox50.ogg', 'sounds/08Ox50.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/09BrownBear55.ogg', 'sounds/09BrownBear55.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/11Giraffe67.ogg', 'sounds/11Giraffe67.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/12DairyCow69.ogg', 'sounds/12DairyCow69.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/13Human72.ogg', 'sounds/13Human72.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/14Goat73.ogg', 'sounds/14Goat73.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/15Sheep75.ogg', 'sounds/15Sheep75.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/16Pig80.ogg', 'sounds/16Pig80.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/17Dog90.ogg', 'sounds/17Dog90.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/18Cat130.ogg', 'sounds/18Cat130.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/19Pigeon185.ogg', 'sounds/19Pigeon185.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/20Duck190.ogg', 'sounds/20Duck190.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/21Monkey190.ogg', 'sounds/21Monkey190.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/22WildTurkey195.ogg', 'sounds/22WildTurkey195.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/23Rabbit205.ogg', 'sounds/23Rabbit205.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/25Chicken275.ogg', 'sounds/25Chicken275.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/26Buzzard300.ogg', 'sounds/26Buzzard300.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/27AmericanCrow380.ogg', 'sounds/27AmericanCrow380.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/29Mouse600.ogg', 'sounds/29Mouse600.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/30Canary1000.ogg', 'sounds/30Canary1000.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/31Hummingbird1260.ogg', 'sounds/31Hummingbird1260.mp3'], loop: true})},
    {sound: new Howl({ src: ['sounds/32EtruscanShrew1510.ogg', 'sounds/32EtruscanShrew1510.mp3'], loop: true})}       
  ];

$(document).ready(function(){
  $("#playHeart").on('click', function(){
    $(".modal-close, #playModal").addClass("displayNone");
    for (i = 0; i < animalSound.length; i++) {
        var id1 = animalSound[i].sound.play();
        animalSound[i].sound.fade(0, 0.7, 2000, id1);
    }
  });
});

//* --------- Audio contoll with Modal & Mute/Unmute Btn --------- */

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

////////////////////// Fullscreen Animal

function generateFullScreenAnimal(animalNumberFullScreen){
  var animalColor = animalData[animalNumberFullScreen]["color"];
  var animalId = animalData[animalNumberFullScreen]["id"];
  var animalPositionTop = animalData[animalNumberFullScreen]["heartTop"] + "%";
  var animalPositionLeft = animalData[animalNumberFullScreen]["heartLeft"] + "%";
  var animalPositionSize = animalData[animalNumberFullScreen]["heartSize"];
  var animalImgString = "images/animated-animals/" + animalId + ".svg";
  var animalName = animalData[animalNumberFullScreen]["name"];
  var animalBPMString = animalData[animalNumberFullScreen]["beatsPerMinute"] + "<br/><span>BPM</span>"
  var animalLifeString = animalData[animalNumberFullScreen]["years"] + "<br/><span>years</span>"
  var animalTotalString = animalData[animalNumberFullScreen]["beatsPerLife"] + "m<br/><span>heartbeats</span></td>"
  $('.fullscreen').removeClass('displayNone');
  $('.fullscreen').attr('data-animalNumber', animalNumberFullScreen);
  $('#heartPath').removeClass().addClass(animalId);
  $('#heartid').css({
      'top':animalPositionTop,
      'left':animalPositionLeft,
      'width':animalPositionSize
  });
  $('.fullscreen').css({'background-color':animalColor});
  $('#animatedAnimalSVG').attr('src', animalImgString);
  $('.animaiNameFullScreen').html(animalName);
  $('#animalBPM').html(animalBPMString);
  $('#animalLife').html(animalLifeString);
  $('#animalTotal').html(animalTotalString);
// Sound for the Animal
  for (i = 0; i < animalSound.length; i++) {
    if(i == animalNumberFullScreen) {
        animalSound[i].sound.volume(1.0);
    } else {
        animalSound[i].sound.volume(0.1);
    }
}    
};

// Open Full screen animal

$('.square').on('click', function() {
  var animalNumberFullScreen = $(this).attr("data-animalNumber");
  generateFullScreenAnimal(animalNumberFullScreen);
});

// Left / Preview Arrow Button

$('#leftArrow').on('click', function() {
  var animalNumberFullScreen = $('.fullscreen').attr("data-animalNumber") - 1;
  var lastItemPotition = animalData.length -1;
  if (animalNumberFullScreen == -1) {
      var animalNumberFullScreen = lastItemPotition;
  }
  generateFullScreenAnimal(animalNumberFullScreen);
});

// Right / Next Arrow Button

$('#rightArrow').on('click', function() {
  var animalNumberFullScreen = $('.fullscreen').attr("data-animalNumber");
  var animalNumberFullScreen = parseInt(animalNumberFullScreen);
  var animalNumberFullScreen = parseInt(animalNumberFullScreen) +1;
  var lastItemPotition = animalData.length;
  if(animalNumberFullScreen==lastItemPotition) {
      animalNumberFullScreen = 0;
  }
  generateFullScreenAnimal(animalNumberFullScreen);
});

///////////////////////////// Analytic Focus Handling

var timer;
$('.chart-animals').mouseenter(function() {
    var that = this;
    timer = setTimeout(function(){
      var animalNumber = $(that).attr('data-animalNumber');
      animalDotFocus(animalNumber);
            // Sound for the Animal
            for (i = 0; i < animalSound.length; i++) {
              if(i == animalNumber) {
                  animalSound[i].sound.volume(1.0);
              } else {
                  animalSound[i].sound.volume(0.1);
              }
        }    
      }, 200);
}).mouseleave(function() {
    clearTimeout(timer);
});

 $('.chart-animals').mouseleave(function(){
  animalDotUnFocus();
 });

 // Open from Fullscreen animal page

 $('#openAnalytics').click(function() {
   var animalFocusFullScreen = $('.fullscreen').attr("data-animalNumber");
   animalDotFocus(animalFocusFullScreen);
   openAnalytics();
   });

// close Btn in Analytics page
  $('#rightBtnAnalytics').click(function() {
    var animalFullscreenNotOpen = $(".fullscreen").hasClass('displayNone');
    if(animalFullscreenNotOpen == true) {
      closeAnalytics();
      for (i = 0; i < animalSound.length; i++) {
        var id1 = animalSound[i].sound.play();
        animalSound[i].sound.fade(0, 0.7, 2000, id1);
      }
    } else {
      closeAnalytics();
      var animalNumber = $('.fullscreen').attr('data-animalNumber');
            for (i = 0; i < animalSound.length; i++) {
              if(i == animalNumber) {
                  animalSound[i].sound.volume(1.0);
              } else {
                  animalSound[i].sound.volume(0.1);
              }
            }
    }
    closeFullscreenAnimal();
    closeFullscreenAnimalSound();
  });

  // from Header
  $('.navAnalytics').click(function() {
    var positionTopAnalytics = $("#analytics").css("top");
    var animalFullscreenNotOpen = $(".fullscreen").hasClass('displayNone');
    var animalNumber = $('.fullscreen').attr('data-animalNumber');
    if(positionTopAnalytics !== "0px") {
      openAnalytics();
    } else {
      closeAnalytics();
      if(animalFullscreenNotOpen == false) {
        for (i = 0; i < animalSound.length; i++) {
          if(i == animalNumber) {
              animalSound[i].sound.volume(1.0);
          } else {
              animalSound[i].sound.volume(0.1);
          }
        }
      } else {
        for (i = 0; i < animalSound.length; i++) {
          var id1 = animalSound[i].sound.play();
          animalSound[i].sound.fade(0, 0.7, 2000, id1);
        }
      }
    }
  });

// from Analytics to Fullscreen animal page
$('.chart-animals').click(function(){
  var clickedAnimalNumber = $(this).attr("data-animalNumber");
  closeAnalytics();
  generateFullScreenAnimal(clickedAnimalNumber);
})

///////////////////////////// Close Button

function closeFullscreenAnimal(){
  $('.fullscreen').addClass('displayNone');
  $('#heartPath').removeClass();
};

function closeFullscreenAnimalSound() {
  var animalNumberFullScreen = $('.fullscreen').attr("data-animalNumber");
   for (i = 0; i < animalSound.length; i++) {
       if(i == animalNumberFullScreen) {
           animalSound[i].sound.fade(1, 0.7, 1000);
       } else {
           animalSound[i].sound.fade(0.1, 0.7, 2000);
       }
   }
   };
  $('#rightBtn').click(function() {
    closeFullscreenAnimal();
    closeFullscreenAnimalSound();
  });
  
};
animalRequest.send();

///////////////////////////// Header

// Header Fading in and out

$(document).ready(function(){
  var fadingOutHandle;
  
  var headerFadeOut = function() {
    window.clearTimeout(fadingOutHandle);
      fadingOutHandle = setTimeout(function(){
        $("#header").css("opacity", 0);
        }, 2000);
  };

  $("#header").css("opacity", 1);
    
  $("html").mousemove(function( event ) {
    $("#header").css("opacity", 1);
  var positionTop = $("#mobileNav").css("top");
    if(positionTop != "0px") {
      headerFadeOut();
    } else {
    }
    });
  
    window.addEventListener("scroll", function () {
      $("#header").css("opacity", 1);
      headerFadeOut();
    });

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
  });
