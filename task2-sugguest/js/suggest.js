/**
 * Created by admin on 2016/6/17.
 */
window.$Suggest = function (element, config) {
    this.defaultConfig = {//默认配置值
        //url: 'https://www.baidu.com/su',
        maxNum: 10,
        onChange: onchange,
        onSelected: onselected,
        onWordSubmit: onwordSubmit,
        onSuggestSubmit: onsuggestSubmit

    };
    this.autoSuggest = function () {
        init(this);
        bindEvent(this);
    };
    function init(that) {//初始化
        console.log("init");
        that.config = $.extend({}, that.defaultConfig, config)
    }
    function bindEvent(that) {
        console.log("bind");
        $(element).bind('keyup',function (e) {
            if(e.which==13){
                //回车提交搜索
                var keyword=$(this).val();
                console.log(e.which+keyword);
                window.location.href='https://www.baidu.com/s?wd='+keyword+'&tn=sitehao123&ie=utf-8'
            };
            if(((e.which >= 48) && (e.which <= 57))
                || ((e.which >= 65) && (e.which <= 90))
                || ((e.which >= 97) && (e.which <= 107))
                || ((e.which >= 109) && (e.which <= 111))
                || ((e.which >= 186) && (e.which <= 222))
                ||(e.which==8)){//输入值时，调用搜索推荐接口
                console.log("e"+e.which);
                // that.config.onChange;//不知道为什么这里调用config配置里面的onChange函数不行
                var keyword=$(this).val();
                console.log("change");
                var request = {
                    'wd': keyword,
                    'tn': 'sitehao123',
                    'ie': 'utf-8',
                    'cb': 'showUl',
                    't': new Date().getMilliseconds().toString()
                };
                $.ajax({
                    async: false,
                    url: 'https://www.baidu.com/su',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'cb',
                    data: request,
                    timeout: 5000,
                    success: function (data) {
                        showUl(data);
                    },
                    error: function (data) {
                    }
                });
            }
        });
    }
    function onchange() {
        var keyword=$(this).val();
        console.log("change");
        var request = {
            'wd': keyword,
            'tn': 'sitehao123',
            'ie': 'utf-8',
            'cb': 'showUl',
            't': new Date().getMilliseconds().toString()
        };
        $.ajax({
            async: false,
            url: 'https://www.baidu.com/su',
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'cb',
            data: request,
            timeout: 5000,
            success: function (data) {
                showUl(data);
            },
            error: function (data) {
            }
        });
    }
    function showUl(data) {
        //每次显示列表之前先移除以前创建的列表
        var existList=$("#suggest-list");
        if(existList.length!=0){
            existList.remove();
        }
        //生成搜索列表div
        var suggestList = $('<div class="suggest" id="suggest-list" style="display:none">');
        $(document.body).append(suggestList);

        var suggestData = data['s'];//获取异步数据
        console.log(suggestData);

        var html = '<ul>';
        html+='<li class="liColor">' + suggestData[0] + '</li>';
        for (var i = 1; i < suggestData.length; i++) {
            html += '<li>' + suggestData[i] + '</li>';
        }
        html += '</ul>';

        suggestList.html(html);
        suggestList.show().css({
            top: $(element).offset().top + $(element).height() * 1.5,
            left: $(element).offset().left,
            position: 'absolute'
        });
    }
    function onselected(newSuggest, oldSuggest) {
    }
    function onwordSubmit(word) {
        var keyword=$(this).val();
        window.location.href='https://www.baidu.com/s?wd='+keyword+'&tn=sitehao123&ie=utf-8';
    }
    function onsuggestSubmit(suggest) {
    }

};

$(document).bind('click',function(){
    $(".suggest").hide();
})

$(document).delegate('.suggest li','click',function(){
    //鼠标选择列表
    var keyword=$(this).text();
    location.href='https://www.baidu.com/s?wd='+keyword+'&tn=sitehao123&ie=utf-8'
})
$(document).keydown(function(e){
    //在列表ul中上下移动按键时，获取上一个li节点及当前li节点，改变其css样式
    switch(e.which){
        case 38://上移
            movePre();
            break;
        case 40://下移
            moveNext();
            break;
        default:break;
    }
})
function movePre() {//上移
    var index = $("li.liColor").prevAll().length;
    console.log("up"+index);
    if(index == 0)
        $(".suggest li").removeClass('liColor').eq($(".suggest li").length-1).addClass('liColor');    //可循环移动
    // if(index == 0) return false;                                                 //不可循环移动
    else $(".suggest li").removeClass('liColor').eq(index-1).addClass('liColor');
}
function moveNext() {//下移
    var index = $("li.liColor").prevAll().length;
    console.log("down"+index);
    if(index == $(".suggest li").length-1)
        $(".suggest li").removeClass('liColor').eq(0).addClass('liColor');            //可循环移动
    // if(index == $("li").length-1) return false;                                                //不可循环移动
    else $(".suggest li").removeClass('liColor').eq(index+1).addClass('liColor');
}

