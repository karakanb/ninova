import AssignmentParser from './parse.js';
import ContentFiller from './ContentFiller.js';
import Database from './Database.js';
import DbSync from './Utility/DbSync.js';

/**
 * Fill the existing assignments saved on the local storage to the popup window.
 */
const fillExistingAssignments = () => {
  const db = new Database();
  db.getAll((rows) => {
    const filler = new ContentFiller(document, Object.values(rows));
    filler.fill();
  });
}

/**
 * Run the parser by querying the content script with the current tab.
 */
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
        const dbSync = new DbSync(db);
        dbSync.sync(rows);
      }

      fillExistingAssignments();
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  fillExistingAssignments();
  const button = document.getElementById('update-button');
  button.addEventListener('click', runParser);
});