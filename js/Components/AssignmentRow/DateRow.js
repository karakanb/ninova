import BaseDomElement from "../BaseDomElement.js";

export default class extends BaseDomElement {
  constructor(document, startDate, endDate) {
    super(document);
    this.startDate = startDate;
    this.endDate = endDate;
  }

  render() {
    const icon = this.icon.regular('calendar-alt');
    icon.classList.add('date-row-icon');

    const startDateDiv = this.newDiv('date');
    startDateDiv.textContent = this.startDate;

    const endDateDiv = this.newDiv('date');
    endDateDiv.textContent = this.endDate;

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
}