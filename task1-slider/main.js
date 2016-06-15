require(['slider'],function(Slide){
	configs = {
		//  'slide'|'fadeout', �ֲ�Ч��, �����ֲ����ߵ��뵭��
		//  slideEffect: (string | default: 'slide')
		slideEffect: 'slide',
		//  true|false, �Ƿ��Զ��ֲ�
		//  autoSlide: (boolean | default: true) 
		autoSlide: true,
		//  �Զ��ֲ���ʱ����, ms
		//  slideInterval: (number | default: 5000)
		slideInterval: 2000,
		//  ��Ҫ slide ��ʱ����õĻص�����, ���ݲ���: ��ǰ slide, ��Ҫ���ֵ� slide
		sliderWillSlide: function(now, next){
			console.log("now is "+now+",the next is "+next);
		},
		//  slide ������ʱ���õĻص�����, ���ݲ���: ��ǰ slide, ��һ�� slide
		sliderDidSlide: function(now, prev){
			console.log("now is "+now+", the prev is "+prev);
		}
	};
	var slide = new Slide.Slider('container',configs);  
    slide.init();  
    //slide.autoplay();
});