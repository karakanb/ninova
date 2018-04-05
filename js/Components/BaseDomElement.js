import Icon from "./Icon.js";

export default class {
  constructor(document) {
    this.document = document;
    this.icon = new Icon(document);
    this.baseUrl = 'https://ninova.itu.edu.tr';
  }

  /**
   * Remove an item, specified by its ID.
   * @param {string} id 
   */
  removeItem(id) {
    const myNode = document.getElementById(id);
    myNode.parentElement.removeChild(myNode);
  }

  /**
   * Remove all children of the given HTML element.
   * @param {HTMLElement} item 
   */
  removeAllChildren(item) {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  }

  /**
   * Remove all children of the given HTML element.
   * @param {HTMLElement} item 
   */
  removeAllChildrenById(id) {
    const myNode = document.getElementById(id);    
    this.removeAllChildren(myNode);
  }

  /**
   * Creates a new div with the given class.
   * @param {string} itemClass 
   */
  newDiv(itemClass = '') {
    var div = this.document.createElement('div');
    div.classList.add(itemClass);
    return div;
  }

  /**
   * Creates a new button with the given class.
   * @param {string} itemClass 
   */
  newButton(itemClass = '') {
    var button = this.document.createElement('button');
    button.classList.add(itemClass);
    return button;
  }

  /**
   * Creates a new column with the given width.
   * @param {int} width 
   */
  newCol(width = 6) {
    var div = this.newDiv(`col-${width}`);
    return div;
  }

  /**
   * Creates a new link with the given class name, href and content values.
   * @param {string} className 
   * @param {string} href 
   * @param {string} content 
   */
  newLink(className, href, content) {
    var a = this.document.createElement('a');
    a.classList.add(className);
    a.href = this.baseUrl + href;
    a.textContent = content;

    return a;
  }

  /**
   * Creates a new div that truncates the contents if overflow occurs.
   * @param {string} content 
   */
  createTruncateDiv(content) {
    var div = this.newDiv('truncate');
    div.title = content;
    div.textContent = content;
    return div;
  }
}