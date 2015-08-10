## 设计开发一个轮播图组件

支持左右轮播和淡入淡出两种效果，同一个页面可以出现多个slider。

支持选项：
* `slideEffect` : `slide`|`fadeout`，轮播效果，左右轮播或者淡入淡出
* `slideInterval`: `1000` ，自动轮播的时间间隔ms

支持方法：
* `setActiveSlide(slide)`，将slide设置为当前；
* `sliderWillSlide(now, next)`，将要slide的时候调用，传递参数：当前slide，将要出现的slide
* `sliderDidSlide(now, prev)`，slide结束的时候触发，传递参数：当前slide，上一个slide