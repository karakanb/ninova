export default class {
  static _empty(o) {
    return Object.keys(o).length === 0 && o.constructor === Object
  }

  static dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2)
  }

  static replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  static random(len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    var str = Array.from(arr, this.dec2hex).join('');
    str = this.replaceAll(str, '_', '');
    return str;
  }
}