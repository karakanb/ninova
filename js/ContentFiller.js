import Icon from './Components/Icon.js';
import AssignmentRow from './Components/AssignmentRow/AssignmentRow.js';

export default class {
  constructor(document, baseUrl, rows) {
    this.document = document;
    this.baseUrl = baseUrl;
    this.rows = rows;
    this.icon = new Icon(this.document);

    this.tableId = 'table-scroll';
    this.errorParagraphId = 'error-message';
    this.removeItem(this.tableId);
  }

  removeItem(id) {
    var myNode = document.getElementById(id);
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  removeClass(element, cls) {
    element.classList.remove(cls);
  }

  addClass(element, cls) {
    element.classList.add(cls);
  }

  newDiv(itemClass = '') {
    var div = document.createElement('div');
    div.classList.add(itemClass);
    return div;
  }

  newCol(width = 6) {
    var div = this.newDiv(`col-${width}`);
    return div;
  }

  newLink(className, href, content) {
    var a = document.createElement('a');
    a.classList.add(className);
    a.href = this.baseUrl + href;
    a.textContent = content;

    return a;
  }

  fill() {
    const body = this.document.getElementById('table-scroll');
    const noData = this.document.getElementById('no-data');

    if (this.rows.length == 0) {
      this.removeClass(noData, 'hide');
      this.addClass(body, 'hide');
    } else {
      this.addClass(noData, 'hide');
      this.removeClass(body, 'hide');
    }

    for (const [index, assignment] of this.rows.entries()) {
      const assignmentRow = new AssignmentRow(document, index, assignment);
      body.appendChild(assignmentRow.render());
    }
  }
}