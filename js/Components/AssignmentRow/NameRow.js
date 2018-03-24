import BaseDomElement from "../BaseDomElement.js";

export default class extends BaseDomElement {
  constructor(document, assignmentName, assignmentLink) {
    super(document);
    this.assignmentName = assignmentName;
    this.assignmentLink = assignmentLink;
  }

  render() {

    // Create the link and col contents.
    const a = this.newLink('link-underline', this.assignmentLink, this.assignmentName);
    const col = this.newCol(10);
    col.appendChild(a);

    // Append the col to a new row.
    const row = this.newDiv('row');
    row.classList.add('assignment-name');
    row.appendChild(col);

    return row;
  }
}