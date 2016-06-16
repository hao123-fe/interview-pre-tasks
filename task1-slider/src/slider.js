(function($){
    /**
     *
     * @param obj
     * slideEffect: (string | default: 'slide') 'slide'|'fadeout'
     * autoSlide: (boolean | default: true) true|false
     * slideInterval: (number | default: 5000)
     * @returns {setActiveSlide} use to set current page
     */
    $.fn.createSlide = function(obj){
        var para = {
            slideEffect:'slide',
            autoSlide:true,
            slideInterval:5000,
            sliderWillSlide:function(){},
            sliderDidSlide:function(){}
        };
        $.extend(para,obj);
        alert(para.slideEffect);
        $(this).data(para);
        var pic = $('.slider_container').find('li');
        var count = pic.length;
        var index = 0;
        var that = this;
        var timer = null;
        $(this).find('.slider_change_previous').on('click',function(){
            var previousIndex = index;
            if(index > 0)
                --index;
            else
                index = count - 1;
            render.call(that,previousIndex,index);
        });
        $(this).find('.slider_change_next').on('click',function(){
            var previousIndex = index;
            index = ++index%count;
            render.call(that,previousIndex,index);
        });
        $(this).find('.slider_box').find('li').on('click',function(){
            var previousIndex = index;
            index = $(this).index();
            render.call(that,previousIndex,index);
        });
        autoPlay();
        function autoPlay(){
            if(para.autoSlide){
                timer = setInterval(function(){
                    var previousIndex = index;
                    index = ++index%count;
                    render.call(that,previousIndex,index);
                },para.slideInterval);
            }
        }
        function render(now,next){
            para.sliderWillSlide(now,next);
            var nowobj = $(this).find('.slider_container').find('li').eq(now);
            var nextobj = $(this).find('.slider_container').find('li').eq(next);
            var nowbox = $(this).find('.slider_box').find('li').eq(now);
            var nextbox = $(this).find('.slider_box').find('li').eq(next);
            if(para.slideEffect == 'fadeout'){
                nowobj.fadeOut(1000);
                nowbox.toggleClass("current_box");
                nextobj.fadeIn(1000);
                nextbox.toggleClass("current_box");
            }
           else if(para.slideEffect == 'slide'){
                var width = $(this).css('width');
                if(now < next){
                    nowobj.animate({left : '-'+width});
                    nowbox.toggleClass("current_box");
                    nextobj.css({left : width}).toggleClass('hidden').animate({left:0},function(){
                        nowobj.toggleClass('hidden');
                    });
                    nextbox.toggleClass("current_box");
                }
                else{
                    nextobj.css({left : '-'+width}).toggleClass('hidden').animate({left:0},function(){
                        nowobj.toggleClass('hidden');
                    });
                    nextbox.toggleClass("current_box");
                    nowobj.animate({left : width});
                    nowbox.toggleClass("current_box");
                }
            }
            para.sliderDidSlide(next,now);
        }
        function setActiveSlide(slide){
            if(slide>=count)
                return;
            var previousIndex = index;
            index = slide;
            render.call(that,previousIndex,index);
        }
        return setActiveSlide;
    };
})(jQuery)