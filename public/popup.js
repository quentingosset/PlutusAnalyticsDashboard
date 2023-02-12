(async () => {

    let tab;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        tab = tabs[0];
        if(tab.url !== undefined && tab.url.startsWith("https://dex.plutus.it/dashboard")){
            document.getElementById("ask").classList.remove("d-none");
        }else{
            document.getElementById("wrong").classList.remove("d-none");
            document.getElementById("ask").classList.add("d-none");
        }
    });
    let githubJson = await getgit("quentingosset","PlutusAnalyticsDashboard","version.json");

    if(chrome.runtime.getManifest().version !== githubJson.version){
        document.getElementById("versionStatus").classList.add("d-none");
        document.getElementById("version").innerHTML = `<span class="badge bg-red">New version available (${githubJson.version})</span>`;
    }else{
        document.getElementById("version").innerText = `V${githubJson.version}`;
    }
    try {
        document.getElementById("ask").onclick = function(e) {
            //e.preventDefault(); // Prevent submission
            console.log("ask");
            document.getElementById("id_token_loading").classList.remove("d-none");
            document.getElementById("refresh_token_loading").classList.remove("d-none");
            document.getElementById("footer_button").classList.add("d-none");
            document.getElementById("ask").classList.add("d-none");
            chrome.tabs.sendMessage(tab.id,"ask", (response) => {
                if(response.status === "SUCCESS"){
                    document.getElementById("id_token").value=response.id_token;
                    document.getElementById("refresh_token").value=response.refresh_token;
                    document.getElementById("id_token_loading").classList.add("d-none");
                    document.getElementById("id_token_form").classList.remove("d-none");
                    document.getElementById("refresh_token_loading").classList.add("d-none");
                    document.getElementById("refresh_token_form").classList.remove("d-none");
                    document.getElementById("footer_button").classList.remove("d-none");
                }
            });
            e.preventDefault();
        };

        document.getElementById("open").onclick = function(e) {
            e.preventDefault(); // Prevent submission
            chrome.tabs.create({"url":"index.html","active":true});
        };
        document.getElementById("clear").onclick = function(e) {
            e.preventDefault();
            console.log("clear");
            chrome.storage.local.clear();
        };
    } catch (erri) {
        console.error(`failed to execute script: ${erri}`);
    }

    function getgit (owner, repo, path) {
        let data = fetch (
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
        )
            .then (d => d.json ())
            .then (d =>
                fetch (
                    `https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`
                )
            )
            .then (d => d.json ())
            .then (d => JSON.parse (atob (d.content)));

        return data;
    }

})();
