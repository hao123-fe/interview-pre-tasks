function getByClass(oParent,sClass)
    {
        var aEle = document.getElementsByTagName('*');
        var aResult = [];

        for(var i=0;i<aEle.length;i++)
        {
            if(aEle[i].className ==sClass)
            {
                aResult.push(aEle[i]);
            }
        }
        return aResult;
    }

window.onload = function()
   {
        var aDatas=
        ['日本の樱','去奈良喂小鹿哟~','仓镰-灌篮高手','啊~秋叶原！','去藤子不二雄博物馆，唤醒童年记忆','泡汤~~'];
        //轮播效果，左右轮播或者淡入淡出 即slide或者fadeout
        var slideEffect='slide';
        
        //设置是否自动播放
        var autoSlide = true;
    
        //自动轮播的时间间隔ms,要求是1000ms，感觉太快了，这里设置成3000ms
        var oSetInterval = 3000;
        
        var oDiv = document.getElementById('playimages');
        var oBtnPrev = getByClass(oDiv,'prev')[0];
        var oBtnNext = getByClass(oDiv,'next')[0];
        var oMarkLeft = getByClass(oDiv,'mark_left')[0];
        var oMarkRight = getByClass(oDiv,'mark_right')[0];
        var timer=null;

        //当鼠标移动到左半部分和右半部分，对左右移动按钮透明度的处理
        oBtnPrev.onmouseover = oMarkLeft.onmouseover = function()
        {
            startMove(oBtnPrev,'opacity',100);
        }
        oBtnPrev.onmouseout = oMarkLeft.onmouseout = function()
        {
            startMove(oBtnPrev,'opacity',0);
        }//markleft和prev是同一个层级，没有父子关系，移到Prev上就相当于移出Markleft了
         oBtnNext.onmouseover = oMarkRight.onmouseover = function()
        {
            startMove(oBtnNext,'opacity',100);
        }
        oBtnNext.onmouseout = oMarkRight.onmouseout = function()
        {
            startMove(oBtnNext,'opacity',0);
        }

        var oBigUl = getByClass(oDiv,'big_pic')[0];
        var aBigLi = oBigUl.getElementsByTagName('li');
        var iNow=0;
        var iMinZindex = 2;
        var oTxt=getByClass(oDiv,'text')[0];
        var oLength=getByClass(oDiv,'length')[0];

        function slider(){
            //增加了文字说明部分
            oTxt.innerHTML = aDatas[iNow];
            oLength.innerHTML = (iNow+1)+'/6';
 
            aBigLi[iNow].style.zIndex=iMinZindex++;//假如没有这句，单纯地下拉图片，永远只能看到都是层级最高的那一个图片，因为它们是有层级的，其他图片会被挡在后面
            if(slideEffect == 'slide'){
                 aBigLi[iNow].style.height=0;
                startMove(aBigLi[iNow],'height',oBigUl.offsetHeight);//高度是从零开始往下拉
            }
           
            else if(slideEffect == 'fadeout'){
                aBigLi[iNow].style.filter = 'alpha(opacity:'+20+')';
                aBigLi[iNow].style.opacity = 0.2;
                startMove(aBigLi[iNow],'opacity',100);
            }
                
        }

        oBtnPrev.onclick = function(){
            iNow--;
            if(iNow==-1)
            {
                iNow=aBigLi.length-1;//过了第零张，就从最后一张重新开始
            }
            slider();
        }
        oBtnNext.onclick=function(){
            iNow++;
            if(iNow==aBigLi.length)
            {
                iNow=0;//过界了从零开始
            }
            slider();
        }

        //还有自动播放、更改文字
        oDiv.onmouseout = function()
        {
            if(autoSlide == true){
                startAutoPlay();
            }
            
        }

        oDiv.onmouseover=function()
        {
            stopAutoPlay();
        }

        function startAutoPlay()
        {
            if (timer)
            {
                clearInterval(timer);
            }

            timer = setInterval(function(){
                // alert('');
                iNow++;
                if(iNow == aBigLi.length)
                {
                    iNow=0;
                }
                slider();

            },oSetInterval);
        }

        function stopAutoPlay(){
            if(timer)
            {
                clearInterval(timer);
                timer=null;
            }
        }

        // 刚加载完页面后，若还没调用slider(),那么刚开始文字说明部分没有，所以这里加一句，保证刚加载过去的时候就有说明部分
        //同时直接调用自动播放，而不是要先移到图片再移出后才能播放
        oTxt.innerHTML = aDatas[iNow];
        oLength.innerHTML = (iNow+1)+'/6';
        if(autoSlide == true){
            startAutoPlay();
        }
   } 