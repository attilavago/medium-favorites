console.log("hello from Medium");



document.addEventListener("contextmenu", function(e) {
    console.log("You clicked this element:", e.target.parentNode.querySelectorAll('img')[0].currentSrc);
    chrome.runtime.sendMessage({
        authorImage: e.target.parentNode.querySelectorAll('img')[0].currentSrc,
        authorName: e.target.parentNode.querySelectorAll('img')[0].alt
    });
});