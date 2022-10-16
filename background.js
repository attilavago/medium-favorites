chrome.runtime.onInstalled.addListener((details) => {
    chrome.contextMenus.create({
        title: "Add Author To Medium Favorites",
        id: "add_author_context",
        contexts: ["page", "selection", "image", "link"]
    });

    let authorImage;
    let authorName;

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.authorImage !== "" && request.authorName !== "")
                authorImage = request.authorImage;
                authorName = request.authorName;
        }
    );

    let authorsList;

    chrome.storage.sync.set({
        authors: []
    });
    chrome.storage.sync.get(["authors"], (result) => {
        console.log(result.authors);
        authorsList = result.authors;
    })
    chrome.contextMenus.onClicked.addListener((event) => {
        console.log(event);
        console.log(authorsList);
        chrome.storage.sync.get(["authors"], (result) => {
            console.log(result.authors);
            authorsList = result.authors;
            authorsList.push({name: authorName, url: event.linkUrl, profileImg: authorImage})
            chrome.storage.sync.set({
                authors: authorsList
            }, () => {
                chrome.storage.sync.get(["authors"], (result) => {
                    console.log(result);
                })
            })
        })

    })
})

console.log("background script running");