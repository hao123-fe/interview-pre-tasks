    var lis1 = document.getElementById("slide").getElementsByTagName("li");
    var lis2 = document.getElementById("btn").getElementsByTagName("li");
    var btn = document.getElementById("btn");
    var len = lis1.length;
    var index=0;
    var lastIndex=0;
    for (var i = 0; i < len; i++) {
		if(i==0)
		{
			setOpacity(lis1[i],100);
			lis2[i].className="hot";
		}
		else{
			setOpacity(lis1[i],0);
			lis2[i].className="";
		}
        (function (i) {
			addEventHandle(lis2[i],'mouseover',function () {
				if (addTime) {
					clearInterval(addTime);
				}
                showImag(i,lastIndex);
            })
            addEventHandle(lis2[i],'mouseout',function () {
                addTime = setInterval(function () {
				if(index<(len-1))
				{
					index++;
				}
				else
				{
					index=0;
				}
				showImag(index,lastIndex);
					}, 1000);
			})
        })(i);
    }
    addTime = setInterval(function () {
        if(index<(len-1))
        {
            index++;
        }
		else{
			index=0;
		}
        showImag(index,lastIndex);

    }, 1000);
    function showImag(cIndex,cLastIndex) {
        if(cIndex==cLastIndex) return;
        fadeOut(lis1[cLastIndex]);
		fadeIn(lis1[cIndex]);
		lis2[cLastIndex].className="";
        lis2[cIndex].className="hot";         
		lastIndex=cIndex;
		index=cIndex;
    }
    function fadeIn(elem)
    {
        setOpacity(elem,0);
        for(var i=0;i<=20;i++)
        {
            (function(){
                var pos=i*5;
                setTimeout(function(){
                        setOpacity(elem,pos);
                    }

                    ,i*25);
            })(i);
        }
    }
    function fadeOut(elem)
    {
        for(var i=0;i<=20;i++)
        {
            (function(){
                var pos=100-i*5;
                setTimeout(function(){setOpacity(elem,pos)},i*25);
            })(i)
        }
    }
    function setOpacity(elem,value)
    {
        if(elem.filters)
        {
            elem.style.filter="alpha(opacity="+value+")";
        }
        else
        {
            elem.style.opacity=value/100;
        }
    }//这个函数需要区分IE8以下的浏览器
	function addEventHandle(ele,event,handle)
	{
			if(ele.addEventListener)
			{
				ele.addEventListener(event,handle);
			}else if(ele.attachEvent)
			{
				ele.attachEvent("on"+event,handle);
			}else{
				ele["on"+event]=handle;
			}
	}