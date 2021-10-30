chrome.action.onClicked.addListener(function(tab) {
    var url = 'html/index.html';
    chrome.tabs.create({
        url: url
    });
});
