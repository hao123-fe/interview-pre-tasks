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

    //ÿ��ͼƬ����ʾ���Զ��ֲ�Ч��
    function auto()
    {
        timer1 = setInterval(function () {
            index++;
            index >= fImg.length && (index = 0);
            display(index);
        },2000);
    }
    auto();

    //��껬��ͼƬʱ��ֹͣ��ʱ��
    fSlider.onmouseover= function() {
        clearInterval(timer1);
    };

    //����ͼƬ���뿪�������Զ��ֲ�
    fSlider.onmouseout=function(){
        auto();
    };

    //�������j ��ʾ��Ӧ˳���ͼƬ
    for(j=0;j<fCount.length;j++){
        fCount[j].index=j;
        fCount[j].onmouseover=function(){
            display(this.index);
        }
    }

    //ÿ��ͼƬ����ʾ�����뵭��Ч��
    function display(i){
        var index=i;
        var alpha = 0;
        var k;
        //����ͳһ���ã������±�Ϊindex����Ϊcurrent����ǰ��ʾ
        for (k = 0; k < fCount.length; k++) {
            fCount[k].className="";
        }
        fCount[index].className="current";
        for (k = 0; k < fImg.length; k++)
        {
            fImg[k].style.opacity = 0;
            fImg[k].style.filter = "alpha(opacity=0)";
        }

        //ÿ��ͼƬ�Ľ��뽥��Ч��֮ǰ����֮ǰ��timer���������ʾЧ��
        clearInterval(timer);
        timer = setInterval(function () {
            alpha += 10;
            alpha > 100 && (alpha =100);
            fImg[index].style.opacity = alpha/100;
            fImg[index].style.filter = "alpha(opacity = " + alpha + ")";
        },100);
    }




};
