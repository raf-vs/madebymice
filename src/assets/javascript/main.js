/*
* @Author: Raf Van Suetendael
* @Date:   11-06-2018 20:46:19
* @Last Modified by:   Raf Van Suetendael
* @Last Modified time: 15-06-2018 00:08:52
*/
particlesJS.load('particles-js', 'assets/javascript/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

var scene = document.getElementById('scene');
var parallax = new Parallax(scene, {
	onReady: console.log('ready')
});

var dictionary = "abcdefghijklmnopqrstuvw".split('');

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
	console.log('txtScramble');
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
  }, 32);
}

$(document).ready(function(){

    if(!window.location.hash) {
      var title = $('#main section').eq(0).attr("data-title");
      txtScramble(title);
    }
    

  	$('#main').fullpage({
    navigation: true,
    navigationPosition: 'right',
    anchors: ['Home', 'one', 'two', 'three', 'four'],
		onLeave: function(index, nextIndex, direction){
      var title = $('#main section').eq(nextIndex - 1).attr("data-title");
			txtScramble(title);
		}
	});
});