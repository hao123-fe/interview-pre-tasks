
var boxObj,boxObj2;
var box1,box2;

document.body.onload = playSlide;

function playSlide(){
    box1 = document.getElementsByClassName('slider')[0];
    box2 = document.getElementsByClassName('slider')[1];
    boxObj = new slideObj(box1);  //创建一个轮播盒子
    boxObj2 = new slideObj(box2);  //创建一个轮播盒子

    boxObj.setActiveSlide(0);
    boxObj2.setActiveSlide(2);
    boxObj.init();
    boxObj2.init();

}

//构造函数,相关参数:box=>传入轮播盒子;effect=>轮播模式;auto=>是否自动轮播;slideTime=>轮播间隔
//原型方法 初始化init(),自定义首页图案setActiveSlide(),回调函数不太会弄....不知道怎么封装比较好
function slideObj(box,effect, auto, slideTime){
    this.slideEffect = effect || 'slide';   //轮播效果slide|fadeout
    this.autoSlide = auto || true;          //是否自动轮播true|false
    this.slideInterval = slideTime || 2000;      //轮播间隔ms
    this.nowSlide = 0;   //当前播放
    this.slides = box.getElementsByClassName('items');//保存图片slides
    this.slideIcons = box.getElementsByTagName('li');
    this.box = box;
}

slideObj.prototype.init = function(){
    //轮播模式
    var picArr = this.slides;
    var iconArr = this.slideIcons;
    var nowSlide = this.nowSlide;
    var icons = this.slideIcons;
    var slidesLen = this.slides.length;   //图片个数
    var iconsLen = icons.length;


    if (this.autoSlide){

    }
    if(this.slideEffect === 'slide'){
        //var slidesLen = this.slides.length;   //图片个数
        var addSlide = document.createElement('img');   //多添加第一张图片 最后一次轮转时调用
        addSlide.className = 'items';
        addSlide.src = this.slides[0].src;
        this.box.appendChild(addSlide);


        //var picArr = this.slides;
        //var iconArr = this.slideIcons;
        var n = 25;   //一轮刷新次数
        //var nowSlide = this.nowSlide;
        var count = 0;   //一次轮换刷新n次
        var runSpeed = 50;   //轮播转换速度
        var slideTime = this.slideInterval;

        if(this.autoSlide) {
            var slideInter = setInterval(run, this.slideInterval + n * runSpeed);
            //var icons = this.slideIcons;
            //var iconsLen = icons.length;
            for (var i = 0; i < iconsLen; i++) {
                (function (i) {
                    icons[i].addEventListener('click', function () {
                        nowSlide = i;
                        count = 0;
                        console.log(nowSlide,i);

                        clearInterval(slideInter);
                        for (var j = 0; j < iconsLen; j++) {
                            if (iconArr[j].classList.contains('active')) {
                                iconArr[j].classList.remove('active');
                            }
                        }
                        iconArr[nowSlide].classList.add('active');   //变动icon
                        for (var j = 0; j < iconsLen + 1; j++) {
                            picArr[j].style.left = -192 * nowSlide + 'px';
                        }
                        slideInter = setInterval(run,slideTime+n*runSpeed);
                    })
                })(i);
            }

            function run() {
                if (nowSlide == picArr.length-1){     //归位第一个图片
                    nowSlide = 0;
                    for(var i=0; i<slidesLen+1; i++){
                        picArr[i].style.left = 0+'px';
                    }
                }


                var runInter = setInterval(function(){
                    var moveDis = 192/n*count;
                    for(var i=0; i<slidesLen+1; i++){
                        picArr[i].style.left = -192 * nowSlide - moveDis+'px';
                    }
                    if (count == n) {
                        count = 0;
                        nowSlide++;
                        for (var i=0; i<iconArr.length; i++){
                            if(iconArr[i].classList.contains('active')){
                                iconArr[i].classList.remove('active');
                            }
                        }
                        iconArr[(nowSlide)%(iconArr.length)].classList.add('active');   //变动icon
                        clearInterval(runInter);
                    }else{
                        count++;
                    }
                },runSpeed);
                //运行到最后一张图,将所有图片跳转回原点

            }

        }
        if(!this.autoSlide){
            //var nowSlide = this.nowSlide;
            //var picArr = this.slides;
            //var icons = this.slideIcons;
            //var iconsLen = icons.length;
            for (var i = 0; i < iconsLen; i++) {
                (function (i) {
                    icons[i].addEventListener('click', function () {
                        nowSlide = i;
                        console.log(nowSlide,i);

                        for (var j = 0; j < iconsLen; j++) {
                            if (iconArr[j].classList.contains('active')) {
                                iconArr[j].classList.remove('active');
                            }
                        }
                        iconArr[nowSlide].classList.add('active');   //变动icon
                        for (var j = 0; j < iconsLen + 1; j++) {
                            picArr[j].style.left = -192 * nowSlide + 'px';
                        }
                    })
                })(i);
            }
        }

    }

    //fade播放
    if(this.slideEffect === 'fadeout'){
        //var slideLen = this.slides.length;

        //for (var i=0; i<slidesLen; i++){
        //    this.slides[i].classList.add('fadeInOut');
        //    this.slides[i].style.left = 0+'px';
        //}

        //var nowSlide = 0;
        //var picArr = this.slides;
        //var iconArr = this.slideIcons;
        if(this.autoSlide){
            var slideTime = this.slideInterval;
            var slideInter = setInterval(fadeRun, this.slideInterval);
            for (var i = 0; i < iconsLen; i++) {
                (function (i) {
                    icons[i].addEventListener('click', function () {


                        clearInterval(slideInter);

                        picArr[nowSlide].classList.remove('fade_in');
                        picArr[nowSlide].classList.add('fade_out');
                        nowSlide = i;
                        console.log(nowSlide,i);
                        picArr[nowSlide].classList.remove('fade_out');
                        picArr[nowSlide].classList.add('fade_in');

                        for (var j = 0; j < iconsLen; j++) {
                            if (iconArr[j].classList.contains('active')) {
                                iconArr[j].classList.remove('active');
                            }
                        }
                        iconArr[nowSlide].classList.add('active');   //变动icon
                        console.log(slideTime);
                        slideInter = setInterval(fadeRun,slideTime);
                    })
                })(i);
            }
            function fadeRun() {
                if (nowSlide < slidesLen-1) {
                    //picArr[nowSlide].style.display = 'none';
                    picArr[nowSlide].classList.remove('fade_in');
                    picArr[nowSlide].classList.add('fade_out');
                    picArr[nowSlide+1].classList.remove('fade_out');
                    picArr[nowSlide+1].classList.add('fade_in');

                    nowSlide++;
                }else {   //最后一张图片
                    picArr[nowSlide].classList.remove('fade_in');
                    picArr[nowSlide].classList.add('fade_out');
                    picArr[0].classList.remove('fade_out');
                    picArr[0].classList.add('fade_in');
                    nowSlide = 0;
                }
                //改变icons
                for (var i=0; i<iconArr.length; i++){
                    if(iconArr[i].classList.contains('active')){
                        iconArr[i].classList.remove('active');
                    }
                }
                iconArr[(nowSlide)%(iconArr.length)].classList.add('active');   //变动icon


            }
        }
        if(!this.autoSlide){
            for (var i = 0; i < iconsLen; i++) {
                (function (i) {
                    icons[i].addEventListener('click', function () {

                        picArr[nowSlide].classList.remove('fade_in');
                        picArr[nowSlide].classList.add('fade_out');
                        nowSlide = i;
                        console.log(nowSlide,i);
                        picArr[nowSlide].classList.remove('fade_out');
                        picArr[nowSlide].classList.add('fade_in');

                        for (var j = 0; j < iconsLen; j++) {
                            if (iconArr[j].classList.contains('active')) {
                                iconArr[j].classList.remove('active');
                            }
                        }
                        iconArr[nowSlide].classList.add('active');   //变动icon
                    })
                })(i);
            }
        }


    }


}


