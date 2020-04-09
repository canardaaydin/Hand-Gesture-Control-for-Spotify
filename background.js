
chrome.webNavigation.onCompleted.addListener(function() {
    //alert(url);

    var queryInfo = {
        active: true, 
        currentWindow: true
      };
    
    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0]; 
        var url = tab.url;
        var starting_index = url.indexOf('=') + 1;
        var ending_index = url.indexOf('&') ;
        var auth_code = url.slice(starting_index,ending_index)

    chrome.storage.sync.set({code: auth_code}, function() {
            console.log('Value is set to ' + auth_code);
            alert(url);
          });
      });

    // chrome.storage.sync.get(['code'], function(result) {
    //     console.log('Value currently is ' + result.code);
    //   });
    

}, {url: [{hostContains : 'barda.life', queryContains : '?code='}]}
);
