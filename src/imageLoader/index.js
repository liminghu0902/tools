
function ImageLoader(options) {

	var self = this;

	if(!options || !options.images || !(options.images instanceof Array) || options.images.length === 0) {
		return false;
	}

	self.opts = options;

	//图片数组
	self.images = options.images;

	//默认所有图片加载成功
	self.success = true;

	//是否超时
	self.isTimeout = false;

	//加载图片的数量
	self.count = 0;

	var images = self.images;

	for(var key in images) {

		//过滤原型链上的属性
		if(!images.hasOwnProperty(key)) {
			continue;
		};
		
		var item = images[key];

		//如果item是字符串类型，则转换为Object
		if(typeof item === 'string') {
			item = images[key] = {
				src: item
			}
		};

		if(!item || !images[key]) {
			continue;
		};

		item.img = new Image();

		self.onLoad(item);
	}

	if(self.opts.timeout) {
		self.onTimeout();
	}

}

//开始加载图片
ImageLoader.prototype.onLoad = function(item) {
	var self = this;
	
	if(!item) {
		return false;
	}

	item.img.onload = function() {
		self.success = self.success && true;
		item.success = true;
		self.done(item)
	};
	item.img.onerror = function() {
		self.success = item.success = false;
		self.done(item)
	};

	item.img.src = item.src;
}

ImageLoader.prototype.done = function(item) {
	var self = this;
	self.count++;

	self.getProgress(self.count);

	if(!item) {
		return false;
	}

	if(!item.id) {
		item.id = self.count;
	}
	
	if(!self.isTimeout) {

		//单张图片加载完成
		self.onImageLoaded(item)

		//如果所有图片加载完成，且没有超时，则清除定时器
		if(self.count === self.images.length) {
			clearTimeout(self.timer);
			self.onAllImageLoaded();
		}
	}
}

//单张图片加载完成
ImageLoader.prototype.onImageLoaded = function(item) {
	var self = this;
	if(!item) {
		return false;
	}
	self.opts.onImageLoaded && self.opts.onImageLoaded(item);
}

//所有图片加载完成
ImageLoader.prototype.onAllImageLoaded = function() {
	var self = this,
		data = {
		success : self.success,
		images: self.images
	}
	self.opts.onAllImageLoaded && self.opts.onAllImageLoaded(data);
}

//加载超时
ImageLoader.prototype.onTimeout = function() {
	var self = this;
	self.timer = setTimeout(function() {
		self.isTimeout = true;
		self.opts.onTimeout();
		throw new Error('超时')
	}, self.opts.timeout);
}

//获取图片加载进度
ImageLoader.prototype.getProgress = function(count) {
	var self = this;
	var progress = (count/self.images.length).toFixed(2);
	self.opts.progress && self.opts.progress(progress)
}
