//javascript for library-project

const myLibrary = [];

function Book (author, title, numPages, readStatus) {
    if (!new.target) {
        throw Error('Must be called with new');
    }

    this.uniqueID = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.readStatus = readStatus;
}


function addBookToLibrary (author, title, numPages, readStatus) {
   const newBook = new Book(author,title,numPages,readStatus);
    myLibrary.push(newBook);
}

const form = document.getElementById('book-form');

form.addEventListener("submit", function(event) {

event.preventDefault();

const author = document.getElementById('author').value;
const title = document.getElementById('title').value;
const numPages = parseInt(document.getElementById('numPages').value);
const readStatus = document.getElementById('readStatus').checked;

addBookToLibrary(author, title, numPages, readStatus);
form.reset();

displayLibrary();

//close the dialog after submission
const dialog = document.getElementById('my-dialog');
dialog.close();

});

function displayLibrary() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML= '';

    myLibrary.forEach((book) => {
        const row = document.createElement('tr');

        const uniqueIDCell = document.createElement('td');
        uniqueIDCell.textContent = book.uniqueID;

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;

        const numPagesCell = document.createElement('td');
        numPagesCell.textContent = book.numPages;

        const readStatusCell = document.createElement('td');
        const readStatusCheckbox = document.createElement('input');
        readStatusCheckbox.type = 'checkbox';
        readStatusCheckbox.checked = book.readStatus;
        readStatusCheckbox.addEventListener('change', function() {
            readStatusCheckboxFn (book.uniqueID, readStatusCheckbox.checked);

        });

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete book";

        deleteButton.addEventListener('click', function() {
            deleteBook(book.uniqueID);
        });

    

        row.appendChild(uniqueIDCell);
        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(numPagesCell);
        row.appendChild(readStatusCell);
        readStatusCell.appendChild(readStatusCheckbox);
        row.appendChild(deleteCell);
        deleteCell.appendChild(deleteButton);
        

        tableBody.appendChild(row);

    });
}

function deleteBook(uniqueID) {
    const bookIndex = myLibrary.findIndex(book => book.uniqueID === uniqueID);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayLibrary();
    }
}

function readStatusCheckboxFn(uniqueID, newStatus) {
    const book = myLibrary.find(book => book.uniqueID === uniqueID);
    if (book) {
        book.readStatus = newStatus;
        displayLibrary();
    }

}
