/*
* @Author: Raf Van Suetendael
* @Date:   11-06-2018 20:46:19
* @Last Modified by:   Raf Van Suetendael
* @Last Modified time: 18-06-2018 23:37:09
*/
var width = 100,
    perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime/1000)%60)*100;

// Loadbar Animation
$(".loadbar").animate({width: width + "%"}, time);

// Percentage Increment Animation
var PercentageID = $("#precent"),
    start = 0,
    end = 100,
    durataion = time;
    animateValue(PercentageID, start, end, durataion);
    
function animateValue(id, start, end, duration) {
  
  var range = end - start,
      current = start,
      increment = end > start? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);
    
  var timer = setInterval(function() {
    current += increment;
    $(obj).text(current + "%");
      //obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Fading Out Loadbar on Finised
setTimeout(function(){
  $('.js-preloader').fadeOut(300);
}, time);

particlesJS.load('particles-js', 'assets/javascript/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

var title = document.getElementById('title');
var parallax = new Parallax(title, {
	onReady: console.log('ready')
});

var dictionary = "azertyuiopqsdfghjklmwxcvbn".split('');

var el = document.getElementById('main-title');

var ran = function() {
 return Math.floor(Math.random() * dictionary.length)
}

var ranString = function(amt) {
  var string = '';
  for(var i = 0; i < amt; i++) {
    string += dictionary[ran()];
  }
  return string;
}

var txtScramble = function(str) {
  var count = str.length;
  var delay = 5;
  
  el.innerHTML = '';
  
  var gen = setInterval(function() {
    el.setAttribute('data-before', ranString(count));
    el.setAttribute('data-after', ranString(count));
    if(delay > 0) {
      delay--;
    }
    else {
      if(count < str.length) {
        el.innerHTML += str[str.length - count-1];
      }
      count--;
      if(count === -1) {
        clearInterval(gen);
      }
    }
  }, 30);
}

$(document).ready(function(){

    var $el = $('#main-title');
    var titleBottom = $el.position().top + $el.offset().top + $el.outerHeight(true);

    if(!window.location.hash || location.hash === "#Home") {
      var title = $('#main .section').eq(0).attr("data-title");
      txtScramble(title);
      $('#main .section.active').find('.js-reposition').css('top', titleBottom + 10 );
    }

    var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
    })();

    $(window).resize(function () {
        waitForFinalEvent(function(){
          var $el = $('#main-title');
          var titleBottom = $el.position().top + $el.offset().top + $el.outerHeight(true);
          $('#main .section.active').find('.js-reposition').css('top', titleBottom + 10 );
        }, 500, "reposition-skills");
    });

    setTimeout(function() {
      var $el = $('#main-title');
      var titleBottom = $el.position().top + $el.offset().top + $el.outerHeight(true);
      $('#main .section.active').find('.js-reposition').css('top', titleBottom + 10 );
    },500);

    function removeColorClasses (index, classNames) {
      var current_classes = classNames.split(" "),
          classes_to_remove = [];

      $.each(current_classes, function (index, class_name) {
        if (/bg.*/.test(class_name)) {
          classes_to_remove.push(class_name);
        }
      });
      return classes_to_remove.join(" ");
    }

  	$('#main').fullpage({
      navigation: true,
      navigationPosition: 'right',
      // anchors: ['Home', 'one', 'two', 'three', 'four'],
  		onLeave: function(index, nextIndex, direction){
        var title = $('#main .section').eq(nextIndex - 1).attr("data-title");
  			txtScramble(title);
        $('body').addClass('is-switching');
        $(this).find('.js-reposition').fadeOut();
  		},
      afterLoad: function(anchorLink, index){
        var $el = $('#main-title');
        var titleBottom = $el.position().top + $el.offset().top + $el.outerHeight(true);
        $(this).find('.js-reposition').css('top', titleBottom + 10).fadeIn(1000);
        $('.o-pattern').removeClass(removeColorClasses);
        $('.o-pattern').addClass('bg-' + index);
        $('body').removeClass('is-switching');
      },
      afterRender: function(){
        var $el = $('#main-title');
        var titleBottom = $el.position().top + $el.offset().top + $el.outerHeight(true);
        $(this).find('.js-reposition').css('top', titleBottom + 10).fadeIn(1000);
        setTimeout(function() {
          $('.js-preloader').fadeOut();
        },500);
      }
  	});

    $('.js-projectslider').slick({
      dots: true,
      arrows: false,
      fade: true,
      customPaging : function(slider, i) {
        return '<a></a>';
      }
      // appendDots: $(this)
    });

    var $carousel = $('.js-projectslider');
    $(document).on('keydown', function(e) {
        if(e.keyCode == 37) {
            $carousel.slick('slickPrev');
        }
        if(e.keyCode == 39) {
            $carousel.slick('slickNext');
        }
    });

});