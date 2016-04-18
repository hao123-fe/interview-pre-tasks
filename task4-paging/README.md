## 设计开发一个分页组件

需要有上一页、下一页、第一页、最后一页，跳转到第n页功能

支持选项：
* `pageCount`: (number | default: 10) 总页数
* `pageSiblings`: (number | default: 2) 当前页前后页码个数，如当前页为5，pageSiblings 为2则显示页码1...3 4 5 6 7...10
* `pageWillChange(now, next)`: (function) page将要切换的时候调用，传递参数：当前page，将要出现的page
* `pageDidChange(now, prev)`: (function) page切换结束的时候触发，传递参数：当前page，上一个page

支持方法：
* `goToPage(page)`，跳转到page
