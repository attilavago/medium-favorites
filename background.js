chrome.runtime.onInstalled.addListener((details) => {
    chrome.contextMenus.create({
        title: "Add Author To Medium Favorites",
        id: "add_author_context",
        contexts: ["page", "selection", "image", "link"]
    });

    let authorsList;

    chrome.storage.sync.set({
        authors: []
    });
    chrome.storage.sync.get(["authors"], (result) => {
        console.log(result);
        authorsList = result.authors;
    })
    chrome.contextMenus.onClicked.addListener((event) => {
        console.log(event);
        console.log(authorsList);
        authorsList.push({name: event.selectionText, url: event.linkUrl})
        chrome.storage.sync.set({
            authors: authorsList
        }, () => {
            chrome.storage.sync.get(["authors"], (result) => {
                console.log(result);
            })
        })
    })
})

console.log("background script running");