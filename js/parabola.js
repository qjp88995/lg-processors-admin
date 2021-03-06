var funParabola = function(element, target, options) {
	var defaults = {
		speed: 166.67, 
		curvature: 0.001,
		progress: function() {},
		complete: function() {}
	};
	
	var params = {}; options = options || {};
	
	for (var key in defaults) {
		params[key] = options[key] || defaults[key];
	}
	
	var exports = {
		mark: function() { return this; },
		position: function() { return this; },
		move: function() { return this; },
		init: function() { return this; }
	};
	
	/* 确定移动的方式 
	 * IE6-IE8 是margin位移
	 * IE9+使用transform
	*/
	var moveStyle = "margin", testDiv = document.createElement("div");
	if ("oninput" in testDiv) {
		["", "ms", "webkit"].forEach(function(prefix) {
			var transform = prefix + (prefix? "T": "t") + "ransform";
			if (transform in testDiv.style) {
				moveStyle = transform;
			}
		});		
	}
	
	var a = params.curvature, b = 0, c = 0;
	
	// 是否执行运动的标志量
	var flagMove = true;
	
	if (element && target && element.nodeType == 1 && target.nodeType == 1) {
		var rectElement = {}, rectTarget = {};
		// 移动元素的中心点位置，目标元素的中心点位置
		var centerElement = {}, centerTarget = {};
		// 目标元素的坐标位置
		var coordElement = {}, coordTarget = {};
		// 标注当前元素的坐标
		exports.mark = function() {
			if (flagMove == false) return this;
			if (typeof coordElement.x == "undefined") this.position();
			element.setAttribute("data-center", [coordElement.x, coordElement.y].join());
			target.setAttribute("data-center", [coordTarget.x, coordTarget.y].join());
			return this;
		}
		
		exports.position = function() {
			if (flagMove == false) return this;
			
			var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			
			// 初始位置
			if (moveStyle == "margin") {
				element.style.marginLeft = element.style.marginTop = "0px";
			} else {
				element.style[moveStyle] = "translate(0, 0)";
			}
			
			// 四边缘的坐标
			rectElement = element.getBoundingClientRect();
			rectTarget = target.getBoundingClientRect();
			
			// 移动元素的中心点坐标
			centerElement = {
				x: rectElement.left + (rectElement.right - rectElement.left) / 2 + scrollLeft,
				y: rectElement.top + (rectElement.bottom - rectElement.top) / 2	+ scrollTop
			};
			
			// 目标元素的中心点位置
			centerTarget = {
				x: rectTarget.left + (rectTarget.right - rectTarget.left) / 2 + scrollLeft,
				y: rectTarget.top + (rectTarget.bottom - rectTarget.top) / 2 + scrollTop		
			};
			
			// 转换成相对坐标位置
			coordElement = {
				x: 0,
				y: 0	
			};
			coordTarget = {
				x: -1 * (centerElement.x - centerTarget.x),
				y:  -1 * (centerElement.y - centerTarget.y)	
			};
			
			b = (coordTarget.y - a * coordTarget.x * coordTarget.x) / coordTarget.x;	
			return this;
		};		
		exports.move = function() {
			if (flagMove == false) return this;	
			var startx = 0, rate = coordTarget.x > 0? 1: -1;
			var step = function() {
				var tangent = 2 * a * startx + b;
				startx = startx + rate * Math.sqrt(params.speed / (tangent * tangent + 1));
				if ((rate == 1 && startx > coordTarget.x) || (rate == -1 && startx < coordTarget.x)) {
					startx = coordTarget.x;
				}
				var x = startx, y = a * x * x + b * x;
				element.setAttribute("data-center", [Math.round(x), Math.round(y)].join());
				if (moveStyle == "margin") {
					element.style.marginLeft = x + "px";
					element.style.marginTop = y + "px";
				} else {
					element.style[moveStyle] = "translate("+ [x + "px", y + "px"].join() +")";
				}
				
				if (startx !== coordTarget.x) {
					params.progress(x, y);
					window.requestAnimationFrame(step);	
				} else {
					// 运动结束，回调执行
					params.complete();
					flagMove = true;	
				}
			};
			window.requestAnimationFrame(step);
			flagMove = false;
			
			return this;
		};
		
		// 初始化方法
		exports.init = function() {
			this.position().mark().move();
		};
	}
	
	return exports;
};

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());