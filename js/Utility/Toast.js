import BaseDomElement from "../Components/BaseDomElement.js";
import Random from "./Random.js";

export default class extends BaseDomElement {

  constructor(document) {
    super(document);
  }

  /**
   * Display a new toast.
   * @param {string} message 
   * @param {int} timeout 
   */
  make(message, timeout) {
    const randomId = Random.random(20);
    console.log('generated random: ' + randomId);

    const wrapper = this.document.getElementById('toast-wrapper');
    this.removeAllChildren(wrapper);

    const messageDiv = this.newDiv('toast');
    messageDiv.textContent = message;
    messageDiv.id = randomId;

    wrapper.appendChild(messageDiv)

    setTimeout(() => {
      const item = this.document.getElementById(randomId);
      this.removeItem(randomId);
    }, timeout * 1000);
  }
}