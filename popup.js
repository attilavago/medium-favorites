const authorsListElement = document.getElementById("authorsList");

const addToAuthors = (author) => {
    let li = document.createElement('li');
    let link = document.createElement('a');
    link.href = author.url;
    link.textContent = author.name;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    li.appendChild(link);
    authorsListElement.appendChild(li);
}

chrome.storage.sync.get(["authors"], (result) => {
    console.log(result);
    result.authors.forEach(addToAuthors);
})

