
chrome.webNavigation.onCompleted.addListener(function() {
    //alert(url);

    var queryInfo = {
        active: true, 
        currentWindow: true
      };
    
    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0]; 
        var url = tab.url;
        
    chrome.storage.sync.set({code: url}, function() {
            console.log('Value is set to ' + url);
          });
      });

    // chrome.storage.sync.get(['code'], function(result) {
    //     console.log('Value currently is ' + result.code);
    //   });
    

}, {url: [{hostContains : 'barda.life', queryContains : '?code='}]}
);