slideObj.prototype.sliderWillSlide = sliderWillSlide;
slideObj.prototype.sliderDidSlide = sliderDidSlide;
slideObj.prototype.setActiveSlide = setActiveSlide;


//slider调用时的回调函数,now->当前slide,next->下一个slide
function sliderWillSlide(nowSlide, nextSlide){

}

//slide结束时调用的回调函数,
function sliderDidSlide(now, prev){

}

//传入一个图片,将slide设置为当前
function setActiveSlide(slide){
    this.nowSlide = slide;
    var iconArr = this.slideIcons;
    var slideLen = this.slides.length;
    console.log(slideLen);
    for (var i=0; i<iconArr.length; i++){
        if(iconArr[i].classList.contains('active')){
            iconArr[i].classList.remove('active');
        }
    }
    this.slideIcons[(this.nowSlide)%(this.slides.length)].classList.add('active');   //变动icon
    if (this.slideEffect === 'slide'){
        for(var i=0; i<slideLen; i++){
            this.slides[i].style.left = -192*this.nowSlide+'px';
        }
    }
    if( this.slideEffect === 'fadeout'){
        for (var i=0; i<this.slides.length; i++){
            this.slides[i].classList.add('fadeInOut');
            this.slides[i].style.left = 0+'px';
        }
        this.slides[slide].classList.remove('fade_out');
        this.slides[slide].classList.add('fade_in');
    }


}