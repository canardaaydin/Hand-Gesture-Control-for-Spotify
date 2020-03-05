console = chrome.extension.getBackgroundPage().console;
chrome.tabs.onUpdated.addListener(function() {
  (chrome.tabs).forEach(element => {
    if ((element.url).includes("localhost")){
      console.log(element.url);
    }
  });
});