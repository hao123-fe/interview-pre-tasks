define(function () {
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }

    var configs = {
        // 'slide'|'fadeout'，切换效果，左右切换或者淡入淡出
        //effect: (string | default: 'slide'),
        effect: 'slide',
        //'click'|'hover'，触发tab切换的操作
        //trigger: (string | default: 'click'),
        trigger: 'click',
        //tab将要切换的时候调用，传递参数：当前tab，将要出现的tab
        tabWillChange: function (now, next) {
            console.log("now is "+now+", the next is "+next);
        },
        //tab切换结束的时候触发，传递参数：当前tab，上一个tab
        tabDidChange: function (now, prev) {
            console.log("now is "+now+", the prev is "+prev);
        }
    };

    function Tab(idTit, idCon) {
        this.lis = $(idTit).getElementsByTagName('li');
        this.divs = $(idCon).getElementsByTagName('div');
        this.index = 0;
        this.timer = null;
        this.animate = configs.effect;
        this.trigger = configs.trigger;
    }

    Tab.prototype.init = function () {
        var that = this;
        var action;
        if (this.trigger && this.trigger == "hover") {
            action = 'onmouseover';
        } else {
            action = 'onclick';
        }
        // 遍历每一个页签且给他们绑定事件
        for (var i = 0, len = this.lis.length; i < len; i++) {
            this.lis[i].id = i;
            this.lis[i][action] = function () {
                //clearInterval(that.timer);
                var now_index=document.querySelector(".select").id;
                configs.tabWillChange(now_index,this.id);
                that.setActiveTab(this.id);
                configs.tabDidChange(this.id,now_index);
            };
            this.lis[i].onmouseout = function () {
                //that.autoPlay();
            }
        }
    };

    //将tab设置为当前；
    Tab.prototype.setActiveTab = function (curIndex) {
        for (var j = 0, len = this.lis.length; j < len; j++) {
            this.lis[j].className = '';
            this.divs[j].style.display = 'none';
        }
        // 高亮显示当前页签
        this.lis[curIndex].className = 'select';
        this.divs[curIndex].style.display = 'block';
        this.index = curIndex;
    };

    //自动切换
    Tab.prototype.autoPlay = function () {
        var that = this;
        that.timer = setInterval(function () {
            that.index++;
            if (that.index >= that.lis.length) {
                that.index = 0;
            }
            that.setActiveTab(that.index);
        }, 1000);
    };
    return {Tab:Tab};
});
