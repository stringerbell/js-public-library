// TODO handle invalid parameters (no error handling anywhere yet)

function Library(){
    var shelves = [];

    // returns all Shelves in Library
    this.getShelves = function () {
        return shelves;
    };

    // adds a Shelf to the Library
    this.addShelf = function (name) {
        shelves.push(new Shelf(name));
        return shelves;
    };

    // return a specific Shelf by index
    this.getShelfByIndex = function (index) {
        return shelves[index];
    };

    // returns all books in library
    this.getAllBooks = function () {
        var shelves = this.getShelves();
        for (var shelfIndex in shelves) {
            return shelves[shelfIndex].getBooks();
        }
    };


}

function Shelf(name) {

    this.name = name;
    var books = [];
    this.getBooks = function () {
        return books;
    };

    this.addBook = function(attributes) {
        var books = this.getBooks();
        books.push(new Book(attributes));
        return books;
    };

    this.searchForBookByUniqueId = function (uniqueId) {
        var books = this.getBooks();
        var matches = [];
        for (var book in books) {
            if (uniqueId === books[book].uniqueId) {
                matches.push(book);
            }
        }
        return matches;
    };

    // TODO remove book by any type of attributes
    this.removeBookByUniqueId = function(uniqueId) {
        var indexOfBooksToRemove = this.searchForBookByUniqueId(uniqueId);

        // looping through and removing one book at a time, since index changes on each removal
        for (var index in indexOfBooksToRemove) {
            books.splice(indexOfBooksToRemove[0], 1);
            indexOfBooksToRemove = this.searchForBookByUniqueId(uniqueId);
        }
        return true;
    };

    this.getBookByIndex = function(index) {
        return books[index];
    };
}

function Book(attributes) {

    for (var property in attributes) {
        this[property] = attributes[property];
    }

    this.getAllAttributes = function() {
        return attributes;
    }

    this.getAttribute = function (attribute) {
        return this.attribute;
    };

    // shelves a book in a library on a shelf by index.
    // Won't check for correct types of params.
    this.enshelf = function (library, shelfIndex) {
        var shelf = library.getShelfByIndex(shelfIndex);
        shelf.addBook(attributes);
        return shelf.getBooks();
    };

    this.unshelf = function (library, shelfIndex) {
        var shelf = library.getShelfByIndex(shelfIndex);
        shelf.removeBookByUniqueId(this.uniqueId);
        return shelf.getBooks();
    };

}

var library = new Library();

library.addShelf('Fiction');

library.addShelf('Non Fiction');

var book = new Book({
    author: 'J.K. Rowling',
    title: 'Harry Potter and The Sorcerer\'s Stone',
    uniqueId: 'uniqueIdForFirstCopyOfHarryPotter'
    });

book.enshelf(library, 0);

book.getAllAttributes();

//var anotherBook = new Book('JRR Tolkien', 'Lord Of The Rings', 'lib-1-LOTR-uniqueId');
//anotherBook.enshelf(library, 0);

//var nonFictionBook = new Book('Laura Hillenbrand', 'Unbroken', 'lib-1-U-uniqueId');
//nonFictionBook.enshelf(library, 1);

library.getAllBooks();
//anotherBook.unshelf(library, 0);
