define('slider',[],function(){
    function _draw(){
        var listyles = '';
        var direction = this.options.direction;
        var htmls = [];
        var imgStyles = '';
        this.index = this.setActiveSlide = this.options.setActiveSlide ? this.options.setActiveSlide : 0;
        if(this.options.imgStyle != ''){
            for(var i in this.options.imgStyle){
                imgStyles += ( i + ':' + this.options.imgStyle[i] + ';');
            }
        }
        switch (direction){
            case 'left':
                listyles = 'leftCss';
                break;
            case 'up':
                listyles = 'upCss';
                break;
            default:
                listyles = 'fadeCss';
        }
        htmls.push('<div class="box '+ listyles +'" style="'+ imgStyles +'"><div class="list">');
        htmls.push('<ul class="ullist">');
        for(var i = 0; i < this.options.url.length; i++){
            htmls.push('<li style="'+ imgStyles +'" class="'+(i == this.setActiveSlide? 'current':'') +'"><img src="'+(this.options.url[i])+'" width="100%"/></li>');
        }
        htmls.push('</ul>');
        htmls.push('<ul class="count">');
        for(var i = 0; i < this.options.url.length; i++){
            htmls.push('<li '+(i == this.setActiveSlide ? 'class="current"':'')+' >'+(i + 1)+'</li>');
        }
        htmls.push('</ul>');
        htmls.push('</div></div>');
        $(this.id).append(htmls.join(''));
    }
    function Slider(options, id){
        var defaultOptions = {
            slideInterval: 5000, //设置默认滑动速度
            direction: 'up', //设置默认滑动方向left up fade 属性
            autoSlide: true, //设置默认自动播放
            autobackplay: true, //设置是否倒序循环播放
            slideEffect: 'slide',// 设置默认动画方式  slide是滑入  fade 是渐隐渐现
            imgStyle: {}, //这里设置img的样式
            setActiveSlide: 0
        };
        this.timer = this.play = null;
        this.index = 0;
        this.bOrder = true;
        this.setActiveSlide = 0;
        this.options = $.extend(true, defaultOptions, options);
        this.id = id;
        this.init();
    }
    Slider.prototype = {
        init: function(){
            _draw.call(this);
            var w1 = $(this.id).find('.ullist >li>img').width();
            this.bind();
            if(this.options.direction == 'left' || this.options.direction == 'right'){
                $(this.id).find('.ullist').css('width',(this.options.url.length * w1))
            }
            if(this.options.autoSlide){
                this.autoSlide();
            }
        },
        autoSlide: function(){
            var speed = this.options.slideInterval;
            var the = this;
            var Imgs = $(this.id).find('.ullist >li>img');
            the.play = setInterval(function () {
                if(the.options.autobackplay){
                    the.bOrder ? the.index++ : the.index--;//判断播放顺序
                    the.index >= Imgs.length && (the.index = Imgs.length - 2, the.bOrder = false);//正序
                    the.index <= 0 && (the.index = 0, the.bOrder = true);//倒序
                }else{
                    the.index = (the.index >= (the.options.url.length - 1)) ? 0 : ++the.index
                }
                the.show(the.index)//调用函数
            },speed);
        },
        show: function(index){
            var the = this;
            var a = index;
            var Imgs = $(the.id).find('.ullist >li>img');
            var oWidth = Imgs.width();
            var oHeight = Imgs.height();
            the.changecount(a);
            if(this.options.slideEffect == 'slide'){
                switch (this.options.direction){
                    case 'left':
                        this.left(-a * parseInt(oWidth));
                        break;
                    case 'up':
                        this.up(-a * parseInt(oHeight));
                        break;
                }
            }else{
                this.fade(a);
            }
        },

        fade: function(a){
            var the = this;
            var alpha = 0;
            var a = a;
            clearInterval(the.timer);

            $(the.id).find('.ullist >li>img').each(function(){
                $(this).css('opacity','0');
                $(this).css('filter','alpha(opacity=0)');
            });

            the.timer = setInterval(function () {
                alpha += 2;
                alpha > 100 && (alpha =100);
                $(the.id).find('.ullist >li>img').eq(a).css('opacity',alpha/100);
                $(the.id).find('.ullist >li>img').eq(a).css('filter', "alpha(opacity = " + alpha + ")");
                alpha == 100 && clearInterval(the.timer);
            },20);
        },
        up: function(iTarget){
            var oList = $(this.id).find('.ullist');
            clearInterval(this.timer);
            this.timer = setInterval(function ()
            {
                var iSpeed = (iTarget - oList.position().top) / 10;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if(oList.position().top == iTarget){
                    clearInterval(this.timer)
                }else{
                    oList.css('top', (oList.position().top + iSpeed))
                }
            }, 30)
        },
        left: function(iTarget){
            var oList = $(this.id).find('.ullist');
            clearInterval(this.timer);
            this.timer = setInterval(function ()
            {
                var iSpeed = (iTarget - oList.position().left) / 10;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if(oList.position().left == iTarget){
                    clearInterval(this.timer)
                }else{
                    oList.css('left', (oList.position().left + iSpeed))
                }
            }, 30)

        },
        changecount: function(index){
            $(this.id).find('.count >li').removeClass('current');
            $(this.id).find('.count >li').eq(index).addClass('current');
            $(this.id).find('.ullist >li').removeClass('current');
            $(this.id).find('.ullist >li').eq(index).addClass('current');
        },
        bind: function(){
            var the = this;
            $(the.id).on('mouseover','.count > li',function(event){
                clearInterval(the.play);
                var target = $(event.target);
                var a = target.index();
                the.index = a;
                the.show(a);
            }).on('mouseout', '.count > li',function(event){
                the.autoSlide();
            })
        },
        sliderWillSlide: function(now, next ){

        },
        sliderDidSlide: function(now, prev){

        }
    }
    return Slider;
})