
function Observer() {
	this.sub = [];
}

Observer.prototype.publish = function(data) {
	var self = this, len = this.sub.length;
	for(var i=0; i< len; i++) {
		self.sub[i].call(data);
	}
}

Observer.prototype.subscribe = function(subscriber) {
	this.sub.push(subscriber);
}