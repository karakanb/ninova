import BaseDomComponent from '../BaseDomElement.js';

export default class extends BaseDomComponent {

  constructor(document, index, lesson, className) {
    super(document);
    this.index = index;
    this.lesson = lesson;
    this.className = className;
  }

  render() {

    // Create left side lesson divs.
    const lessonDiv = this.createTruncateDiv(this.lesson);

    const lessonCol = this.newCol(7);
    if (this.index == 0) {
      lessonCol.classList.add('tooltip-bottom');
    }
    lessonCol.setAttribute('data-tooltip', this.lesson);
    lessonCol.appendChild(lessonDiv);

    // Create right-side class name divs.
    const classDiv = this.createTruncateDiv(this.className);

    const classCol = this.newCol(5);
    if (this.index == 0) {
      classCol.classList.add('tooltip-bottom');
    }
    classCol.setAttribute('data-tooltip', this.className);
    classCol.classList.add('text-right', 'pull-right');
    classCol.appendChild(classDiv);

    // Add both of the class and lesson names to the single row.
    const infoRow = this.newDiv('row');
    infoRow.classList.add('text-sm', 'class-info-text');
    infoRow.appendChild(lessonCol);
    infoRow.appendChild(classCol);

    return infoRow;
  }

}