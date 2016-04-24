/**
 * Created by chenhaoact on 16/4/19.
 * 通过jQuery实现的简单的淡入淡出与左右无缝轮播
 */

//淡入淡出
$(function () {
    //代码初始化
    var size = $(".fadeout .img li").size();

    for (var i = 1; i <= size; i++) {
        var li = "<li>" + i + "</li>";
        $(".fadeout .num").append(li);
    }


    //手动控制轮播图
    $(".fadeout .img li").eq(0).show();
    $(".fadeout .num li").eq(0).addClass("active");
    $(".fadeout .num li").mouseover(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        i = index;
        $(".fadeout .img li").eq(index).stop().fadeIn(300).siblings().stop().fadeOut(300);
    })


    //自动轮播
    var i = 0;
    var t = setInterval(move, 5000);


    //核心向左运动函数
    function moveL() {
        i--;
        if (i == -1) {
            i = size - 1;
        }

        $(".fadeout .num li").eq(i).addClass("active").siblings().removeClass("active");
        $(".fadeout .img li").eq(i).fadeIn(300).siblings().fadeOut(300);

    }


    //核心向右运动函数
    function move() {
        i++;
        if (i == size) {
            i = 0;
        }

        $(".fadeout .num li").eq(i).addClass("active").siblings().removeClass("active");
        $(".fadeout .img li").eq(i).fadeIn(300).siblings().fadeOut(300);

    }


    //左边按钮点击事件
    $(".fadeout .left").click(function () {
        moveL();
    })

    //右边按钮点击事件
    $(".fadeout .right").click(function () {
        move()

    })


    //定时器的开始于结束
    $(".fadeout").hover(function () {
        clearInterval(t)
    }, function () {
        t = setInterval(move, 5000);
    })


})


//左右轮播
$(function(){

    var i=0;
    var clone=$(".slide .img li").first().clone();
    $(".slide .img").append(clone);
    var size=$(".slide .img li").size();
    for(var j=0;j<size-1;j++){
        $(".slide .num").append("<li></li>");
    }
    $(".slide .num li").first().addClass("on");


    /*鼠标划入圆点*/
    $(".slide .num li").hover(function(){
        var index=$(this).index();
        i=index;
        $(".slide .img").stop().animate({left:-index*550},500)
        $(this).addClass("on").siblings().removeClass("on")
    })


    /*自动轮播*/
    var t=setInterval(function(){
        i++;
        move()
    },5000)


    /*对banner定时器的操作*/
    $(".slide").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(function(){
            i++;
            move()
        },5000)
    })



    /*向左的按钮*/
    $(".slide .left").click(function(){
        i--
        move();
    })



    /*向右的按钮*/
    $(".slide .right").click(function(){
        i++
        move()
    })


    function move(){

        if(i==size){
            $(".slide  .img").css({left:0})
            i=1;
        }


        if(i==-1){
            $(".slide .img").css({left:-(size-1)*550})
            i=size-2;
        }

        $(".slide .img").stop().animate({left:-i*550},500)

        if(i==size-1){
            $(".slide .num li").eq(0).addClass("on").siblings().removeClass("on")
        }else{
            $(".slide .num li").eq(i).addClass("on").siblings().removeClass("on")
        }
    }

})


