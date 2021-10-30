var anim;
///////////////////////////// Generate Grid Animals

// Connect to JSON
var animalRequest = new XMLHttpRequest();
if (!animalRequest) { alert('Giving up :( Cannot create an XMLHTTP instance'); }

animalRequest.open('GET','js/animal_data.json', true);
animalRequest.onload = function() {

var animalData = JSON.parse(animalRequest.responseText);

// Generate animal divs with template
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
    var colorValue = animalData[animalNumber]["color"];
    var bpmPercent = "calc(" + bpmPercentValue + "% + 30px)";
    var bpmPercentString = bpmPercentValue + "%";
    var lifePercent = lifePercentValue + "%";
    var lifePercentString = "calc(" + lifePercentValue + "% - 30px)";
    var animalID = animalData[animalNumber]["id"];
    var animalName = animalData[animalNumber]["name"];
    var animalBPM = animalData[animalNumber]["beatsPerMinute"];
    var animalBPL = animalData[animalNumber]["beatsPerLife"];
    var dotInfoString = "<img src='images/static-animals/" + animalID + "_static.svg'><p class='dotInfoLarge'>" + animalName + "</p><p class='dotInfoSmall'>" + animalName + "'s average heart rate is <span>" + animalBPM + "</span> beats per minute, and they live about <span> " + lifePercentValue + " </span>years. Their total heartbeats per life is about <span> " + animalBPL + "m </span> beats.</p>";
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
    $('#dotInfo').css({
      'background-color' : colorValue
    });
    $('.bubbles').css({
      'right': bpmPercentString
    });
    $('.bubbles-life').css({
      'bottom': lifePercentString
      });

      var animalIDString = "#" + animalID
      var theAnimalDot = $(animalIDString);
      $(theAnimalDot).addClass('forcusedAnimal');
};

function showAnalyticsArrows() {
  if ($(window).width() < 700) {
    if($('#leftArrowMobile').hasClass('displayNone')) {
    $('#leftArrowMobile, #rightArrowMobile').removeClass('displayNone');
    }
    $('#rightBtnAnalytics').addClass('displayNone');
  } else {
    if($('#leftArrowAnalytics').hasClass('displayNone')) {
    $('#leftArrowAnalytics, #rightArrowAnalytics').removeClass('displayNone');
    }
  }
};

function animalDotUnFocus() {
    $('#verticalLine, #horizontalLine').css({
      'display':'none'
    });
    $('.bubbles').fadeOut(100);
    $('.bubbles-life').fadeOut(100);

    $('#dotInfo').html("<img src='images/PatternBased_art_white_icon.svg'><p class='dotInfoLarge'>Analytics</p><p class='dotInfoSmall'>This chart is showing heart rate and life expectancy of animals. Touch one to learn more. The gray area represents <span>One Million</span> beats per lifetime.</p>");
    $('#dotInfo').css({
      'background-color' : 'rgba(255,137,127,1)'
    });
    $('.forcusedAnimal').removeClass('forcusedAnimal');
};

function hideAnalyticsArrows() {
  if ($(window).width() < 700) {
    if(!$('#leftArrowMobile').hasClass('displayNone')) {
    $('#leftArrowMobile, #rightArrowMobile').addClass('displayNone');
    }
    $('#rightBtnAnalytics').removeClass('displayNone');
  } else {
    if(!$('#leftArrowAnalytics').hasClass('displayNone')) {
      $('#leftArrowAnalytics, #rightArrowAnalytics, #rightBtnAnalytics').addClass('displayNone');
    }
  }
};

// Open/Close Analytics features
function openAnalytics() {
  var positionTop = $("#mobileNav").css("top");
    if(positionTop == "0px") {
      $("#mobileNav").animate({
        top: "-250px"
      }, 200);
    }
    $('#analytics').css({
      'display': 'block'
    });
    setTimeout(()=> {
      $('#analytics').css({
        'bottom':'0',
        'transition-duration':'300ms'
      }, 100);
    })
    if ($(window).width() < 700) {
      $('#rightBtnAnalyticsMobile').removeClass('displayNone');
    } else {
      $('#rightBtnAnalytics').removeClass('displayNone');
    }
  };

  function closeAnalytics() {
    $('#analytics').css({
      'bottom':'-100vh',
      'transition-duration':'300ms'
    });
    setTimeout(()=> {
      $('#analytics').css({
        'display': 'none'
      }, 300);
    })
    if ($(window).width() < 700) {
      $('#rightBtnAnalytics, #rightBtnAnalyticsMobile').addClass('displayNone');
    } else {
      $('#rightBtnAnalytics').addClass('displayNone');
    }
    hideAnalyticsArrows();
  };

