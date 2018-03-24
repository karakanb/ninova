export default class {

  constructor(document) {
    this.document = document;
  }

  get(prefixClass, iconName) {
    var i = this.document.createElement('i');
    i.classList.add(prefixClass);
    i.classList.add(iconName);
    return i;
  }

  solid(iconName) {
    return this.get('fas', 'fa-' + iconName);
  }

  regular(iconName) {
    return this.get('far', 'fa-' + iconName);
  }
}