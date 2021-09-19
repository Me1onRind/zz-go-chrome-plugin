chrome.browserAction.onClicked.addListener(function(activeTab) {
    var url = 'html/index.html';
    chrome.tabs.create({
        url: url
    });
});
