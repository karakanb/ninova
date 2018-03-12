import AssignmentParser from './parse.js'

window.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'DOMInfo' }, function (info) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = info.document;

      var table = wrapper.getElementsByClassName('data')[0];
      var parser = new AssignmentParser(table.getElementsByTagName('td'));

      var rows = parser.parse();
      console.log(rows);
    });
  });
});