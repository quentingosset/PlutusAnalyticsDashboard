chrome.action.onClicked.addListener(tab => {
    chrome.tabs.sendMessage(tab.id,"init");
    chrome.tabs.create({"url":"index.html","active":false});
});
