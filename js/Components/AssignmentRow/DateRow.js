import BaseDomElement from "../BaseDomElement.js";
import Database from "../../Database.js";
import ReminderSetter from "../../Utility/ReminderSetter.js";

export default class extends BaseDomElement {
  constructor(document, startDate, endDate) {
    super(document);
    this.startDate = startDate;
    this.endDate = endDate;
    this.db = new Database();
  }

  render() {
    const icon = this.icon.regular('calendar-alt');
    icon.classList.add('date-row-icon');
    const iconCol = this.newCol(1);
    iconCol.appendChild(icon);

    const endDateDiv = this.newCol(6);
    endDateDiv.classList.add('date');
    endDateDiv.textContent = this.endDate;

    const buttonCol = this.newCol(7);
    const button = this.renderSetterButton();
    buttonCol.appendChild(button);
    buttonCol.id = 'reminder-button-wrapper';

    const row = this.newDiv('row');
    row.classList.add('text-sm', 'date-row');
    row.appendChild(iconCol);
    row.appendChild(endDateDiv);
    row.appendChild(buttonCol);

    return row;
  }


  /**
   * Create and return a reminder setter button instance.
   */
  renderSetterButton() {
    const button = this._buttonRenderer(true);
    button.classList.add('set-reminder', 'pulse');
    return button;
  }

  /**
   * Create and return a reminder remover button instance.
   */
  renderRemoverButton() {
    const button = this._buttonRenderer(false);
    button.classList.add('remove-reminder');
    return button;
  }

  /**
   * 
   * @param {bool} isSetter 
   */
  _buttonRenderer(isSetter) {
    const icon = isSetter ? this.icon.solid('bell') : this.icon.regular('bell');
    const remind = this.newButton('btn-reminder');
    remind.classList.add('pull-right', 'btn');
    remind.addEventListener('click', isSetter ? this.setReminders.bind(this) : this.removeReminders.bind(this));
    remind.appendChild(icon);

    const span = this.newDiv('btn-msg');
    span.textContent = isSetter ? 'Set Reminders' : 'Remove Reminders';
    remind.appendChild(span);

    return remind;
  }

  /**
   * Set reminders for this assignment.
   * @param {*} event 
   */
  setReminders(event) {
    const target = event.target.parentNode;
    const targetParent = this._getButtonWrapper();

    const newButton = this.renderRemoverButton();
    targetParent.replaceChild(newButton, target);

    this.db.get(this.assignmentLink, (assignment) => {
      const assignmentInstance = Object.values(assignment)[0];
      const reminder = new ReminderSetter(assignmentInstance);
      reminder.set();

      assignmentInstance.reminderSet = true;
      const db = new Database();
      db.set(assignmentInstance.assignmentLink, assignmentInstance);
      console.log(assignmentInstance);
    })
  }

  /**
   * Remove the reminders that are set for this assignment.
   * @param {*} event 
   */
  removeReminders(event) {
    const target = event.target.parentNode;
    const targetParent = this._getButtonWrapper();

    const newButton = this.renderSetterButton();
    targetParent.replaceChild(newButton, target);
  }

  _getButtonWrapper() {
    return this.document.getElementById('reminder-button-wrapper');
  }
}