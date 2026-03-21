//javascript for library-project



class Book {
    constructor (author, title, numPages, readStatus) {
    if (!new.target) {
        throw Error('Must be called with new');
    }

    this.uniqueID = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.readStatus = readStatus;
}
}

class Library {

    constructor () {
        this.myLibrary = [];
        this.form = document.getElementById('book-form');
        this.tableBody = document.getElementById('table-body');
        this.dialog = document.getElementById('my-dialog');
        this.init();

    }

init () {
    this.form.addEventListener("submit", (event) => {

event.preventDefault();

const author = document.getElementById('author').value;
const title = document.getElementById('title').value;
const numPages = parseInt(document.getElementById('numPages').value);
const readStatus = document.getElementById('readStatus').checked;

this.addBookToLibrary(author, title, numPages, readStatus);
this.form.reset();

this.displayLibrary();

//close the dialog after submission

this.dialog.close();

});
}



addBookToLibrary (author, title, numPages, readStatus) {
   const newBook = new Book(author,title,numPages,readStatus);
    this.myLibrary.push(newBook);
}



displayLibrary () {
    
    
    this.tableBody.innerHTML= '';

    this.myLibrary.forEach((book) => {
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
        readStatusCheckbox.addEventListener('change', () => {
            this.readStatusCheckboxFn(book.uniqueID, readStatusCheckbox.checked);

        });

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete book";

        deleteButton.addEventListener('click', () => {
            this.deleteBook(book.uniqueID);
        });

    

        row.appendChild(uniqueIDCell);
        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(numPagesCell);
        row.appendChild(readStatusCell);
        readStatusCell.appendChild(readStatusCheckbox);
        row.appendChild(deleteCell);
        deleteCell.appendChild(deleteButton);
        

        this.tableBody.appendChild(row);

    });
}

deleteBook (uniqueID) {
    this.myLibrary = this.myLibrary.filter(book => book.uniqueID !== uniqueID);
    this.displayLibrary();
}
    
readStatusCheckboxFn (uniqueID, newStatus) {
    const book = this.myLibrary.find(book => book.uniqueID === uniqueID);
    if (book) {
        book.readStatus = newStatus;
        this.displayLibrary();
    }

}


}

const library = new Library();