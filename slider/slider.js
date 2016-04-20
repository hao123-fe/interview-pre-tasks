/**
 * Created by Administrator on 2016/4/19.
 */

function getByClass(oParent, sClass){ //用于根据className获取元素
    var aEle=document.getElementsByTagName('*');
    var i=0;
    var aRes=[];

    for(i=0;i<aEle.length;i++) {
        if(aEle[i].className==sClass)
            aRes.push(aEle[i]);
    }
    return aRes;
}

function getStyle(obj, iAttr) { //用于获取非行间样式属性
    if(obj.currentStyle)
        return obj.currentStyle[iAttr];
    else
        return getComputedStyle(obj, false)[iAttr];
}

function move(obj, iTarget, iAttr) {
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var iCur=0;
        if(iAttr=='opacity')
            iCur=parseInt(parseFloat(getStyle(obj, iAttr))*100);
        else
            iCur=parseInt(getStyle(obj, iAttr));
        var iSpeed=(iTarget-iCur)/8;
        iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
        if(iCur==iTarget)
            clearInterval(obj.timer);
        else {
            if(iAttr=='opacity') {
                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                obj.style.opacity=(iCur+iSpeed)/100;
            }
            else
                obj.style[iAttr]=iCur+iSpeed+'px';
        }
    }, 30);
}