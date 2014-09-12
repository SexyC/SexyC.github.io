$(document).ready(function() {
	var s = "";   
	s += " 网页可见区域宽："+ document.body.clientWidth+"\n";    
	s += " 网页可见区域高："+ document.body.clientHeight+"\n";    
	s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"+"\n";    
	s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"+"\n";    
	s += " 网页正文全文宽："+ document.body.scrollWidth+"\n";    
	s += " 网页正文全文高："+ document.body.scrollHeight+"\n";    
	s += " 网页被卷去的高(ff)："+ document.body.scrollTop+"\n";    
	s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop+"\n";    
	s += " 网页被卷去的左："+ document.body.scrollLeft+"\n";    
	s += " 网页正文部分上："+ window.screenTop+"\n";    
	s += " 网页正文部分左："+ window.screenLeft+"\n";    
	s += " 屏幕分辨率的高："+ window.screen.height+"\n";    
	s += " 屏幕分辨率的宽："+ window.screen.width+"\n";    
	s += " 屏幕可用工作区高度："+ window.screen.availHeight+"\n";    
	s += " 屏幕可用工作区宽度："+ window.screen.availWidth+"\n";    
	s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"+"\n";    
	s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"+"\n";    
	//alert (s);
});

function LayoutManager(obj) {
	this._obj = obj || document.createElement('div');
	this._width = document.body.clientWidth;
	this._height = document.body.clientHeight;

	this.output = function() {
		for(variable in this) {
			if(typeof this[variable] === 'function') {
				continue;
			}
			console.log('LayoutManager -- ' + variable + ' -- ' + this[variable]);
		}
	};
}

function Layout(obj, _parent, level) {

	// 每个layout分割为12行12列
	this.cols = 12;
	this.rows = 12;
	
	// widget之间相对的margin
	this.marginLeft = 20;
	this.marginRight = 20;
	this.marginTop = 20;
	this.marginBottom = 20;

	this._layoutWidth = 0;
	this._layoutHeight = 0;

	this._widthWidth = 0;
	this._widthHeight = 0;

	// 图层的高度，值越高越位于显示的顶层
	this._level = level || 0;
	// 图层依赖的html元素
	this._obj = obj || document.createElement('div');
	// 图层依赖的html元素的父元素
	this._parent = _parent || document.body;

	this._widgets = [];

	this._adjustColRow = function() {
		this.cols = Math.floor(this._layoutWidth / (this._widthWidth + this.marginLeft + this.marginRight));
	}

	/**
	 * 排列渲染函数，用来调整widget的布局，并渲染显示出来
	 * w -- widget的宽度(Optional)
	 * h -- widget的高度(Optional)
	 */
	this.render = function(w, h) {

		if(arguments.length !== 0 && arguments.length !== 2) {
			throw 'render parameter error';
		}

		var widgetWidth = w || (this._layoutWidth / (this._widgets.length > this.cols ? this.cols : this._widgets.length) - this.marginLeft - this.marginRight);
		//var widgetHeight = this._layoutHeight / (Math.floor(this._widgets.length / this.cols) + 1);
		var widgetHeight = h || widgetWidth;

		this._widthWidth = widgetWidth;
		this._widthHeight = widgetHeight;

		if(w && h) {
			this._adjustColRow();
		}

		var rolNum = 0;
		for(var i = 0; i < this._widgets.length; ++i) {
			this._widgets[i].style.position = 'absolute';
			this._widgets[i].style.left = (i % this.cols + 1) * this.marginLeft + i % this.cols * widgetWidth + i % this.cols * this.marginRight + 'px';
			this._widgets[i].style.top = (Math.floor(i / this.cols) + 1) * (this.marginTop + widgetHeight + this.marginBottom) - widgetHeight - this.marginBottom + 'px';
			this._widgets[i].style.width = widgetWidth + 'px';
			this._widgets[i].style.height = widgetHeight + 'px';

			//this._obj.appendChild(this._widgets[i]);
		}	
	};

	/**
	 * 更改图层的大小
	 * w: 图层宽度
	 * h: 图层高度
	 * x: 图层左上角x坐标
	 * y: 图层左上角y坐标
	 */
	this.changeLayoutSize = function(w, h, x, y) {
		this._layoutWidth = w;
		this._layoutHeight = h;
		this._colWidth = this._layoutWidth / this.cols;
		this._rowHeight = this._layoutHeight / this.rows;
		this._colInnerWidth = this._colWidth * 0.6;
		this._rowInnerHeight = this._rowHeight * 0.6;

		this._obj.style.width = w + 'px';
		this._obj.style.height = h + 'px';
		this.render();
	};
	
	/**
	 * 更改图层的行列数
	 * c 列数
	 * r 行数
	 */
	this.changeColRow = function(c, r) {
		this.cols = c;
		this.rows = r;
		this.render();
	};

	this.changeLayoutSize(document.body.clientWidth, document.body.clientHeight);

	this.changeLevel = function(i) {
		if(i < -1000 || i > 1000) {
			throw 'layout level exceed';
		}
		this._level = i;
	};

	this.output = function() {
		for(variable in this) {
			if(typeof this[variable] === 'function') {
				continue;
			}
			console.log('Layout -- ' + variable + ' -- ' + this[variable]);
		}
	};

	this.pushWidget = function(obj) {
		this._widgets.push(obj);
		this._obj.appendChild(obj);
	};

}
