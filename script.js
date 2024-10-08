//Declaraciones de variables a utilizar
const dialog = document.getElementById("bookAdder");
const addButton = document.getElementById("addBook");
const submitButton = document.getElementById("submitButton");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const haveReadIt = document.getElementById("haveReadIt");
const library = document.getElementById("library");
const header = document.getElementsByTagName("header")[0];
const main = document.getElementsByTagName("main")[0];
const footer = document.getElementsByTagName("footer")[0];
const bookList = [];
let bookSize = 0;

//Eventos
addButton.addEventListener("click", (event) => {
    library.appendChild(dialog);
    dialog.show();
    console.log(bookSize);
    console.log(bookList);
    header.style.backgroundColor = "rgba(162, 174, 216, 0.5)";
    main.style.backgroundColor = "rgba(162, 220, 158, 0.5)";
    footer.style.backgroundColor = "rgba(162, 235, 215, 0.5)";
    event.stopPropagation();
});

document.addEventListener("click", (event) => {
    if(dialog.open){
        const x = event.clientX;
        const y = event.clientY;
        const rect = dialog.getBoundingClientRect();
        if(x < rect.left || x > rect.right || y < rect.bottom || y > rect.top){
            dialog.close();
            library.removeChild(dialog); 
            restoreBackground();
        }
    }
});

dialog.addEventListener("click", (event) => {
    event.stopPropagation();
})

dialog.addEventListener("close", () => {
    title.value = "";
    author.value = "";
    pages.value = "";
    document.getElementById('titleError').textContent = '';
    document.getElementById('authorError').textContent = '';
    document.getElementById('pagesError').textContent = '';
    haveReadIt.checked = false;
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById('titleError').textContent = '';
    document.getElementById('authorError').textContent = '';
    document.getElementById('pagesError').textContent = '';
    let valid = true;
    if (title.value.trim() === '') {
        document.getElementById('titleError').textContent = 'Title is required.';
        valid = false;
    }

    if (author.value.trim() === '') {
        document.getElementById('authorError').textContent = 'Author is required.';
        valid = false;
    }

    if (pages.value.trim() === '') {
        document.getElementById('pagesError').textContent = 'Pages are required.';
        valid = false;
    }
    if(valid) createBook();
});

//Funciones
function Book(title, author, pages, haveReadIt){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveReadIt = haveReadIt;
}

function createElements(index){
    const myElements = [];
    const divBook = document.createElement("div");
    const h3Tittle = document.createElement("h3");
    const h3Author = document.createElement("h3");
    const h3Pages = document.createElement("h3");
    const readButton = document.createElement("button");
    readButton.setAttribute("index", index);
    readButton.addEventListener("click",toggleButton);
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute('index', index); 
    removeButton.addEventListener("click",removeBook); 
    myElements.push(divBook); myElements.push(h3Tittle);
    myElements.push(h3Author); myElements.push(h3Pages);
    myElements.push(readButton); myElements.push(removeButton);
    return myElements;
}

function addElements(bookElements){
    library.appendChild(bookElements[0]);
    for(let i = 1; i < bookElements.length; i ++){
        bookElements[0].appendChild(bookElements[i]);
    }
}

function styleElements(bookElements){
    bookElements[0].classList.add("my-container-book");
    bookElements[1].classList.add("my-book");
    bookElements[2].classList.add("my-book");
    bookElements[3].classList.add("my-book");
    bookElements[5].classList.add("my-remove-button-book");
}

function textReadButton(readIt, readItButton){
    if(readIt){
        readItButton.textContent = "Read";
        readItButton.classList.remove("my-not-read-it-button-book");
        readItButton.classList.add("my-read-it-button-book");
    }
    else{
        readItButton.textContent = "Not read";
        readItButton.classList.remove("my-read-it-button-book")
        readItButton.classList.add("my-not-read-it-button-book");
    }
}

function restoreBackground(){
    header.style.backgroundColor = "rgba(105, 220, 158, 0.7)";
    main.style.backgroundColor = "rgb(196, 174, 216)";
    footer.style.backgroundColor = "antiquewhite";
}

function removeBook(event){
    const index = event.target.getAttribute('index');
    bookList.splice(index,1);
    bookSize -= 1;
    updateLibraryDisplay();
}

function updateLibraryDisplay(){
    const bookElements = library.querySelectorAll('.my-container-book');
    bookElements.forEach(element => element.remove());
    bookList.forEach((book, index) => {
        const bookElements = createElements(index);
        textReadButton(book.haveReadIt, bookElements[4]);
        addTextContent(bookElements, book);
        styleElements(bookElements);
        addElements(bookElements);
    });
}

function toggleButton(event){
    const index = event.target.getAttribute("index");
    const book = bookList[index];
    book.haveReadIt = !book.haveReadIt;
    textReadButton(book.haveReadIt, event.target);
}

function addTextContent(bookElements, book){
    bookElements[1].textContent = `${book.title}`;
    bookElements[2].textContent = `${book.author}`;
    bookElements[3].textContent = `${book.pages} pages`;
}

function createBook(){
    const book = new Book(title.value, author.value, pages.value, haveReadIt.checked);
    bookList.push(book);
    const index = bookSize;
    bookSize += 1;
    const bookElements = createElements(index);
    textReadButton(haveReadIt.checked, bookElements[4]);
    addTextContent(bookElements, book);
    styleElements(bookElements);
    addElements(bookElements);
    restoreBackground();
    dialog.close();
    library.removeChild(dialog); 
}