import Database from './Database.js';

function _empty(o) {
  return Object.keys(o).length === 0 && o.constructor === Object
}

function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function random(len) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  var str = Array.from(arr, dec2hex).join('');
  str = replaceAll(str, '_', '');
  return str;
}

/**
 * Send a notification for the found instance.
 * @param {*} found 
 */
function sendNotification(assignment) {
  console.log("Sending notification.");
  console.log(assignment);
  const notificationObject = {
    type: 'basic',
    iconUrl: '../icon.png',
    title: assignment.assignmentName,
    contextMessage: assignment.lesson,
    message: assignment.endDate,
    buttons: [
      {
        title: "Visit",
      }
    ]
  };

  console.log(notificationObject);

  // Create the notification.
  chrome.notifications.create(`${assignment.assignmentLink}_${random(20)}`, notificationObject, function (notificationId) {
    console.log("Last error:", chrome.runtime.lastError);
  });

  console.log("Successfully sent notification for the assignment.");
}

/**
 * Add event listener for the alarm.
 */
chrome.alarms.onAlarm.addListener((alarm) => {
  const alarmName = alarm.name;
  const storageKey = alarmName.split('_')[0];

  const db = new Database();
  db.get(storageKey, (found) => {

    // Do not proceed if the result is empty.
    if (_empty(found)) {
      console.log('Instance not found.');
      return;
    }

    // Retrieve the assignment instance.
    const assignment = Object.values(found)[0];
    sendNotification(assignment);
  });
});


/**
 * Add a listener to open the Ninova Assignment page on notification click.
 */
chrome.notifications.onClicked.addListener((notificationId) => {
  const baseUrl = 'http://ninova.itu.edu.tr';
  const assignmentLink = notificationId.split('_')[0];
  window.open(baseUrl + assignmentLink, '_blank');
  chrome.notifications.clear(notificationId);
});