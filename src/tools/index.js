var tools = function() {

	var _doc = document,
		_global = window

	return {
		//加载样式文件
		loadStyle: function(url) {
		    try {
		        document.createStyleSheet(url)
		    } catch(e) {
		        var cssLink = document.createElement('link');
		        cssLink.rel = 'stylesheet';
		        cssLink.type = 'text/css';
		        cssLink.href = url;
		        var head = document.getElementsByTagName('head')[0];
		        head.appendChild(cssLink)
		    }
		},
		//动态加载脚本文件
		loadScript: function(url, callback) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if(script.readyState) {
				script.onreadystatechange = function() {
					if(this.readyState === 'loaded' || this.readyState === 'complete') {
						this.onreadystatechange = null;
						callback && callback();
					}
				}
			} else {
				script.onload = function() {
					callback && callback();
				}
			}
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		},
		//获取取样式
		getStyle: function(dom,style) {
		    if(dom.currentStyle){
		      return dom.currentStyle[style];
		    }else{
		      return getComputedStyle(dom,null)[style];
		    }
		},
		//跨浏览器绑定事件
		bindEvent: function(obj, evt, fn, isbub) { 
		    if(!obj){return;}
		    if (obj.addEventListener) { 
		        obj.addEventListener(evt, fn, isbub ? isbub : false); 
		    }else if(obj.attachEvent){ 
		        obj.attachEvent('on'+evt,fn); 
		    }else{
		        obj["on" + evt] = fn;
		    } 
		},
		//跨浏览器删除事件
		offEvent: function(obj,evt,fn) {
		   if(!obj) {return;}
		   if(obj.removeEventListener) {
		   	obj.removeEventListener(evt, fn)
		   }else if(obj.detachEvent) {
		   	obj.detachEvent('on' + evt, fn)
		   }else {
		   	obj['on' + evt] = null; 
		   }
		},
		//获取页面滚动宽度
		getScrollLeft: function() {
		    return _doc.documentElement.scrollLeft || _doc.body.scrollLeft;
		},
		//获取页面滚动高度
		getScrollTop: function() {
		    return _doc.documentElement.scrollTop || _doc.body.scrollTop;
		},
		//返回顶部
		backTop: function(btnId) {
		    var btn = _doc.getElementById(btnId);
		    var d = _doc.documentElement;
		    var b = _doc.body;
		    _global.onscroll = set;
		    btn.style.display = "none";
		    btn.onclick = function() {
		        btn.style.display = "none";
		        _global.onscroll = null;
		        this.timer = setInterval(function() {
		            d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
		            b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
		            if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, _global.onscroll = set);
		            }, 10);
		    };
		    function set() {
		        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
		    }
		},
		//使用js来生成UUID
		generateID: function(prefix) {
		    prefix = prefix || "prefix"
		    return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, prefix)
		},
		//获取随机数时间戳
		uniqueId: function() {
		    var a=Math.random,b=parseInt;
		    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
		},
		//获取cookie
		getCookie: function(name) {
		    var arr = _doc.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		    if (arr != null) return unescape(arr[2]);
		    return null
		},
		//设置cookie
		setCookie: function(name, value, Hours) {
		    var d = new Date();
		    var offset = 8;
		    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
		    var nd = utc + (3600000 * offset);
		    var exp = new Date(nd);
		    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
		    _doc.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
		},
		//删除cookie
		deleteCookie: function(name) {
		    var expire = new Date();
		    expire.setTime(expire.getTime() - 1);
		    var cval= this.getCookie(name);
		    if(cval!=null)
		    // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
		    // 为了向下兼容
		    _doc.cookie= name + "="+cval+";expires="+expire.toUTCString();
		},
		//设置input光标的位置
	    setCursorPosition: function(elem, index) {
		    var val = elem.value
		    var len = val.length
		 
		    // 超过文本长度直接返回
		    if (len < index) return
		    setTimeout(function() {
		        elem.focus()
		        if (elem.setSelectionRange) { // 标准浏览器
		            elem.setSelectionRange(index, index)   
		        } else { // IE9-
		            var range = elem.createTextRange()
		            range.moveStart("character", -len)
		            range.moveEnd("character", -len)
		            range.moveStart("character", index)
		            range.moveEnd("character", 0)
		            range.select()
		        }
		    })
		},
		//复制到剪贴板
	  	copyTextToClipboard: function(text,success,error) {
	        success = success || function(){};
	        error = error || function(){};
	        // 如果是IE，就使用IE专有方式进行拷贝
	        if(_global.clipboardData){
	            var successful = _global.clipboardData.setData('Text',text);
	            if(successful) {
	                success();
	            } else {
	                error();
	            }
	        }else{
	            var textArea = _doc.createElement('textarea');
	            var styleArr = [ 'position:','fixed;',
	                             'top:','0;',
	                             'left:','0;',
	                             'padding:','0;',
	                             'width:','1px;',
	                             'height:','1px;',
	                             'border:','none;',
	                             'outline:','none;',
	                             'boxShadow:','none;',
	                             'background:','transparent',
	                           ]
	            textArea.style.cssText = styleArr.join('');
	            textArea.value = text;
	            _doc.body.appendChild(textArea);
	            textArea.select();
	            try{
	                var successful = _doc.execCommand('copy');
	                var msg = successful ? 'successful' : 'unsuccessful';
	                console.log('Copying text command was ' + msg);
	                if(successful) {
	                    success();
	                } else {
	                    error();
	                }
	            }catch(e){
	                console.log('Oops, unable to copy');
	                error();
	            }
	            _doc.body.removeChild(textArea);
	        }
	    },
		//判断是否是空对象
		isEmptyObject: function(obj) {
			var name;
			for(name in obj){
				return false;
			}
			return true;
		},
		//判断一个对象是否是普通的key:value对象并且value不能是function
		isPlainObject: function(obj) {
		  if(obj == null){
		    return false;
		  }
		  for(var attr in obj){
		    if( obj.hasOwnProperty(attr) && this.isFunction( obj[attr] ) ){
		            return false;
		    }
		  }
		  return true;
		},
		//判断一个数字是否是整数
		isInteger: function(num) {
			return parseInt(num, 10) === num;
		},
		//js浮点数计算
		add: function(num1, num2) {
		 var r1, r2, m;
		 if(Number.isInteger(num1) || Number.isInteger(num2)){
		 	return num1 + num2;
		 }
		 r1 = (''+num1).split('.')[1].length;
		 r2 = (''+num2).split('.')[1].length;
		 
		 m = Math.pow(10,Math.max(r1,r2));
		 return (num1 * m + num2 * m) / m;
		},
		//判断字符串是否是回文
		isPalindrome: function(str) {
		  str = str.replace(/\W/g, '').toLowerCase(); 
		  return (str == str.split('').reverse().join(''));
		},
		//解析带标签的字符串
		extractText: function(summary) {
			if (!summary) {
		      return '';
		    }
		    if (!summary.startsWith('<') && !summary.endsWith('>')) {
		      return summary;
		    } else {
		      return summary.replace(/</g, "\n<")
		        .replace(/>/g, ">\n")
		        .replace(/\n\n/g, "\n")
		        .replace(/^\n/g, "")
		        .replace(/\n$/g, "")
		        .split("\n").filter(function(item) {
		          return !item.startsWith('<');
		        }).join('').replace(/&nbsp;?|<br\s*\/*>|\s*/ig, '');
		    }
		},
		//获取文件后缀名
		getFileExtension: function(filename) {
			return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
		},
		//判断是否是网址
		isUrl:function(strUrl) {
		    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
		    if (regular.test(strUrl)) {
		        return true;
		    }else {
		        return false;
		    }
		}
	}
}()

export { tools }