window.addEventListener("load", function () {
    let ids = [
        "normal",
        "markdown",
        "pukiwiki",
        "html"
    ];

    for (let i = 0; i < ids.length; i++) {
        document.querySelector("#" + ids[i]).addEventListener("click", (e) => {
            copy(ids[i]);
        });
    }

    function copy(paramId) {
        try {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                let buff = "";
                if (paramId == "normal") {
                    buff = tabs[0].title + "\r\n" + tabs[0].url;
                } else if (paramId == "markdown") {
                    buff = "[" + tabs[0].title + "](" + tabs[0].url + ")";
                } else if (paramId == "pukiwiki") {
                    buff = "[[" + tabs[0].title + ":" + tabs[0].url + "]]";
                } else if (paramId == "html") {
                    buff = "<a href=\"" + tabs[0].url + "\">" + tabs[0].title + "</a>";
                }

                navigator.clipboard.writeText(buff);

                window.close();
            });
        } catch (error) {
            document.querySelector("#message").textContent = error.message;
        }
    }

});