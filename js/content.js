const loc = location.href || '';
const isNinova = loc.includes('ninova.itu.edu.tr') && loc.endsWith('Odevler');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  var domInfo = {
    document: '',
    isNinova: false
  };

  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    domInfo = {
      document: document.documentElement.innerHTML,
      isNinova: isNinova
    };
  }
  // Return the sender with the callback.
  response(domInfo);
});