/////////////////////////////////////////// Sounds
$.getScript('js/howler.js', function() {

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
  var animalImgString = "images/animated-animals/" + animalId + ".json";
  var animalAnimSpeed = animalData[animalNumberFullScreen]["speed"];
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

  var animData = {
    container: document.getElementById('animatedAnimalSVG'),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: animalImgString
  };
  anim = lottie.loadAnimation(animData);
  anim.setSubframe(false);
  anim.setSpeed(animalAnimSpeed);

  $('.animaiNameFullScreen').html(animalName);
  $('#animalBPM').html(animalBPMString);
  $('#animalLife').html(animalLifeString);
  $('#animalTotal').html(animalTotalString);

};

// Open Full screen animal
$('.square').on('click', function() {
  var animalNumberFullScreen = $(this).attr("data-animalNumber");
  generateFullScreenAnimal(animalNumberFullScreen);
  // Sound for the Animal
  for (i = 0; i < animalSound.length; i++) {
    if(i == animalNumberFullScreen) {
        animalSound[i].sound.volume(1.0);
    } else {
        animalSound[i].sound.volume(0.1);
    }
}    
});

// Left / Preview Arrow Button
$('#leftArrow').on('click', function() {
  anim.destroy();
  var animalNumberFullScreen = $('.fullscreen').attr("data-animalNumber") - 1;
  var lastItemPotition = animalData.length -1;
  if (animalNumberFullScreen == -1) {
      var animalNumberFullScreen = lastItemPotition;
  }
  generateFullScreenAnimal(animalNumberFullScreen);
  // Sound for the Animal
  for (i = 0; i < animalSound.length; i++) {
    if(i == animalNumberFullScreen) {
        animalSound[i].sound.volume(1.0);
    } else {
        animalSound[i].sound.volume(0.1);
    }
}    
});

// Right / Next Arrow Button
$('#rightArrow').on('click', function() {
  anim.destroy();
  var animalNumberFullScreen = $('.fullscreen').attr("data-animalNumber");
  var animalNumberFullScreen = parseInt(animalNumberFullScreen);
  var animalNumberFullScreen = parseInt(animalNumberFullScreen) +1;
  var lastItemPotition = animalData.length;
  if(animalNumberFullScreen==lastItemPotition) {
      animalNumberFullScreen = 0;
  }
  generateFullScreenAnimal(animalNumberFullScreen);
  // Sound for the Animal
  for (i = 0; i < animalSound.length; i++) {
    if(i == animalNumberFullScreen) {
        animalSound[i].sound.volume(1.0);
    } else {
        animalSound[i].sound.volume(0.1);
    }
}    
});

///////////////////////////// Analytic Focus Handling

// var timer;
$('.chart-animals').mouseenter(function() {
  $('.forcusedAnimal').removeClass('forcusedAnimal');
  var animalNumber = $(this).attr('data-animalNumber');
  showAnalyticsArrows();
  animalDotFocus(animalNumber);
  for (i = 0; i < animalSound.length; i++) {
    if(i == animalNumber) {
        animalSound[i].sound.volume(1.0);
    } else {
        animalSound[i].sound.volume(0.1);
    }
  }    
});

 $('#chartWrap').click(function() {
  animalDotUnFocus();
  hideAnalyticsArrows();
  var animalNumberFullScreen = $('.forcusedAnimal').attr("data-animalNumber");
  for (i = 0; i < animalSound.length; i++) {
      if(i == animalNumberFullScreen) {
          animalSound[i].sound.fade(1, 0.7, 1000);
      } else {
          animalSound[i].sound.fade(0.1, 0.7, 2000);
      }
  }
 });

 // Open from Fullscreen animal page

 $('#openAnalytics').click(function() {
   var animalFocusFullScreen = $('.fullscreen').attr("data-animalNumber");
   if(anim) {anim.destroy();}
   animalDotFocus(animalFocusFullScreen);
   showAnalyticsArrows();
   openAnalytics();
   });

// Analytics Left / Right arrow buttons

 $('#leftArrowMobile, #leftArrowAnalytics').click(function() {
  var animalFocusFullScreen = $('.forcusedAnimal').attr("data-animalNumber");
  var numberdFocusedAnimal = Number(animalFocusFullScreen);
  var nextFocusedAnimal = numberdFocusedAnimal +1;
  var lastItemPotition = animalData.length;
  if(nextFocusedAnimal==lastItemPotition) {
    nextFocusedAnimal = 0;
  }
  animalDotUnFocus();
  animalDotFocus(nextFocusedAnimal);
  showAnalyticsArrows();
    for (i = 0; i < animalSound.length; i++) {
      if(i == nextFocusedAnimal) {
          animalSound[i].sound.volume(1.0);
      } else {
          animalSound[i].sound.volume(0.1);
      }
    }    
  });

 $('#rightArrowMobile, #rightArrowAnalytics').click(function() {
  var animalFocusFullScreen = $('.forcusedAnimal').attr("data-animalNumber");
  var numberdFocusedAnimal = Number(animalFocusFullScreen);
  var nextFocusedAnimal = numberdFocusedAnimal -1;
  var lastItemPotition = animalData.length -1;
  if (nextFocusedAnimal == -1) {
    var nextFocusedAnimal = lastItemPotition;
}
  animalDotUnFocus();
  animalDotFocus(nextFocusedAnimal);
  showAnalyticsArrows();
      for (i = 0; i < animalSound.length; i++) {
        if(i == nextFocusedAnimal) {
            animalSound[i].sound.volume(1.0);
        } else {
            animalSound[i].sound.volume(0.1);
        }
      }   
  });

// Close from close Btn in Analytics page
  $('#rightBtnAnalytics, #rightBtnAnalyticsMobile').click(function() {
    var animalFullscreenNotOpen = $(".fullscreen").hasClass('displayNone');
    if(animalFullscreenNotOpen == true) {
      animalDotUnFocus();
      closeAnalytics();
      var animalNumberFullScreen = $('.fullscreen').attr("data-animalNumber");
      for (i = 0; i < animalSound.length; i++) {
          if(i == animalNumberFullScreen) {
              animalSound[i].sound.fade(1, 0.7, 1000);
          } else {
              animalSound[i].sound.fade(0.1, 0.7, 2000);
          }
      }
    } else {
      animalDotUnFocus();
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

  // Open / Close from Header
  $('.navAnalytics').click(function() {
    if(anim){ anim.destroy(); }
    var positionTopAnalytics = $("#analytics").css("top");
    var animalFullscreenNotOpen = $(".fullscreen").hasClass('displayNone');
    if(positionTopAnalytics !== "0px") {
      openAnalytics();
    } else {
      var animalFullscreenNotOpen = $(".fullscreen").hasClass('displayNone');
      if(animalFullscreenNotOpen == true) {
        animalDotUnFocus();
        closeAnalytics();
        var animalNumberFullScreen = $('.fullscreen').attr("data-animalNumber");
        for (i = 0; i < animalSound.length; i++) {
            if(i == animalNumberFullScreen) {
                animalSound[i].sound.fade(1, 0.7, 1000);
            } else {
                animalSound[i].sound.fade(0.1, 0.7, 2000);
            }
        }
      } else {
        animalDotUnFocus();
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
    }
  });

// from Analytics to Fullscreen animal page
$('.chart-animals').click(function(event){
  event.stopPropagation();
  var clickedAnimalNumber = $(this).attr("data-animalNumber");
  generateFullScreenAnimal(clickedAnimalNumber);
  console.log(clickedAnimalNumber);
  animalDotUnFocus();
  closeAnalytics();
  for (i = 0; i < animalSound.length; i++) {
    if(i == clickedAnimalNumber) {
        animalSound[i].sound.volume(1.0);
    } else {
        animalSound[i].sound.volume(0.1);
    }
  } 
})

///////////////////////////// Close Button

function closeFullscreenAnimal(){
  $('.fullscreen').addClass('displayNone');
  $('#heartPath').removeClass();
  if(anim) {anim.destroy();}
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

  $('.navAnimals').click(function() {
    var positionTopAnalytics = $("#analytics").css("top");
    var animalFullscreenNotOpen = $(".fullscreen").hasClass('displayNone');
    var positionTop = $("#mobileNav").css("top");
    if(positionTop == "0px") {
      $("#mobileNav").animate({
        top: "-250px"
      });
    }
    if(positionTopAnalytics !== "0px") {
      if(animalFullscreenNotOpen == false) {
        closeFullscreenAnimal();
        closeFullscreenAnimalSound();
        $("html, body").animate({ scrollTop: 0 }, "slow");
      } else {
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }
    } else {
      if(animalFullscreenNotOpen == false) {
        closeAnalytics();
        closeFullscreenAnimal();
        closeFullscreenAnimalSound();
        $("html, body").animate({ scrollTop: 0 }, "slow");
      } else {
        closeAnalytics();
        closeFullscreenAnimalSound();
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }
    }
  })
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
          top: "-250px"
        }, 200, function() {
          $("#mobileNav").css("display", "none");
          headerFadeOut();
        });
      } else {
        $("#mobileNav").css("display", "block");
        $("#mobileNav").animate({
          top: "0px"
        }, 200, function() {
          window.clearTimeout(fadingOutHandle);
        });
      }
    });
  });

  $('.navAbout').click(function() {
    var positionAbout = $("#aboutPanel").css("right");
    if(positionAbout !== "0px") {
      var positionTop = $("#mobileNav").css("top");
      if(positionTop == "0px") {
        $("#mobileNav").animate({
          top: "-250px"
        },200);
      }
    $('#aboutPanel').css({
      'right':'0px'
    });
    $('#rightBtnAbout').removeClass('displayNone');
    } else {
      $('#aboutPanel').css({
        'right':'-400px'
      });
      $('#rightBtnAbout').addClass('displayNone');
    }
  });

  $('#rightBtnAbout').click(function() {
    $('#aboutPanel').css({
      'right':'-400px'
    });
    $('#rightBtnAbout').addClass('displayNone');
  });