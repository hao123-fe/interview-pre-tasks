/**
 * Created by elson on 2016/6/23.
 */
$(function(){
    /* 封装插件 */
    (function( $ ) {

        $.fn.setActiveSlide =            function(slide, options) {
            var Default ={
                slideEffect : 'slide',
                autoSlide : true,
                slideInterval: 5000,
                sliderWillSlide : null,
                sliderDidSlide : null
            }

            var sets = $.extend(Default, options || {})

            if(isNaN(slide)){
                console.log("Please type in the first para in number less than length of img");
            }else{
                if(sets.slideEffect == "slide"){
                    showSlide.call(this,Slide);
                }
                var Slide = slide;
            }

            function showSlide(Slide){
                var size = (Slide-1) * 1000;
                this.children('img').css("left", "-" + size + "px")
            }

            var fadeInandOut = function(now, next){
                this.eq(now-1).animate({opacity:'0'}, sets.slideInterval/2,function(){
                    this.eq(next-1).animate({opacity:'1'}, sets.slideInterval/2,function(){
                        setTimeout(null,sets.slideInterval/2);
                    });
                }.call(this));
                setTimeout(null,sets.slideInterval/2);
            }

            var slidePrepare = function(){
                /*第一张之前插入最后一张图片，最后一张之后插入第一张图片之前*/
                var firstImg = this.children("img")[0].outerHTML;
                var lastImg = this.children("img:last-child")[0].outerHTML;
                this.css("overflow","hidden");
                this.css("display","flex");
                this.css("display","-webkit-flex");
                this.css("height","auto");
                this.append(firstImg);
                this.prepend(lastImg);
                var temp = this.children("img");
                /*初始化若是slide方式添加向左left的值*/
                if(temp.css("left") == 0){
                    temp.css("left","-1000px");
                }else{
                    temp.css("left","-=1000px");
                }
            }

            var fadePrepare = function(){
                var tmp = this.children("img");
                this.css("overflow","visible");
                this.css("display","block");
                this.css("height",this.children("img").css("height"))
                tmp.css("position","absolute");
                tmp.css("opacity", "0");
                tmp.eq(Slide-1).css("opacity", "1");
            }

            var doFadePro = function(){
                callbackWillSlide.call(this);
                if(Slide == this.length){
                    fadeInandOut.call(this, Slide, 1);
                    Slide = 1;
                }else{
                    fadeInandOut.call(this, Slide, Slide + 1 );
                    Slide++;
                }
                callbackDidSlide.call(this);
            }

            var doSlidePro = function(){
                callbackWillSlide.call(this);
                if(Slide == this.length-2){
                    this.animate({left:'-=1000px'},sets.slideInterval);
                    setTimeout(function(){
                        this.animate({left:'-1000px'},0);
                    }.call(this), sets.slideInterval)
                    Slide = 1;
                }else{
                    this.animate({left:'-=1000px'}, sets.slideInterval);
                    Slide++;
                }
                callbackDidSlide.call(this);
            }


            /*入口模块*/
            if(sets.autoSlide){
                if(sets.slideEffect == 'slide'){
                    slidePrepare.call(this);
                    var loop = setInterval(doSlidePro.bind(this.children('img')), sets.slideInterval);
                    var block = false;
                    this.on('mouseenter',function(){
                        clearInterval(loop);
                        block = true;
                    })
                    this.on('mouseleave',function(){
                        if(block) {
                            loop = setInterval(doSlidePro.bind($(this).children('img')), sets.slideInterval);
                            block = false;
                        }
                    });

                }
                else if(sets.slideEffect == 'fadeout'){
                    fadePrepare.call(this);
                    var loop2 = setInterval(doFadePro.bind($(this).children('img')), sets.slideInterval);
                    var block2 = false;
                    this.on('mouseenter',function(){
                        clearInterval(loop2);
                        block2 = true;
                    })
                    this.on('mouseleave',function(){
                        if(block2) {
                            loop2 = setInterval(doFadePro.bind($(this).children('img')), sets.slideInterval);
                            block2 = false;
                        }
                    });
                }
                else{
                    console.log("para is not well-recognized");
                }
            }
            else if(sets.slideEffect == 'slide'){
                slidePrepare.call(this);
            }
            else if(sets.slideEffect == 'fadeout'){
                fadePrepare.call(this);
            }


            this.on("click", "a.prev", function(){
                if(Slide > 1){
                    WillSlide.call(this,Slide,Slide-1);
                    if(sets.slideEffect == 'slide'){
                        $(this).parent().children("img").animate({left:'+=1000px'}, sets.slideInterval);
                    }else{
                        fadeInandOut.call($(this).parent().children("img"),Slide,Slide-1);
                    }
                    Slide--;
                    DidSlide.call(this,Slide,Slide+1);
                }
            })

            this.on("click", "a.next", function(){
                var tmp = $(this).parent().children("img");
                var num = ImgLength.call($(this).parent());
                if(Slide < num){
                    WillSlide.call(this,Slide,Slide+1);
                    if(sets.slideEffect == 'slide'){
                        tmp.animate({left:'-=1000px'}, sets.slideInterval);
                    }
                    else{
                        fadeInandOut.call($(this).parent().children("img"),Slide,Slide+1);
                    }
                    Slide++;
                    DidSlide.call(this,Slide,Slide-1);
                }
            })

            function ImgLength(){
                var tmp = this.children("img").length;
                if(sets.slideEffect == 'slide'){
                    return tmp-2;
                }else{
                    return tmp;
                }
            }

            function callbackWillSlide(){
                var lengthOfImg = ImgLength.call(this.parent());
                if(sets.autoSlide){
                    if(Slide < lengthOfImg){
                        WillSlide.call(this,Slide,Slide+1);
                    }else if(Slide == lengthOfImg){
                        WillSlide.call(this,Slide,1);
                    }
                }
            }

            function callbackDidSlide(){
                var lengthOfImg = ImgLength.call(this.parent());
                if(sets.autoSlide){
                    if(Slide == 1){
                        DidSlide.call(this,Slide,lengthOfImg)
                    }else if(Slide <= lengthOfImg){
                        DidSlide.call(this,Slide, Slide-1);
                    }
                }
            }

            function WillSlide(now,next){
                if(typeof sets.sliderWillSlide == 'function'){
                    sets.sliderWillSlide.call(this, now, next);
                }
            }

            function DidSlide(now, prev){
                if(typeof sets.sliderDidSlide == 'function'){
                    sets.sliderDidSlide.call(this,now,prev);
                }
            }
        };
    })( jQuery );
})