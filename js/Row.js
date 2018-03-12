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

  parse() {
    var result = {};
    var strongs = this.getStrongs();
    console.log(strongs);
    
    for (var i = 0; i < 4; i++) {
      var s = strongs[i];
      result[this.strongNameMap[i]] = s.nextSibling.textContent;
    }
    return result;
  }
}