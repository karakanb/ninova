// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

    // Perform an 'isNinova' check to prevent script from executing and failing.
    const loc = location.href;
    var domInfo = {
      document: document.documentElement.innerHTML,
      isNinova: loc.includes('ninova.itu.edu.tr') && loc.endsWith('Odevler')
    };

    // Return the sender with the callback.
    response(domInfo);
  }
});