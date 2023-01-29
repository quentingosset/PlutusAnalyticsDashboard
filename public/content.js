const tokensData = {
    refresh_token: null,
    id_token: null,
    expires_at: null,
    inactivity_timer: null,
    status: null,
};
let alreadyStarted = false;
console.log("injected");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message === "ask"){
        if(sendResponse !== undefined){
            if(!alreadyStarted){
                alreadyStarted = true;
                refreshLocalStorage();
            }
            sendResponse(tokensData);
        }
    }

})

function refreshLocalStorage() {
    console.log("Ask TokensData");
    tokensData.refresh_token = localStorage.getItem('refresh_token');
    tokensData.id_token = localStorage.getItem('id_token');
    tokensData.expires_at = localStorage.getItem('expires_at');
    tokensData.inactivity_timer = localStorage.getItem('inactivity_timer');
    tokensData.status = "SUCCESS";

    chrome.storage.local.set({"refresh_token": localStorage.getItem('refresh_token')});
    chrome.storage.local.set({"id_token": localStorage.getItem('id_token')});
    chrome.storage.local.set({"expires_at": localStorage.getItem('expires_at')});
    chrome.storage.local.set({"inactivity_timer": localStorage.getItem('inactivity_timer')});

    setTimeout(refreshLocalStorage, 20000);
}
