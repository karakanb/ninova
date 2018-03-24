export default class {
  constructor(assignments = []) {
    this.assignments = assignments;
    this.keys = this.getKeys();
  }

  getKeys() {
    const keys = [];
    for (const assignment of this.assignments) {
      keys.push(assignment.assignmentLink);
    }

    return keys;
  }

  get(key, callback) {
    chrome.storage.sync.get([key], callback);
  }

  getAll(callback) {
    chrome.storage.sync.get(null, callback);
  }

  set(key, value, callback = () => { }) {
    const storedObj = {};
    storedObj[key] = value;
    chrome.storage.sync.set(storedObj, callback);
  }

  remove(key, callback = () => { }) {
    chrome.storage.sync.remove(key, callback);
  }

  removeAll() {
    this.getAll((rows) => {
      const keys = Object.keys(rows);
      chrome.storage.sync.remove(keys);
    })
  }
}