import Database from './Database.js';

function _empty(o) {
  return Object.keys(o).length === 0 && o.constructor === Object
}

function sendNotification(found) {

  // Do not proceed if the result is empty.
  if (_empty(found)) {
    console.log('Instance not found.');
    return;
  }

  // Retrieve the assignment instance.
  const assignment = Object.values(found)[0];
  console.log("Sending notification for:");
  console.log(assignment);

  // Create the notification.
  chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: './icon.png',
    title: assignment.assignmentName,
    message: assignment.endDate
  }, function (notificationId) { console.log("Last error:", chrome.runtime.lastError); });

  console.log("Successfully sent notification for the assignment.");
}

chrome.alarms.onAlarm.addListener((alarm) => {
  const alarmName = alarm.name;
  const storageKey = alarmName.split('_')[0];

  const db = new Database();
  db.get(storageKey, sendNotification);
})