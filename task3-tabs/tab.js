define(function () {
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }

    var configs = {
        // 'slide'|'fadeout'���л�Ч���������л����ߵ��뵭��
        //effect: (string | default: 'slide'),
        effect: 'slide',
        //'click'|'hover'������tab�л��Ĳ���
        //trigger: (string | default: 'click'),
        trigger: 'click',
        //tab��Ҫ�л���ʱ����ã����ݲ�������ǰtab����Ҫ���ֵ�tab
        tabWillChange: function (now, next) {
            console.log("now is "+now+", the next is "+next);
        },
        //tab�л�������ʱ�򴥷������ݲ�������ǰtab����һ��tab
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
        // ����ÿһ��ҳǩ�Ҹ����ǰ��¼�
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

    //��tab����Ϊ��ǰ��
    Tab.prototype.setActiveTab = function (curIndex) {
        for (var j = 0, len = this.lis.length; j < len; j++) {
            this.lis[j].className = '';
            this.divs[j].style.display = 'none';
        }
        // ������ʾ��ǰҳǩ
        this.lis[curIndex].className = 'select';
        this.divs[curIndex].style.display = 'block';
        this.index = curIndex;
    };

    //�Զ��л�
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
