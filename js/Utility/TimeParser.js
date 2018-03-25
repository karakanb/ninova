export default class {

  /**
   * 
   * @param {string} timeString 
   */
  constructor(timeString) {
    this.months = [
      "ocak",
      "şubat",
      "mart",
      "nisan",
      "mayıs",
      "haziran",
      "temmuz",
      "ağustos",
      "eylül",
      "ekim",
      "kasım",
      "aralık",
    ]

    this.dateInstance = new Date();
    this.timeString = timeString;
    this.parse();
  }

  /**
   * Parse a given Turkish date string.
   * A sample format is: 04 Şubat 2018 00:00
   */
  parse() {
    // Parse the given date string.
    let day, rawMonth, year, rawTime, hours, minutes;
    [day, rawMonth, year, rawTime] = this.timeString.split(" ");
    [hours, minutes] = rawTime.split(":");

    // Fill in the date instance.
    this.dateInstance.setDate(day);
    this.dateInstance.setMonth(this.months.indexOf(rawMonth.toLowerCase()));
    this.dateInstance.setFullYear(year);
    this.dateInstance.setHours(hours);
    this.dateInstance.setMinutes(minutes);
    this.dateInstance.setSeconds(0);
  }

  toTimestamp() {
    return this.dateInstance.getTime();
  }

  getDateInstance() {
    return this.dateInstance;
  }
}