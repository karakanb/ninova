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

  createRow(row) {
    const tr = this.document.createElement('tr');
    for (let property in row) {
      const td = this.document.createElement('td');
      td.innerHTML = row[property]
      tr.appendChild(td);
    }

    return tr;
  }

  createErrorDiv() {
    this.removeItem(this.errorParagraphId);
    const p = this.document.createElement('p');
    p.setAttribute('id', this.errorParagraphId);
    p.textContent = "Eklenti sadece Ninova'da 'Ödevler' sayfasında çalışır.";
    return p;
  }

  fill() {
    const body = this.document.getElementById('table-scroll');
    if (this.rows.length == 0) {
      body.appendChild(this.createErrorDiv());
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