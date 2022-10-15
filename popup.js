const authorsListElement = document.getElementById("authorsList");

const addToAuthors = (author) => {
    let li = document.createElement('li');
    let link = document.createElement('a');
    let image = document.createElement('img');
    let authorName = document.createElement('p');
    image.src = author.profileImg;
    image.alt = author.name;
    authorName.textContent = author.name;
    link.href = author.url;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    link.appendChild(image);
    link.appendChild(authorName);
    li.appendChild(link);
    authorsListElement.appendChild(li);
}

chrome.storage.sync.get(["authors"], (result) => {
    console.log(result);
    result.authors.forEach(addToAuthors);
})

