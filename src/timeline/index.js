'use strict';

var DEFAULT_INTERVAL = 1000/60;

var requestAnimationFrame = (function() {

	return window.requestAnimationFrame ||
		   window.webkitRequestAnimationFrame ||
		   window.mozRequestAnimationFrame ||
		   window.oRequestAnimationFrame ||
		   function (callback) {
		   	return window.setTimeout(callback, DEFAULT_INTERVAL)
		   }
})()

function Timeline() {
	
}