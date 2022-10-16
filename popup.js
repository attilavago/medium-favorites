const authorsListElement = document.getElementById("authorsList");

const addToAuthors = (author) => {
    let li = document.createElement('li');
    let link = document.createElement('a');
    let image = document.createElement('img');
    let authorName = document.createElement('p');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', function(event){
            authorIndexSearchText = event.target.parentNode.querySelector('p').textContent;
            chrome.storage.sync.get(["authors"], (result) => {
                console.log(result);
                const authorIndex = result.authors.findIndex((author) => author.name == authorIndexSearchText)
                console.log(authorIndex);
                result.authors.splice(authorIndex, 1);
                chrome.storage.sync.set({
                    authors: result.authors
                }, () => {
                    event.target.parentNode.remove();
                });
            })
        }, false);
    image.src = author.profileImg;
    image.alt = author.name;
    authorName.textContent = author.name;
    link.href = author.url;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    link.appendChild(image);
    link.appendChild(authorName);
    li.appendChild(link);
    li.appendChild(deleteButton);
    authorsListElement.appendChild(li);
}

chrome.storage.sync.get(["authors"], (result) => {
    console.log(result);
    result.authors.forEach(addToAuthors);
})

