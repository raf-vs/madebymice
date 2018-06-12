/*
* @Author: Raf Van Suetendael
* @Date:   11-06-2018 20:46:19
* @Last Modified by:   Raf Van Suetendael
* @Last Modified time: 11-06-2018 22:14:14
*/
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/javascript/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

$(document).ready(function(){
  $('#scene').mousemove(function(e){
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        $('.js-mousemove').css({'top': y,'left': x}); 
  });
 });