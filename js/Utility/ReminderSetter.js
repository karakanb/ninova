import TimeParser from "./TimeParser.js";

export default class {
  constructor() {
    // Set reminders before 5 minutes, 30 minutes, 60 minutes, 6 hours, a day and 3 days.
    this.lastNHours = [5, 30, 60, 6 * 60, 24 * 60, 72 * 60];
  }

  set(rawEndDate, assignmentLink) {
    const endDate = new TimeParser(rawEndDate);

    // Create all the alarms.
    for (let index = 0; index < this.lastNHours.length; index++) {

      // Create a new date instance with the minute offset placed.
      const minuteDifference = this.lastNHours[index];
      const reminderDate = new Date(endDate.getDateInstance().getTime());
      reminderDate.setMinutes(endDate.getDateInstance().getMinutes() - minuteDifference);

      // Set the alarm.
      chrome.alarms.create(`${assignmentLink}_${minuteDifference}`, {
        when: reminderDate.getTime()
      });
    }
  }

  remove(assignmentLink) {
    // Create all the alarms.
    for (let index = 0; index < this.lastNHours.length; index++) {
      const minuteDifference = this.lastNHours[index];
      chrome.alarms.clear(`${assignmentLink}_${minuteDifference}`);
    }
  }
}