var paging = function(selector) {
  if (!selector) return false;
  this.pageCount = 10;
  this.pageNumRange = 2;

  var pagination, nowPage, nextPage, prevPage;
  var selector = selector;

  this.goToPage = function(page) {
    if (!page) return false;
    var temp = getPagingTemp.bind(this, page);
    $(pagination).html(temp);
  }

  this.pageWillChange = function(now, next) {
    nowPage = now;
    nextPage = next;
  }

  this.pageDidChange = function(now, prev) {
    nowPage = now;
    prevPage = prev;
  }

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.tagName === 'A') {
      this.pageWillChange(nowPage, parseInt(event.target.textContent));
      this.goToPage(parseInt(event.target.textContent));
    }
  }

  function handleInput(event) {
    if (!event.target.value ||
        event.target.value > this.pageCount ||
        event.target.value < 0) return false;
    this.goToPage(parseInt(event.target.value));
  }

  function getPagingTemp(currentPage) {
    var temp = '';
    if (currentPage == 1) {
      temp = '<input type="number" value="' + currentPage + '" />';
    } else {
      temp = currentPage - this.pageNumRange - 1 > 1 ?
        '<a href="#">1</a>...' : '<a href="#">1</a>';
    }
    for (var i = 1; i <= this.pageCount; i++) {
      if (i == 1 || i == this.pageCount) continue;
      if (i >= currentPage - this.pageNumRange &&
          i <= currentPage + this.pageNumRange) {
        temp += i == currentPage ?
          '<input type="number" value="' + currentPage + '" />' :
          '<a href="#">' + i + '</a>';
      }
    }
    if (currentPage == this.pageCount) {
      temp += '<input type="number" value="' + currentPage + '" />';
    } else {
      temp += currentPage + this.pageNumRange + 1 >= this.pageCount ?
        '<a href="#">' + this.pageCount + '</a>' :
        '...<a href="#">' + this.pageCount + '</a>';
    }
    this.pageDidChange(currentPage, nowPage);
    return temp;
  }

  function init() {
    nowPage = 5;
    prevPage = 0;
    nextPage = 0;
    pagination = document.getElementById(selector);

    var temp = getPagingTemp.bind(this, nowPage);
    $(pagination).html(temp);

    $(pagination).on('click', 'a', handleClick.bind(this));
    $(pagination).on('keyup change', 'input', handleInput.bind(this));
  }

  window.addEventListener('load', init.bind(this));
};

var a = new paging('pagination');
