  
  
  
function $(id){
	return typeof id==='string'?document.getElementById(id):id;
}

window.onload = function(){
	configs = {
		//  'slide'|'fadeout', 轮播效果, 左右轮播或者淡入淡出
		//  slideEffect: (string | default: 'slide')
		slideEffect: 'slide',
		//  true|false, 是否自动轮播
		//  autoSlide: (boolean | default: true) 
		autoSlide: true,
		//  自动轮播的时间间隔, ms
		//  slideInterval: (number | default: 5000)
		slideInterval: 2000,
		//  将要 slide 的时候调用的回调函数, 传递参数: 当前 slide, 将要出现的 slide
		sliderWillSlide: function(now, next){
			
		},
		//  slide 结束的时调用的回调函数, 传递参数: 当前 slide, 上一个 slide
		sliderDidSlide: function(now, prev){
			
		}
	};
	
	var s1 = new Slider('container',configs);  
    s1.init();  
    s1.autoplay();
}
 
function Slider(container,configs){
	 this.container = $(container);
     this.list = $('list');
     this.buttons = $('buttons').getElementsByTagName('span');
     this.prev = $('prev');
     this.next = $('next');
	 
	 this.index = 1;
	 this.len = 5;
	 this.animated = false;
	 this.interval = configs.slideInterval;
	 this.timer = null;
	 
	 
 } 
 
Slider.prototype.init = function(){
	var that = this;
	this.next.onclick = function(){
		if (that.animated) {
			return;
		}
		if (that.index == 5) {
			that.index = 1;
		}
		else {
			that.index += 1;
		}
		that.animate(-600);
		that.showButton();
	 };
	 
	 this.prev.onclick = function () {
		if (that.animated) {
			return;
		}
		if (that.index == 1) {
			that.index = 5;
		}
		else {
			that.index -= 1;
		}
		that.animate(600);
		that.showButton();
	};
	
	for (var i = 0,len = this.buttons.length; i < len; i++) {
		this.buttons[i].onclick = function () {
			if (that.animated) {
				return;
			}
			if(this.className == 'on') {
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -600 * (myIndex - that.index);

			that.animate(offset);
			that.index = myIndex;
			that.showButton();
		}
	};
	
	this.container.onmouseover = this.stop;
	this.container.onmouseout = this.autoplay;

 }
 
 
 
 Slider.prototype.animate = function(offset){
	var that = this;
	if (offset == 0) {
		return;
	}
	this.animated = true;
	var time = 300;
	var inteval = 10;
	var speed = offset/(time/inteval);
	var left = parseInt(list.style.left) + offset;

	var go = function (){
		if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
			list.style.left = parseInt(list.style.left) + speed + 'px';
			setTimeout(go, inteval);
		}
		else {
			list.style.left = left + 'px';
			if(left>-200){
				list.style.left = -600 * (that.len) + 'px';
			}
			if(left<(-600 * (that.len))) {
				list.style.left = '-600px';
			}
			that.animated = false;
		}
	}
	go();
 }
  
 Slider.prototype.showButton = function(){
	for (var i = 0,len = this.buttons.length; i < len ; i++) {
		if( this.buttons[i].className == 'on'){
			this.buttons[i].className = '';
			break;
		}
	}
	this.buttons[this.index - 1].className = 'on';
 }
  
 Slider.prototype.autoplay = function(){
	var that = this;
	this.timer = setTimeout(function () {
		that.next.onclick();
		that.autoplay();
	}, this.interval);
 } 
 
Slider.prototype.stop = function(){
	clearTimeout(this.timer);
} 
  
  
  
  
  
  
  
  
  
  
  
  
 