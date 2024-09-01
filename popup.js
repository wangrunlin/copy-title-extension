document.getElementById('copyBtn').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const title = tabs[0].title;
    navigator.clipboard.writeText(title).then(() => {
      alert('Title copied: ' + title);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });
});
