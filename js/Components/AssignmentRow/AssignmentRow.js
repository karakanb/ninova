import BaseDomElement from "../BaseDomElement.js";
import InfoRow from "./InfoRow.js";
import NameRow from "./NameRow.js";
import DateRow from "./DateRow.js";

export default class extends BaseDomElement {
  constructor(document, index, assignment) {
    super(document);
    this.index = index;
    this.assignment = assignment;

    console.log(this.assignment);

    this.infoRow = new InfoRow(document, this.index, this.assignment.lesson, this.assignment.className);
    this.nameRow = new NameRow(document, this.assignment.assignmentName, this.assignment.assignmentLink);
    this.dateRow = new DateRow(document, this.assignment.startDate, this.assignment.endDate);
  }

  render() {
    const container = this.newDiv('container');
    container.appendChild(this.infoRow.render());
    container.appendChild(this.nameRow.render());
    container.appendChild(this.dateRow.render());

    const classRow = this.newDiv('class-row');
    classRow.appendChild(container);

    return classRow;
  }
}