export default class {
  constructor(document, rows) {
    this.document = document;
    this.rows = rows;
    this.tableId = 'class-list';
    this.errorParagraphId = 'error-message';
    this.removeItem(this.tableId);
  }

  removeItem(id) {
    var element = document.getElementById(id);
    if (element) {
      element.parentNode.removeChild(element);
    }
  }

  hasClass(element, cls) {
    return element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  removeClass(element, cls) {
    if (this.hasClass(element, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      element.className = element.className.replace(reg, ' ');
    }
  }

  addClass(element, cls) {
    if (!this.hasClass(element, cls)) {
      element.className += ` ${cls}`;
    }
  }

  createRow(row) {
    const tr = this.document.createElement('tr');
    for (let property in row) {
      const td = this.document.createElement('td');
      td.innerHTML = row[property]
      tr.appendChild(td);
    }

    return tr;
  }

  fill() {
    const body = this.document.getElementById('table-scroll');
    const wrapper = this.document.getElementById('table-wrapper');
    const noData = this.document.getElementById('no-data');

    if (this.rows.length == 0) {
      this.removeClass(noData, 'hide');
      this.addClass(wrapper, 'hide');
    } else {
      this.addClass(noData, 'hide');
      this.removeClass(wrapper, 'hide');
    }


    var table = this.document.createElement('table');
    table.setAttribute("id", this.tableId);

    for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
      const row = this.rows[rowIndex];
      const tr = this.createRow(row);
      table.appendChild(tr);
    }

    body.appendChild(table);
  }
}