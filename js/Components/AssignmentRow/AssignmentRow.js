import BaseDomElement from "../BaseDomElement.js";
import InfoRow from "./InfoRow.js";
import NameRow from "./NameRow.js";
import DateRow from "./DateRow.js";

export default class extends BaseDomElement {
  constructor(document, index, assignment) {
    super(document);
    this.index = index;
    this.assignment = assignment;

    this.infoRow = new InfoRow(document, index, assignment.lesson, assignment.assignmentLink);
    this.nameRow = new NameRow(document, assignment.assignmentName, assignment.assignmentLink);
    this.dateRow = new DateRow(document, assignment.endDate, assignment.reminderSet);
  }

  render() {
    const container = this.newDiv('class-row');
    container.appendChild(this.infoRow.render());
    container.appendChild(this.nameRow.render());
    container.appendChild(this.dateRow.render());
    container.setAttribute('data-key', this.assignment.assignmentLink);

    return container;
  }
}