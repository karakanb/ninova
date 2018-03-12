export default class {
  constructor(document, rows) {
    this.document = document;
    this.rows = rows;
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
    const p = this.document.createElement('p');
    p.textContent = "Eklenti sadece Ninova'da 'Ödevler' sayfasında çalışır.";
    return p;
  }

  fill() {
    const body = this.document.getElementById('table-scroll');
    if (this.rows.length == 0) {
      body.appendChild(this.createErrorDiv());
    }

    var table = this.document.createElement('table');
    for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
      const row = this.rows[rowIndex];
      const tr = this.createRow(row);
      table.appendChild(tr);
    }

    body.appendChild(table);
  }
}