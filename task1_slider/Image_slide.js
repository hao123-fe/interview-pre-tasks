/**
 * Created by bai on 2016/3/20.
 */
    var lis2 = document.getElementById("btn").getElementsByTagName("li");
    var btn = document.getElementById("btn");
    var table=document.getElementsByTagName("table")[0];
    var index=0;//记录当前显示的图片的标号
    var lastIndex=0;//记录上一次显示的图片的标号
	var addTimer;
	var len=lis2.length;
	//初始化
    for (var i = 0; i < len; i++) {
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
					}, 2000);
			})
        })(i);
    }
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

    }, 2000);
    function showImag(cIndex,cLastIndex) {
        if(cIndex==cLastIndex) 
		{
			return;
		}
        if(cIndex>cLastIndex)
        {
            var def=cIndex-cLastIndex;
            for(var i=0;i<=10;i++)
            {
                (function(i){
                    var temp=cLastIndex*550+55*def*i;
                    setTimeout(function()
                    {
                        table.style.left=(-temp)+"px";
                    },20*i)
                })(i);
            }
        }
        else if(cIndex<cLastIndex)
        {
            var def=cLastIndex-cIndex;
            for(var i=0;i<=10;i++)
            {
                (function(i){
                    var temp=cLastIndex*550-55*def*i;
                    setTimeout(function()
                    {
                        table.style.left=(-temp)+"px";
                    },20*i)
                })(i);
            }
        }
        for (var j = 0; j < len; j++) {
            if (j != cIndex) {
                lis2[j].className="";
            }
            else
            {
                lis2[j].className="hot";
            }
        }
		lastIndex=cIndex;
        index=cIndex;
    }
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