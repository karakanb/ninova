import Row from './Row.js';

export default class {
  constructor(rawRows) {
    this.rawRows = rawRows;
    this.rows = [];
  }

  parse() {
    var rowCount = this.rawRows.length;
    for (var i = 0; i < rowCount; i++) {
      var r = new Row(this.rawRows[i]);
      this.rows.push(r.parse());
    }

    return this.rows;
  }
}