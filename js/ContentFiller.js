import Icon from './Components/Icon.js';
import AssignmentRow from './Components/AssignmentRow/AssignmentRow.js';
import BaseDomElement from './Components/BaseDomElement.js';

export default class {
  constructor(document, baseUrl, rows) {
    this.document = document;
    this.baseUrl = baseUrl;
    this.rows = rows;
    this.icon = new Icon(this.document);
    this.dom = new BaseDomElement(document);

    this.tableId = 'table-scroll';
    this.errorParagraphId = 'error-message';
    this.dom.removeAllChildrenById(this.tableId);
  }

  fill() {
    const body = this.document.getElementById('table-scroll');
    const noData = this.document.getElementById('no-data');

    if (this.rows.length == 0) {
      noData.classList.remove('hide');
      body.classList.add('hide');
    } else {
      noData.classList.add('hide');
      body.classList.remove('hide');
    }

    for (const [index, assignment] of this.rows.entries()) {
      const assignmentRow = new AssignmentRow(document, index, assignment);
      body.appendChild(assignmentRow.render());
    }
  }
}