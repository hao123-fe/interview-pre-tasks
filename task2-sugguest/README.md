## 设计开发一个搜索词推荐组件

支持上下键移动，支持回车键直接搜索。效果可以参考hao123首页搜索框

suggest API可参考 http://suggestion.baidu.com/su?cb=jQuery17206033488339744508_1439277469058&wd=hao123&sc=hao123&_=1439278231198#

搜索提交跳转 https://www.baidu.com/s?word=hao123&tn=sitehao123&ie=utf-8

支持选项：
* `maxNum`，推荐词推荐的最大条数
* `highlight`，是否高亮搜索词

支持方法：
* `add(suggest)`，添加一条推荐，`suggest`的格式可以自己设计
* `onChange(newWord, oldWord)`，搜索词变化的时候调用，传递参数：新的搜索词、之前的搜索词
* `onSelected(newSuggest, oldSuggest)`，键盘选择suggest的时候调用，传递参数：选中的suggest、之前选中的suggest
* `onWordSubmit(word)`，在搜索框按回车时调用，如果return false，可以阻止提交，传递参数：搜索词
* `onSuggestSubmit(suggest)`，在suggest按回车时调用，如果return false，可以阻止提交，传递参数：suggest