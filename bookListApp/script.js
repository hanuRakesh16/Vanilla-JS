// Books
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI
class UI{
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
      
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') == null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBooks(isbn){
        const books = Store.getBooks();
                books.forEach((book, index) => {
                    if(book.isbn == isbn){
                        books.splice(index, 1);
                    }
                });
                localStorage.setItem('books', JSON.stringify(books));
    }
}


// Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Add Books
document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill all details', 'danger');
    }else {
        const book = new Book(title, author, isbn);
    
        //Add Books to UI
        UI.addBookToList(book);
        UI.showAlert('Book added to library', 'success');
        // Add Book to Library
        Store.addBooks(book);
        // clear Fields
        UI.clearFields();
    }
})

// Delete Books
document.getElementById('book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent); 
    UI.showAlert('Book deleted from library','success');
    // console.log(e.target)
});