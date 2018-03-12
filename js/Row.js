export default class {
  constructor(row) {
    this.row = row;
    this.strongNameMap = [
      "lesson",
      "class",
      "startDate",
      "endDate"
    ];
  }

  getStrongs() {
    return this.row.getElementsByTagName('strong');
  }

  getAssignmentName() {
    return this.row.getElementsByTagName('h2')[0].textContent;
  }

  getAssignmentLink() {
    return this.row.getElementsByTagName('h2')[0].getElementsByTagName('a')[0].getAttribute('href');
  }

  parse() {
    var result = {};
    var strongs = this.getStrongs();

    for (var i = 0; i < 4; i++) {
      var s = strongs[i];
      result[this.strongNameMap[i]] = s.nextSibling.textContent;
    }

    result.assignmentName = this.getAssignmentName();
    result.assignmentLink = this.getAssignmentLink();
    return result;
  }
}