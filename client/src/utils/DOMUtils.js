module.exports = {
  // Creates a fake link and downloads it from it (better than iframe / pop-up)
  download: function (url) {
    let link = document.createElement('a');
    link.href = url;
    if ('MouseEvent' in window) {
      let event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      link.dispatchEvent(event);
    } else {
      // fall back to pop up
      window.open(url, '_blank');
    }
  }
};
