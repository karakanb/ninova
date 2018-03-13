import AssignmentParser from './parse.js';
import ContentFiller from './ContentFiller.js';

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