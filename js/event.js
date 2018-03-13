import AssignmentParser from './parse.js';
import ContentFiller from './ContentFiller.js';
import Database from './Database.js';

/**
 * 
 * @param {array} array 
 * @param {string} key 
 */
const keyBy = (array, key) => {
  const keyedObject = {}
  for (const item of array) {
    keyedObject[item[key]] = array;
  }

  return keyedObject;
}

const runParser = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'DOMInfo' }, function (info) {

      let rows = [];
      if (info.isNinova) {

        // Parse the wrapper content.
        var wrapper = document.createElement('div');
        wrapper.innerHTML = info.document;

        // Retrieve the table and initiate the parser instance.
        const table = wrapper.getElementsByClassName('data')[0];
        const parser = new AssignmentParser(table.getElementsByTagName('td'));

        // Parse the assignment rows.
        rows = parser.parse();

        // Set the key-value pairs for each of the homeworks.
        const db = new Database(rows);
        for (const row of rows) {
          console.log('setting key: ' + row.assignmentLink);
          db.set(row.assignmentLink, row, () => { });
        }
      }

      // Fill the popup page with retrieved content.
      const filler = new ContentFiller(document, rows);
      filler.fill();
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('update-button');
  button.addEventListener('click', runParser);
});