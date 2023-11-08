export class Book {
  constructor(
    title = '-',
    author = '-',
    genres = [],
    read_page = 0, // !!!
    book_length = 0,
    book_progress, /* % of book_length; how many pages read */
    last_read = 0, /* (current-date) - (date-of-input); how many days ago */
    read_status = false, /* to-read, reading, completed */
    rating = 0
  ) {
    this.title = title;
    this.author = author;
    this.genres = genres;

    this.read_page = read_page; // !!!
    this.book_length = book_length;
    this.book_progress = book_progress;

    this.last_read = last_read;

    this.read_status = read_status;
    this.rating = rating;
  }
}


export class Library {
  constructor() {
    this.books = []
  }

  // Check if new book is already in library 
  inLibrary(newBook) {
    const bookInLib = (book) => book.title === newBook.title;
    return this.books.some(bookInLib); // either true or false
  }

  // Store new book object into library
  addBookToLib(newBook) {
    if (!this.inLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  // Remove book object from library
  removeBookFromLib(title) {
    const remainingBook = (book => book.title !== title)
    this.books = this.books.filter(remainingBook);
  }
  
  // Get book object from library
  getBookFromLib(title) {
    return this.books.find((book) => book.title === title);
  }

  clearAllFromLib() {
    this.books = []
  }
}

// Firestore data converter
const bookConverter = {
  toFirestore: (book) => {
    return {
      title: book.title,
      author: book.author,
      genres: book.genres,
      book_length: book.book_length,
      book_progress: book.book_progress,
      last_read: book.last_read,
      read_status: book.read_status,
      rating: book.rating,
    };
  },
  fromFirestore: (booksnapshot, options) => {
    // .data() retrieves the content of the document 
    const data = booksnapshot.data(options);
    return new Book(
      data.title,
      data.author,
      data.genres,
      data.book_length,
      data.book_progess,
      data.last_read,
      data.read_status,
      data.rating,
    );
  }
}

















