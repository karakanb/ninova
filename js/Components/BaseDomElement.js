import Icon from "./Icon.js";

export default class {
  constructor(document) {
    this.document = document;
    this.icon = new Icon(document);
  }

  removeClass(element, cls) {
    element.classList.remove(cls);
  }

  addClass(element, cls) {
    element.classList.add(cls);
  }

  newDiv(itemClass = '') {
    var div = this.document.createElement('div');
    div.classList.add(itemClass);
    return div;
  }

  newCol(width = 6) {
    var div = this.newDiv(`col-${width}`);
    return div;
  }

  newLink(className, href, content) {
    var a = this.document.createElement('a');
    a.classList.add(className);
    a.href = this.baseUrl + href;
    a.textContent = content;

    return a;
  }

  createTruncateDiv(lesson) {
    var div = this.newDiv('truncate');
    div.title = lesson;
    div.textContent = lesson;
    return div;
  }
}