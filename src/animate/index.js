
var ASYNC_TASK = ASYNC_TASK,
	SYNC_TASK = SYNC_TASK,
	STATE_STARTE = STATE_START,
	STATE_STOP = STATE_STOP;



function Animation() {
	this.taskQueue = [];
	this.index = 0;
}

//添加任务
Animation.prototype._add = function(taskFn, type) {
	this.taskQueue.push({
		taskFn: taskFn,
		type: type
	})
	return this;
}

//执行下一个任务
Animation.prototype._next = function() {
	this.index++;
}

//执行任务
Animation.prototype._runTask = function() {
	var self = this;
	if(!self.taskQueue || self.state !== STATE_START) {
		return;
	};
	if(self.index === self.taskQueue.length) {
		self.dispost();
		return;
	}
	var task = self.taskQueue[self.index];
	if(task.type === ASYNC_TASK) {
		self._asyncTask(task);
	};
	if(task.type === SYNC_TASK) {
		self._syncTask(task);
	};
}

//执行一个同步任务
Animation.prototype._syncTask = function(task) {
	var self = this;
	var taskFn = function() {
		self._next();
	};
	task.taskFn(taskFn);
}

//执行一个异步任务
Animation.prototype._asyncTask = function(task) {

}

//动画开始执行，interval表示动画执行的间隔
Animation.prototype.start = function(interval) {
	var self = this;
	if(self.state === STATE_START || !self.taskQueue) {
		return self;
	}
	if(self.index === self.taskQueue.length) {
		return self;
	}
	self.state = STATE_START;

	return self;
}

//预加载图片
Animation.prototype.loadImage = function() {

}

//改变元素的background-position
Animation.prototype.changePosition = function() {

}

//每一帧动画的回调
Animation.prototype.enterFrame = function() {

}

//重复的次数，times为空时无限重复
Animation.prototype.repeat = function() {

}

//考虑到没传参的情况
Animation.prototype.repeatForever = function() {
	
}

//每个动画执行之后等待的时间
Animation.prototype.wait = function() {
	
}

//动画执行完成后的回调函数
Animation.prototype.then = function() {
	
}

//暂停动画
Animation.prototype.pause = function() {
	
}

//动画从上一次暂停处重新执行
Animation.prototype.restart = function() {
	
}

//释放资源
Animation.prototype.dispost = function() {
	
}