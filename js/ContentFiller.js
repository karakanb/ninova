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

  newIcon(iconName) {
    var i = this.document.createElement('i');
    i.classList.add('material-icons');
    i.textContent = iconName;

    return i;
  }

  createTruncateDiv(lesson) {
    var div = this.newDiv('truncate');
    div.title = lesson;
    div.textContent = lesson;
    return div;
  }

  createInfoRow(index, lesson, className) {

    // Create left side lesson divs.
    const lessonDiv = this.createTruncateDiv(lesson);

    const lessonCol = this.newCol(7);
    if (index == 0) {
      lessonCol.classList.add('tooltip-bottom');
    }
    lessonCol.setAttribute('data-tooltip', lesson);
    lessonCol.appendChild(lessonDiv);

    // Create right-side class name divs.
    const classDiv = this.createTruncateDiv(className);

    const classCol = this.newCol(5);
    if (index == 0) {
      classCol.classList.add('tooltip-bottom');
    }
    classCol.setAttribute('data-tooltip', className);
    classCol.classList.add('text-right', 'pull-right');
    classCol.appendChild(classDiv);

    // Add both of the class and lesson names to the single row.
    const infoRow = this.newDiv('row');
    infoRow.classList.add('text-sm', 'class-info-text');
    infoRow.appendChild(lessonCol);
    infoRow.appendChild(classCol);

    return infoRow;
  }

  createClassRow(index, item) {
    const infoRow = this.createInfoRow(index, item.lesson, item.class);
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
    const icon = this.newIcon('timer');
    icon.classList.add('date-row-icon');

    const startDateDiv = this.newDiv('date');
    startDateDiv.textContent = startDate;

    const endDateDiv = this.newDiv('date');
    endDateDiv.textContent = endDate;

    const dateSeperator = this.newDiv('date-seperator');
    dateSeperator.textContent = ' - ';

    const row = this.newDiv('row');
    row.classList.add('text-sm', 'date-row');
    row.appendChild(icon);
    row.appendChild(startDateDiv);
    row.appendChild(dateSeperator);
    row.appendChild(endDateDiv);

    return row;
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
      const classRow = this.createClassRow(index, assignment);
      body.appendChild(classRow);
    }
  }
}