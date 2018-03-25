import TimeParser from "./TimeParser.js";

export default class {
  constructor(assignment) {
    this.assignment = assignment;

    // Set reminders before 5 minutes, 30 minutes, 60 minutes, 6 hours, a day and 3 days.
    this.lastNHours = [5, 30, 60, 6 * 60, 24 * 60, 72 * 60];
  }

  set() {
    const endDate = new TimeParser(this.assignment.endDate);

    // Create all the alarms.
    for (let index = 0; index < this.lastNHours.length; index++) {

      // Create a new date instance with the minute offset placed.
      const minuteDifference = this.lastNHours[index];
      const reminderDate = new Date(endDate.getDateInstance().getTime());
      reminderDate.setMinutes(endDate.getDateInstance().getMinutes() - minuteDifference);

      // Set the alarm.
      chrome.alarms.create(this.assignment.assignmentLink + minuteDifference, {
        when: reminderDate.getTime()
      });
    }
  }
}