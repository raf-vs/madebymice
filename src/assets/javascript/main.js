/*
* @Author: Raf Van Suetendael
* @Date:   11-06-2018 20:46:19
* @Last Modified by:   Raf Van Suetendael
* @Last Modified time: 13-06-2018 08:11:28
*/
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/javascript/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

var scene = document.getElementById('scene');
var parallax = new Parallax(scene, {
	onReady: console.log('ready')
});

$(document).ready(function(){
  	$('#main').fullpage({
		continuousVertical: true,
		onLeave: function(index, nextIndex, direction){
			console.log("onLeave--" + "index: " + index + " nextIndex: " + nextIndex + " direction: " +  direction);
		}
	});
});