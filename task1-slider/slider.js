define(function(){
	function $(id){
		return typeof id==='string'?document.getElementById(id):id;
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
		this.timer = null;
		
		this.interval = configs.slideInterval;
		this.slideEffect = configs.slideEffect;
		this.autoSlide = configs.autoSlide;
		this.sliderWillSlide = configs.sliderWillSlide;
		this.sliderDidSlide = configs.sliderDidSlide;
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
			var myIndex = parseInt(document.querySelector(".on").getAttribute('index'));
			that.sliderWillSlide(myIndex,that.index);
			that.animate(-600);
			that.sliderDidSlide(that.index,myIndex);
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
			var myIndex = parseInt(document.querySelector(".on").getAttribute('index'));
			that.sliderWillSlide(myIndex,that.index);
			that.animate(600);
			that.sliderDidSlide(that.index,myIndex);
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
				that.sliderWillSlide(that.index,myIndex);
				var offset = -600 * (myIndex - that.index);				
				that.animate(offset);
				that.sliderDidSlide(myIndex,that.index);				

				that.index = myIndex;
				that.showButton();
			}
		};
		
		//this.container.onmouseover = this.stop;
		//this.container.onmouseout = this.autoplay;

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
	
	return {Slider:Slider};
}) 
  
  
 
 
 

 
 
 
  
  
  
  
  
  
  
  
  
  
  
  
  
 