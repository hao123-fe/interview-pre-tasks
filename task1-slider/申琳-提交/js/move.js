function getStyle(obj,attr)
	{
		if(obj.currentStyle)
		{
			return obj.currentStyle[attr];
		}
		else
		{
			return getComputedStyle(obj,false)[attr];
		}
	}

	function startMove(obj,attr,iTarget)
	{
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var iCur=0;

			if(attr=='opacity')
			{
				var iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
				//这里出现了小数，就可能会有问题，所以parseInt()一下
			}
			else
			{
				var iCur = parseInt(getStyle(obj,attr));
			}
			
			//对于透明度它的值范围是0-1，parseint就始终为0了
			var iSpeed = (iTarget-iCur)/8;

			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			if(iCur==iTarget)
			{
				clearInterval(obj.timer);
			}
			else
			{
				if(attr=='opacity')
				{
					obj.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity = (iCur+iSpeed)/100;
				}
				else
				{
					obj.style[attr]= iCur+iSpeed+'px';
				//这里若是透明度的话，加’px‘就不对
				}
				
			}
		},30);
	}