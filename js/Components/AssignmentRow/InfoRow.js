import BaseDomComponent from '../BaseDomElement.js';
import Database from '../../Database.js';

export default class extends BaseDomComponent {

  constructor(document, index, lesson, assignmentLink) {
    super(document);
    this.index = index;
    this.lesson = lesson;
    this.assignmentLink = assignmentLink;
  }

  render() {

    // Create left side lesson divs.
    const lessonDiv = this.createTruncateDiv(this.lesson);

    const lessonCol = this.newCol(11);
    if (this.index == 0) {
      lessonCol.classList.add('tooltip-bottom');
    }
    lessonCol.setAttribute('data-tooltip', this.lesson);
    lessonCol.appendChild(lessonDiv);

    const icon = this.icon.solid('times');
    icon.classList.add('remove-icon');
    icon.title = 'Remove';
    icon.setAttribute('data-key', this.assignmentLink);
    icon.addEventListener('click', this.listener);

    const classCol = this.newCol(1);
    classCol.classList.add('text-right', 'pull-right');
    classCol.appendChild(icon);

    // Add both of the class and lesson names to the single row.
    const infoRow = this.newDiv('row');
    infoRow.classList.add('text-sm', 'class-info-text');
    infoRow.appendChild(lessonCol);
    infoRow.appendChild(classCol);

    return infoRow;
  }

  listener(event) {
    const target = event.target;
    const keyLink = target.dataset.key;

    // Remove the item from database.
    const db = new Database();
    db.remove(keyLink, () => {

      // Remove the wrapper row.
      const wrapperElement = document.querySelectorAll(`.class-row[data-key='${keyLink}']`)[0];
      wrapperElement.parentNode.removeChild(wrapperElement);
    });
  }
}