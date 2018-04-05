import BaseDomElement from "../Components/BaseDomElement.js";
import Random from "./Random.js";

export default class extends BaseDomElement {

  constructor(document) {
    super(document);
  }

  /**
   * Display a new toast for the given timeout.
   * @param {string} message 
   * @param {int} timeout 
   */
  make(message, timeout) {

    // Generate a random id to identify the toast div.
    const randomId = Random.random(20);

    // Get and clean the toast wrapper.
    const wrapper = this.document.getElementById('toast-wrapper');
    this.removeAllChildren(wrapper);

    // Construct the toast message.
    const messageDiv = this.newDiv('toast');
    messageDiv.textContent = message;
    messageDiv.id = randomId;

    // Append the toast to the wrapper.
    wrapper.appendChild(messageDiv)

    // Remove the toast after timout seconds.
    setTimeout(() => { this.removeItem(randomId); }, timeout * 1000);
  }
}