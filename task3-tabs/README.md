## 设计开发一个tab切换组件

支持点击或者hover切换，支持hook，支持左右切换和淡入淡出两种切换效果

支持配置项：
* `effect`: (string | default: 'slide') `'slide'`|`'fadeout'`，切换效果，左右切换或者淡入淡出
* `trigger`: (string | default: 'click') `'click'`|`'hover'`，触发tab切换的操作
* `tabWillChange(now, next)`: (function)，tab将要切换的时候调用，传递参数：当前tab，将要出现的tab
* `tabDidChange(now, prev)`: (function)，tab切换结束的时候触发，传递参数：当前tab，上一个tab

支持方法：
* `setActiveTab(tab)`，将tab设置为当前；
