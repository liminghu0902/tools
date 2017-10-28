'use strict';

/**
 * [loadImage 图片预加载]
 * @param  {[type]}   imgList  [图片数组]
 * @param  {Function} callback [回调]
 * @return {[type]}            [void]
 */
function loadImage(imgList, callback, timeout) {

	if(!imgList || !(imgList instanceof Array)) {
		return;
	}

		//默认所有图片可以加载完成
	var success = true,
		//超时状态
		isTimeout = false,
		//加载状态
		state,
		//加载图片的数量
		count = 0,
		//计时器
		timer = null;

	for(var key in imgList) {

		//过滤原型链上的属性
		if(!imgList.hasOwnProperty(key)) {
			continue;
		}

		var item = imgList[key];

		if(typeof item === 'string') {
			item = imgList[key] = {
				src: item
			}
		}

		if(!item || !item.src) {
			continue;
		}
		count++;
		item.img = new Image();
		onLoad(item);
	}

	if(!count) {
		callback(success);
	}else if(timeout) {
		timer = setTimeout(onTimeout, timeout);
	}

	function onLoad(item) {
		var img = item.img;
		img.onload = function() {
			item.success = true;
			success = success && true;
			done();
		}
		img.onerror = function() {
			item.success = false;
			success = false;
			done();
		}
		img.src = item.src;
		
		function done() {
			if(!--count && !isTimeout) {
				clearTimeout(timer);
				callback(success);
			}
		}
	}

	function onTimeout() {
		isTimeout = true;
		callback(false);
	}
}