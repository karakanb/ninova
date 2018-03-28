import BaseDomElement from "../BaseDomElement.js";
import Database from "../../Database.js";
import ReminderSetter from "../../Utility/ReminderSetter.js";

export default class extends BaseDomElement {
  constructor(document, assignmentName, assignmentLink) {
    super(document);
    this.assignmentName = assignmentName;
    this.assignmentLink = assignmentLink;
    this.db = new Database();
  }

  /**
   * Render the name row.
   */
  render() {

    // Create the link and col contents.
    const a = this.newLink('link-underline', this.assignmentLink, this.assignmentName);
    const nameCol = this.newCol(12);
    nameCol.appendChild(a);

    // Append the col to a new row.
    const row = this.newDiv('row');
    row.classList.add('assignment-name');
    row.appendChild(nameCol);

    return row;
  }
}