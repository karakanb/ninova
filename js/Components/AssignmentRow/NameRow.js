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
    const nameCol = this.newCol(10);
    nameCol.appendChild(a);

    const remindButton = this.setReminderButton();
    const remindCol = this.newCol(2);
    remindCol.classList.add('pull-right');
    remindCol.appendChild(remindButton);

    // Append the col to a new row.
    const row = this.newDiv('row');
    row.classList.add('assignment-name');
    row.appendChild(nameCol);
    row.appendChild(remindCol);

    return row;
  }

  setReminderButton() {
    const icon = this.icon.regular('bell');
    const remind = this.newButton('set-reminder');
    remind.classList.add('pull-right');
    remind.addEventListener('click', this.setReminders.bind(this));
    remind.appendChild(icon);

    return remind;
  }

  removeReminderButton() {
    const icon = this.icon.solid('bell');
    const remind = this.newButton('remove-reminder');
    remind.classList.add('pull-right');
    remind.addEventListener('click', this.removeReminders.bind(this));
    remind.appendChild(icon);

    return remind;
  }

  setReminders(event) {
    const target = event.target.parentNode;
    const targetParent = target.parentNode;

    const newButton = this.removeReminderButton();
    targetParent.replaceChild(newButton, target);
  }

  removeReminders(event) {
    const target = event.target.parentNode;
    const targetParent = target.parentNode;

    const newButton = this.setReminderButton();
    targetParent.replaceChild(newButton, target);
  }
}