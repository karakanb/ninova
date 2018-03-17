export default class {
  constructor(document, baseUrl, rows) {
    this.document = document;
    this.baseUrl = baseUrl;
    this.rows = rows;

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

  hasClass(element, cls) {
    return element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
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

  createTruncateDiv(lesson) {
    var div = this.newDiv('truncate');
    div.title = lesson;
    div.textContent = lesson;
    return div;
  }

  createInfoRow(lesson, className) {

    // Create left side lesson divs.
    const lessonDiv = this.createTruncateDiv(lesson);
    const lessonCol = this.newCol(7);
    lessonCol.appendChild(lessonDiv);

    // Create right-side class name divs.
    const classDiv = this.createTruncateDiv(className);
    const classCol = this.newCol(5);
    classCol.classList.add('text-right', 'pull-right');
    classCol.appendChild(classDiv);

    // Add both of the class and lesson names to the single row.
    const infoRow = this.newDiv('row');
    infoRow.classList.add('text-sm', 'class-info-text');
    infoRow.appendChild(lessonCol);
    infoRow.appendChild(classCol);

    return infoRow;
  }

  createClassRow(item) {
    const infoRow = this.createInfoRow(item.lesson, item.class);
    const assignmentRow = this.createAssignmentRow(item.assignmentName, item.assignmentLink);
    const dateRow = this.createDateRow(item.startDate, item.endDate);

    const container = this.newDiv('container');
    container.appendChild(infoRow);
    container.appendChild(assignmentRow);
    container.appendChild(dateRow);

    const classRow = this.newDiv('class-row');
    classRow.appendChild(container);

    return classRow;
  }

  createAssignmentRow(assignmentName, assignmentLink) {

    // Create the link and col contents.
    const a = this.newLink('link-underline', assignmentLink, assignmentName);
    const col = this.newCol(10);
    col.appendChild(a);

    // Append the col to a new row.
    const row = this.newDiv('row');
    row.classList.add('assignment-name');
    row.appendChild(col);

    return row;
  }

  createDateRow(startDate, endDate) {
    const startDateDiv = this.newDiv('date');
    startDateDiv.textContent = startDate;
    const startCol = this.newCol(6);
    startCol.appendChild(startDateDiv);

    const endDateDiv = this.newDiv('date');
    endDateDiv.textContent = startDate;
    const endCol = this.newCol(6);
    endCol.classList.add('pull-right', 'text-right');
    endCol.appendChild(endDateDiv);

    const row = this.newDiv('row');
    row.classList.add('text-sm', 'date-row');
    row.appendChild(startCol);
    row.appendChild(endCol);

    return row;
  }

  fill() {
    const wrapper = this.document.getElementById('table-wrapper');
    const noData = this.document.getElementById('no-data');

    if (this.rows.length == 0) {
      this.removeClass(noData, 'hide');
      this.addClass(wrapper, 'hide');
    } else {
      this.addClass(noData, 'hide');
      this.removeClass(wrapper, 'hide');
    }

    const body = this.document.getElementById('table-scroll');
    for (const assignment of this.rows) {
      const classRow = this.createClassRow(assignment);
      body.appendChild(classRow);
    }
  }
}