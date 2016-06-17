/**
 * Created by ucas on 2016/6/16.
 */
var times= 0,suggest;
function SuggestAPI(opts){
    this._init(opts);

    var that=this;
    function _addEvent(callback){
        if(window.addEventListener){
            that.element.addEventListener('input',function(el){
                callback();
            },false);
        }else{
            that.element.onpropertychange=callback;
        }
    }
    _addEvent(function(event){
        var e=event||window.event;
        e.preventDefault();
        var num=that.maxNum;
        //ɾ��֮ǰ��������������¼�����
        document.getElementsByClassName('words')[0].innerHTML='';
        times=that.maxNum;
        //�����ʱ仯ʱ����
        if(typeof that.onChange==='function'){
            that.onChange(that.element.value,that._searchText);
        }
        //����
        while(num>0) {
            that._getData(that.element.value);
            if(num<=10)
               num=0;
            else
               num=Math.floor(num/10);
        }
        //�����Ѿ��������
        that._searchText=that.element.value;
    });
}
SuggestAPI.prototype._init=function(opts){
    this.maxNum=(typeof opts.maxNum==='number' && opts.maxNum)||10;
    this.onChange= opts.onChange;
    this.onSelected=opts.onSelected;
    this.onWordSubmit=opts.onWordSubmit;
    this.onSuggestSubmit=opts.onSuggestSubmit;
    /*
    * element:��ӵ���λ��
    * _searchText:��������
    * _ind:��ǰ��ѡ����ѡ���������,-1����û�п�ʼ
    * */
    this.element=opts.element;
    this._searchText='';
    this._ind=-1;
    /*
    * �����س�ʱ���ü����¼�,�����¼�ί��
    * */
    var that=this;
    //console.log(that.element.parentNode);
    addEvent(that.element.parentNode,'keydown',function(event){
        var e=event||window.event;
        var target= e.target;
        if(target.tagName==='INPUT'){
            if(e&& e.keyCode===13){
                //���»س���
                e.preventDefault();
                if(typeof that.onWordSubmit==='function' && that.onWordSubmit(that.element.value)===false){
                    return false;
                }
                window.location.href='http://www.baidu.com/s?wd='+that.element.value+'&tn=sitehao123&ie=utf8';
            }
            else if(e&& e.keyCode===40){
                //�¼�
                e.preventDefault();
                //��ǰȡ����ʽ����һ��������ʽ
                var lis=document.getElementsByClassName('words')[0].getElementsByTagName('li');
                var len=lis.length;
                if(that._ind<len-1){
                    lis[that._ind]&&(lis[that._ind].getElementsByTagName('a')[0].style.textDecoration='none');
                    lis[that._ind+1].getElementsByTagName('a')[0].style.textDecoration='underline';
                    lis[that._ind+1].getElementsByTagName('a')[0].focus();
                    that._ind=that._ind+1;
                    if(typeof that.onSelected ==='function')
                        that.onSelected(lis[that._ind].getElementsByTagName('a')[0].text,lis[that._ind-1].getElementsByTagName('a')[0].text);
                    //console.log(lis[that._ind].getElementsByTagName('a')[0].text);
                }
            }
        }
        else if(target.tagName==='A'){
            if(e&& e.keyCode===13){
                e.preventDefault();
                //console.log(target.text);
                if(typeof that.onSuggestSubmit==='function'&&(that.onSuggestSubmit(target.text)===false)){
                    return false;
                }
                window.location.href='http://www.baidu.com/s?wd='+target.text+'&tn=sitehao123&ie=utf8';
            }
            else if(e&& e.keyCode===38){
                //�ϼ�
                e.preventDefault();
                if(that._ind>0){
                    //��ǰȡ����ʽ����һ��������ʽ
                    var lis=document.getElementsByClassName('words')[0].getElementsByTagName('li');
                    lis[that._ind].getElementsByTagName('a')[0].style.textDecoration='none';
                    lis[that._ind-1].getElementsByTagName('a')[0].style.textDecoration='underline';
                    lis[that._ind-1].getElementsByTagName('a')[0].focus();
                    that._ind=that._ind-1;
                    //
                    if(typeof that.onSelected ==='function')
                        that.onSelected(lis[that._ind].getElementsByTagName('a')[0].text,lis[that._ind+1].getElementsByTagName('a')[0].text);
                }
                else if(that._ind===0){
                    //�ص�input��
                    that.element.focus();
                    if(typeof that.onSelected ==='function')
                        that.onSelected(that.element.value,lis[0].getElementsByTagName('a')[0].text);
                }
            }
            else if(e&& e.keyCode===40){
                //�¼�
                e.preventDefault();
                //��ǰȡ����ʽ����һ��������ʽ
                var lis=document.getElementsByClassName('words')[0].getElementsByTagName('li');
                var len=lis.length;
                if(that._ind<len-1){
                    lis[that._ind]&&(lis[that._ind].getElementsByTagName('a')[0].style.textDecoration='none');
                    lis[that._ind+1].getElementsByTagName('a')[0].style.textDecoration='underline';
                    lis[that._ind+1].getElementsByTagName('a')[0].focus();
                    that._ind=that._ind+1;
                    if(typeof that.onSelected ==='function')
                        that.onSelected(lis[that._ind].getElementsByTagName('a')[0].text,lis[that._ind-1].getElementsByTagName('a')[0].text);
                    //console.log(lis[that._ind].getElementsByTagName('a')[0].text);
                }
            }
        }
    });
};
//�Զ�����������
SuggestAPI.prototype.add=function(Suggest){
//��װ��_getDataSet,��������ѡ������
    suggest=Suggest;
};
//jsonpȡ�ý��
SuggestAPI.prototype._getData=function(keyword){
    //��̬����script,ʵ��jsonp�������
    var script=document.createElement('script');
    var url='http://suggestion.baidu.com/su';
    var data='cb=_getDataSet&wd='+keyword+'&sc=hao123';
    script.src=url+'?'+data;
    this.element.parentNode.appendChild(script);
};
function _getDataSet(data){
    //������������������
    var dataSet=data.s;
    var len=dataSet.length;
    var ul=document.getElementsByClassName('words')[0];
    for(var i=0;i<len;i++){
        if(times>0) {
            var li = document.createElement('li');
            var a=document.createElement('a');
            a.href='#';
            a.textContent=dataSet[i];
            li.appendChild(a);
            ul.appendChild(li);
            times=times-1;
        }else{
            break;
        }
    }
    if(times===0){
        var li = document.createElement('li');
        var a=document.createElement('a');
        a.href='#';
        a.textContent=suggest;
        li.appendChild(a);
        ul.appendChild(li);
    }

}
function addEvent(ele,event,callback){
    if(window.addEventListener){
        ele,addEventListener(event,function(ele){
            callback();
        },false);
    }else{
        ele.attachEvent('on'+event,callback);
    }
}

