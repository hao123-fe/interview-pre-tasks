/**
 * Created by Administrator on 2016/4/20.
 */
window.onload= function ()
{
    var fSlider=document.getElementById("slider");
    var fUl=document.getElementsByTagName("ul");
    var fImg=fUl[0].getElementsByTagName("li");
    var fCount=fUl[1].getElementsByTagName("li");
    var timer; var timer1;
    var i=0; var j=0;
    var index=0;

    //每张图片的显示，自动轮播效果
    function auto()
    {
        timer1 = setInterval(function () {
            index++;
            index >= fImg.length && (index = 0);
            display(index);
        },2000);
    }
    auto();

    //鼠标滑过图片时，停止定时器
    fSlider.onmouseover= function() {
        clearInterval(timer1);
    };

    //鼠标从图片上离开，继续自动轮播
    fSlider.onmouseout=function(){
        auto();
    };

    //点击数字j 显示对应顺序的图片
    for(j=0;j<fCount.length;j++){
        fCount[j].index=j;
        fCount[j].onmouseover=function(){
            display(this.index);
        }
    }

    //每张图片的显示，淡入淡出效果
    function display(i){
        var index=i;
        var alpha = 0;
        var k;
        //基础统一设置，并对下标为index的设为current，当前显示
        for (k = 0; k < fCount.length; k++) {
            fCount[k].className="";
        }
        fCount[index].className="current";
        for (k = 0; k < fImg.length; k++)
        {
            fImg[k].style.opacity = 0;
            fImg[k].style.filter = "alpha(opacity=0)";
        }

        //每次图片的渐入渐出效果之前，将之前的timer清除，再显示效果
        clearInterval(timer);
        timer = setInterval(function () {
            alpha += 10;
            alpha > 100 && (alpha =100);
            fImg[index].style.opacity = alpha/100;
            fImg[index].style.filter = "alpha(opacity = " + alpha + ")";
        },100);
    }




};
