require(['slider'],function(Slide){
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
			console.log("now is "+now+",the next is "+next);
		},
		//  slide 结束的时调用的回调函数, 传递参数: 当前 slide, 上一个 slide
		sliderDidSlide: function(now, prev){
			console.log("now is "+now+", the prev is "+prev);
		}
	};
	var slide = new Slide.Slider('container',configs);  
    slide.init();  
    //slide.autoplay();
});