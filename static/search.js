document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchtext").addEventListener("input", searchTextUpdated);
});

function searchTextUpdated(event) {
    // Array of word 'keys' - results must contain all of these
    let words = this.value.toLowerCase().split(" ");
    Array.from(document.getElementById("list").children).forEach( (li) => {
        //let linkText = li.firstElementChild.innerText;
        if (words.filter(word => !li.firstElementChild.innerText.toLowerCase().includes(word)).length > 0) {
            li.hidden = true;
        } else {
            li.hidden = false;
        }
    })
}