
require.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'jquery-1.11.3.min'
    }
});

require(['jquery','slider'],function($, Slider){
    var config = {
        slideInterval: 4000, //设置滑动速度
        direction: 'fade', //设置滑动方向 当此值设置为fade 的时候请与下面playtype保持一致 有up  left  fade三个值
        autoSlide: true, //设置是否自动播放
        autobackplay: true, //设置是否倒序循环播放
        slideEffect: 'fade', //fade  或者slide
        setActiveSlide: 2,
        imgStyle:{
            'width': '490px',
            'height':'180px'
        },
        url:['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg']
    };

    var config1 = {
        slideInterval: 2000, //设置滑动速度
        direction: 'up', //设置滑动方向 当此值设置为fade 的时候请与下面playtype保持一致 有up  left  fade三个值
        autoSlide: true, //设置是否自动播放
        autobackplay: true, //设置是否倒序循环播放
        slideEffect: 'slide', //fade  或者slide
        url:['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg']
    };

    var config2 = {
        slideInterval: 4000, //设置滑动速度
        direction: 'left', //设置滑动方向 当此值设置为fade 的时候请与下面playtype保持一致 有up  left  fade三个值
        autoSlide: true, //设置是否自动播放
        autobackplay: true, //设置是否倒序循环播放
        slideEffect: 'slide', //fade  或者slide
        url:['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg']
    };
    var s1 = new Slider(config, '#wrapper');

    var s2 = new Slider(config1, '#wrapper1');

    var s3 = new Slider(config2, '#wrapper2');
})

