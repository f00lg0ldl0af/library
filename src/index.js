import { Book } from "./classes.js";
import { Library } from "./classes.js";

import {
    // DOM elements
    userIn,
    userOut,
    userState,
    profileImg,
    overlay,

    error_title,
    error_author,
    error_readpg,
    error_booklength,

    accModal,
    acBookModal,
    addform_subhead1,

    // Button
    userBtn,
    signInBtn,
    signOutBtn,
    addBookBtn,
    clearAllBtn,

    progressBtn,
    saveBookBtn,
    editBookBtn,

    bookModal,
    bookForm,

    booksGrid,

    // Functions
    showUserOptions,
    showLoginState,
    showProfileImg,

    // Field inputs
    title_input,
    author_input,
    read_pg_input, 
    book_length_input,
    book_progress_input,
    last_read_input,
    read_status_input,
    rating_input,
    stars,
} from './ui.js'


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
// https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js
// firebase/app 

import { 
    getAuth,
    onAuthStateChanged, 
    signInWithPopup,
    signOut, 
    GoogleAuthProvider, 
    connectAuthEmulator
  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
  // firebase/auth

import { 
  getFirestore,
  doc,
  serverTimestamp,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  writeBatch, 
 } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js'
  
const app = initializeApp({
    apiKey: "AIzaSyBG-DJw7at4iVT9QroZT3F0IRNSpOBv-5A",
    authDomain: "library-485bd.firebaseapp.com",
    projectId: "library-485bd",
    storageBucket: "library-485bd.appspot.com",
    messagingSenderId: "297421141809",
    appId: "1:297421141809:web:47f47e5bedc2ef1ee6e210",
    databaseURL: "https://library-485bd-default-rtdb.asia-southeast1.firebasedatabase.app/",
});


// create references to firebase services
const auth = getAuth(app);
const db = getFirestore(app); 

const userSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

const userSignOut = async () => {
    await signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        console.error("Error signing out: ", error)
      });;
}

const openBookModal = () => {
  addform_subhead1.classList.add('active');
  bookForm.reset();
  rating_input.innerHTML ='';
  let bar = document.getElementById('myBar');
  bar.innerHTML = "1% read";
  mySelectedGenres = []; 

  dropdownButton.innerText = mySelectedGenres.length > 0 ? mySelectedGenres.join(', ') : 'Select Book Genre(s)'; 

  bookModal.classList.add('moveup-animate');
  overlay.classList.add('active');
};

const closeBookModal = () => {
  bookForm.reset();
  bookModal.classList.remove('moveup-animate');
  overlay.classList.remove('active');
  saveBookBtn.classList.add('active');
  editBookBtn.classList.remove('active');
  const editModalTitle = document.getElementById('editModal');
  editModalTitle.textContent = ""
  // error msg
}

const openAccModal = () => {
  accModal.classList.add('moveup-animate');
  overlay.classList.add('active');
}

const closeAccModal = () => {
  accModal.classList.remove('moveup-animate');
  overlay.classList.remove('active');
}

userBtn.addEventListener('click', openAccModal)

// clear all books
const acBook = (e) => {
  e.preventDefault();

  console.log('acBook was called.')
  if (auth.currentUser) {
    // remove all the books from db
    deleteCollection (3);
  } else {
    // remove books from local storage
    lib.clearAllFromLib();

    saveLocalStore();
    updateBooksGrid();
  }
  closeAcBookModal()
}

const openAcBookModal = () => {
  acBookModal.classList.add('moveup-animate');
  overlay.classList.add('active');

  acBookModal.innerHTML = `
  <div class="acbook-header">
    <h2>Remove all Books</h2>
  </div>

  <div class="bookcard-details-one">
      <p>Are you sure you want to move all the books from your library?</p>
  </div>

  <div class="button-group">
      <button id="cancelBtn" class="btn">Cancel</button>
      <button id="cfmClearBtn" class="btn clearallbtn">Remove all</button>
  </div> 
  `
  const cancelBtn = document.getElementById('cancelBtn');
  cancelBtn.addEventListener('click', closeAcBookModal);

  // Clear all books Function
  const acBookBtn = document.getElementById('cfmClearBtn');
  acBookBtn.addEventListener('click', acBook); 
}

const deleteCollection = async (batchSize) => {
  const q = query(
    booksCollection, // 1st constraint: query against a collection
    where('userId', '==', auth.currentUser.uid),
    limit(batchSize)
    );

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, q, resolve).catch(reject);
  });
}

const deleteQueryBatch = async (db, query, resolve) => {
  const snapshot = await getDocs(query);
  
  const batchSize = snapshot.size;
  if (batchSize === 0) {
    resolve();
    return;
  }
  // Delete document in a batch 
  const batch = writeBatch(db);

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // commit the batch 
  await batch.commit();

  /*
  // Recurse on next process tick, to avoid exploding the stack
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  })
  */}

const closeAcBookModal = () => {
  acBookModal.classList.remove('moveup-animate');
  overlay.classList.remove('active');
}

clearAllBtn.addEventListener('click', openAcBookModal)

const closeAllModals = () => {
  closeBookModal();
  closeAccModal()
  closeAcBookModal();
}

const setAccModal = (user) => {
  if (user) {
    user.providerData.forEach((profile) => {
      accModal.innerHTML = `

      <div class="accModalCard">
        <div class="accModalLabel">Sign-in provider:</div> 
        <div>${profile.providerId}</div>
      </div>

      <div class="accModalCard">
        <div class="accModalLabel"> Logged in as: </div>
        <div>${profile.displayName} </div>
      </div>
      

      <div class="accModalCard">
        <div class="accModalLabel">Email:</div> 
        <div>${profile.email} </div>
      </div>
      `
    })
  } else {
    accModal.innerHTML = '';
  }
}

overlay.addEventListener('click', closeAllModals)

const getBookProperties = () =>  {
  const title = title_input.value;
  const author = author_input.value;
  const genres = mySelectedGenres; // this is an array
  const read_page = read_pg_input.value; 
  const book_length = book_length_input.value;
  const book_progress = book_progress_input.innerHTML;
  const last_read = last_read_input.value; // e.g., 2023-11-07
  const read_status = read_status_input.checked;
  const rating = rating_input.innerHTML;

  // create new Book
  return new Book(
    title, 
    author,
    genres,
    read_page,
    book_length,
    book_progress,
    last_read,
    read_status,
    rating);
}

const updateBooksGrid = () => {
  console.log('updateBooksGrid was called');
  // reset booksGrid
  booksGrid.innerHTML = ''

  lib.books.forEach((bk) => {
    createBookCard(bk);
  }); 
}

// Create collection in firestore
const booksCollection = collection(db, 'books');

const lib = new Library();

// Save new book when 'save' button is clicked
const addNewBook = (e) => {
  e.preventDefault();
  // create new book
  const newBook = getBookProperties();

  // Check if book is already in library; prevent duplicates
  if (lib.inLibrary(newBook)) {
    error_title.textContent = 'Book is already saved in your library';
    error_title.classList.add('active');
    return;
  } 

  // Required fields 
  if (newBook.title === '') {
    error_title.textContent = 'Required';
    error_title.classList.add('active');
    return
  } else {
    error_title.textContent = '';
    error_title.classList.remove('active');
  }

  if (newBook.author === '') {
    error_author.textContent = 'Required';
    error_author.classList.add('active');
    return
  } else {
    error_author.textContent = '';
    error_author.classList.remove('active');
  }

  if (newBook.read_page === '') {
    error_readpg.textContent = 'Required'; 
    error_readpg.classList.add('active');
    return
  } else if (isNaN(newBook.read_page)) {
    error_readpg.textContent = 'Invalid'; 
    error_readpg.classList.add('active');
    return
  }
  else {
    error_readpg.textContent = '';
    error_readpg.classList.remove('active');
  }

  if (newBook.book_length === '') {
    error_booklength.textContent = 'Required'; //
    error_booklength.classList.add('active');
    return
  } else if (isNaN(newBook.book_length)) {
    error_booklength.textContent = 'Invalid'; 
    error_booklength.classList.add('active');
    return
  } 
  else if (newBook.book_length < newBook.read_page) {
    error_booklength.textContent = 'Invalid'; 
    error_booklength.classList.add('active');
    return
  }
  else {
    error_booklength.textContent = '';
    error_booklength.classList.remove('active');
  }


  if (auth.currentUser) {
    // Add book into DB storage
    addBookDB(newBook);
    // updateBooksGrid() should not be here; books grid for user should be shown when user logged in
  } 
  else {
    // vs. add book into local storage
    lib.addBookToLib(newBook); // First, add book into library
    saveLocalStore() ;

    // iterate through lib.books and append each book card 
    updateBooksGrid();
  }
  // close book modal
  closeBookModal() 
}

const saveLocalStore = () => {
  localStorage.setItem('library', JSON.stringify(lib.books));
  //storage only supports storing and retrieving strings; setItem(keyName, keyValue)
}

// Listen to books/documents in real-time 
let listenerUnsubscribe; // disable listeners when not required anymore given network usage for users and database costs for developers

const listenBooksRealTime = (uid) => {
  console.log('listenBooksRealTime was called');
  // Create a query to grab in multiple documents
  const someBookQuery = query(
    booksCollection, // 1st constraint: query against a collection
    where('userId', '==', uid), // 2nd constraint: books added by certain user
    orderBy('createdAt'), 
  )
  // onSnapshot listener returns a function that you can call to unsubscribe from that listener
  // Pass in query reference and in listener callback, receive a query snapshot
  listenerUnsubscribe = onSnapshot(someBookQuery, (bookQuerySnapshot) => {
       // bookQuerySnapshot.docs() contains an array of documents returned by query 
      const allBooks = bookQuerySnapshot.docs;

      // Transform array of docs (with content as a map) into array of book objects
      lib.books = bookConverterFS(allBooks)
      updateBooksGrid();
  });
}

const bookConverterFS = (someBookArray) => {
  // pass document content, retrieved using .data() method, into book constructor
  return someBookArray.map((bk) => {
    return new Book (
      bk.data().title, 
      bk.data().author,
      bk.data().genres, 
      bk.data().read_page, 
      bk.data().book_length,
      bk.data().book_progress,
      bk.data().last_read,
      bk.data().read_status,
      bk.data().rating
    );
  })
}

const addBookDB = async (newBook) => {
  try {
    console.log('addBookDB was called');
    // addDoc needs a collection reference; returns a document ref
    const bookRef = await addDoc(booksCollection, {
      // key value pairs
      userId: auth.currentUser.uid,
      title: newBook.title,
      author: newBook.author,
      genres: newBook.genres,
      read_page: newBook.read_page, 
      book_length: newBook.book_length,
      book_progress: newBook.book_progress,
      last_read: newBook.last_read,
      read_status: newBook.read_status,
      rating: newBook.rating,
      createdAt: serverTimestamp(), // https://copyprogramming.com/howto/how-to-set-the-created-at-in-firebase
    });
    console.log("Book added with ID: ", bookRef.id);
    console.log(`Book was created at ${bookRef.path}`)
  } catch (error) {
    console.error("Error adding book: ", error);
  }
}

signInBtn.addEventListener('click', userSignIn);
signOutBtn.addEventListener('click', userSignOut);
addBookBtn.addEventListener('click', openBookModal);

saveBookBtn.classList.add('active');
editBookBtn.classList.remove('active');
saveBookBtn.addEventListener('click', addNewBook);

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    showUserOptions(user); // this doesn't appear if shifted below

    if (user) {
      console.log(user);
      showLoginState(user);
      showProfileImg(user);
      const uid = user.uid;

      listenBooksRealTime(uid);
    }
    else {    
      userState.innerHTML = `You're not logged in.`
      console.log('no user');
      // disable listener 
      if (listenerUnsubscribe) {listenerUnsubscribe();}
      // function to reset lib.books to books in localstorage
      resetLocalStore()
      updateBooksGrid();
    }
    setAccModal(user);
  })
}

const resetLocalStore = () => {
  // get JavaScript object from localStorage (i.e., stringified version of array of book objects)
  console.log(localStorage.getItem('library'));
  const libArrayObject = JSON.parse(localStorage.getItem('library'));
  
  // if not null, iterate over Javascript object and transform each element into Book object
  libArrayObject ? lib.books = libArrayObject.map((bookJSON) => bookConverterJSON(bookJSON)) : lib.books = [];
}

const bookConverterJSON = (bk) => {
  return new Book (
    bk.title, 
    bk.author,
    bk.genres, 
    bk.read_page,
    bk.book_length,
    bk.book_progress,
    bk.last_read,
    bk.read_status,
    bk.rating);
}

monitorAuthState();
 
 // Loop through the "stars" NodeList
 stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
     // Loop through the "stars" NodeList Again
     stars.forEach((star, index2) => {
      // Add "active" class to clicked star and stars with lower indexes, remove "active" class from stars with higher index
      (index1 >= index2) ? star.classList.add("active"): star.classList.remove("active"); });
      let star_count = 0;
      stars.forEach((star) => {
        if (star.classList.contains('active')) {
           star_count++;
        }
      })
      rating_input.innerHTML = `Rating: ${star_count}`;
  });  
 });

 
const dropdownButton = document.getElementById('multiSelectDropdown'); 
const dropdownMenu = document.querySelector('.dropdown-menu'); 
let mySelectedGenres = []; 

function handleCB(event) { 
    const checkbox = event.target; 
    if (checkbox.checked) { 
        mySelectedGenres.push(checkbox.value); 
    } else { 
      mySelectedGenres =  mySelectedGenres.filter((item) => item !== checkbox.value); 
    } 

    dropdownButton.innerText = mySelectedGenres.length > 0 ? mySelectedGenres.join(', ') : 'Select Book Genre(s)'; 
} 
dropdownMenu.addEventListener('change', handleCB); 


const returnDays = (a, b) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const createBookCard = (book) => {
  console.log('createBookCard was called');
  const bookCard = document.createElement('div');

  // include the styling and animation
  bookCard.classList.add('book-card', 'moveup-animate');

  // reflect how many days ago since last read
  const currentDate = new Date();
  console.log(currentDate)
  console.log(book.last_read)

  const numDaysAgo = returnDays(new Date(book.last_read), currentDate); // https://stackoverflow.com/questions/4929382/javascript-getfullyear-is-not-a-function

  // reflect the read_status
  if (book.read_status) 
  {
    book.reflect_status = 'Finished';
    // include flag (class) to reflect readBtn color
    book.update_status = 'success'
  } 
  else {
    book.reflect_status = 'In Progress';
    // include flag (class) to reflect readBtn color
    book.update_status = 'failure'
  }

  // include book attributes
  bookCard.innerHTML = `
  <div class="bookcard-header">
    <h2>${book.title}</h2>
    <h3>By ${book.author}</h3>
  </div>

  <div class="bookcard-details-one">
      <div>
          <div>Genres: ${book.genres}</div> 
          <div>Last Read: ${numDaysAgo} days ago</div> 
      </div>
      <div>
          <div>Total: ${book.book_length} pages</div> 
      </div>
  </div>

  <div class="bookcard-details-two">
      <div>${book.book_progress}</div>
      <button id="pgsBtn" class="btn progressBtn ${book.update_status}">${book.reflect_status}</button>

  </div>

  <div class="bookcard-ratings">
      <div>${book.rating}</div>
  </div>

  <div class="button-group">
      <button id="editBtn" class="btn">Edit</button>
      <button id="removeBtn" class="btn">Remove</button>
  </div>`;
  
  // Append bookCard to BooksGrid
  booksGrid.appendChild(bookCard);
  
  // if getElementID is used instead, this only works for pgsCardBtn in the first Book card 
  const pgsCardBtns = document.querySelectorAll('#pgsBtn');
  
  pgsCardBtns.forEach(btn => btn.addEventListener('click', toggleRead));

  // Edit Book Function
  const editBtns = document.querySelectorAll('#editBtn');
  editBtns.forEach(btn => btn.addEventListener('click', editBookForm));

  // Remove Book Function
  const removeBtns = document.querySelectorAll('#removeBtn');
  removeBtns.forEach(btn => btn.addEventListener('click', removeBook)); 
}

let prevBkTitle; 

const editBookForm = (e) => {
  e.preventDefault();
  console.log('editBookForm was called');
  // get book title
  const title = e.target.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.innerHTML;
  console.log(title);

  // retrieve book object with said book title 
  const book = lib.getBookFromLib(title);
  prevBkTitle = book.title;

  getPrevBookModal(book); 
}

const removeBook = (e) => {
  e.preventDefault();
  console.log('RemoveBook was called');
  // get book title
  const title = e.target.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.innerHTML;
  console.log(title);

   // if user is logged in
   if (auth.currentUser) {
    // update db by deleting book
    delBookDB(title)
  } else {
  // else remove book from library 
  lib.removeBookFromLib(title);
  saveLocalStore() ;
  // iterate through lib.books and append each book card 
  updateBooksGrid();
  } 
}

const delBookDB = async (title) => {
  // get book reference
  const bookRef = doc(db, 'books', await getBookIdDB(title));
  deleteDoc(bookRef);
}

const toggleRead = (e) => {
  e.preventDefault();
  console.log('ToggleRead was called');
  // get book title
  const title = e.target.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.innerHTML;
  console.log(title);
  
  // retrieve book object with said book title 
  const book = lib.getBookFromLib(title);

  // if user is logged in
  if (auth.currentUser) {
    // update db with the new 'read_status' data field
    updateToggleDB(book);
    
  } else {
  // else change the read_status manually
  book.read_status = !book.read_status;
  saveLocalStore() ;

  // iterate through lib.books and append each book card 
  updateBooksGrid();
  } 
}

// updateDoc(doc-ref, data to update)
const updateToggleDB = async (book) => {
  const data = {
    read_status: !book.read_status
  }
  // get book reference
  const bookRef = doc(db, 'books', await getBookIdDB(book.title));

  updateDoc(bookRef, data);
  console.log(book.read_status);
}

// get document reference
const getBookIdDB = async (title) => {
  const q = query(
    booksCollection, // 1st constraint: query against a collection
    where('userId', '==', auth.currentUser.uid), // 2nd constraint: books added by certain user
    where('title', '==', title))

  const bookSnapshot = await getDocs(q);
  // changes array (of 1 element) to String
  const bookId = bookSnapshot.docs.map((e) => e.id).join();
  console.log(bookId)
  return bookId;
}

const getPrevBookModal = (book) => {
  bookForm.reset();
  const editModalTitle = document.getElementById('editModal');
  addform_subhead1.classList.remove('active');

  editModalTitle.textContent = "Edit fields below."

  saveBookBtn.classList.remove('active');
  editBookBtn.classList.add('active');

  title_input.value = book.title;
  author_input.value = book.author;

  const arr = []
  mySelectedGenres = mySelectedGenres.concat(book.genres); 
  // make sure the inputs with those values are checked
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
    let i = 0;
    while (i < mySelectedGenres.length) 
    {
      if (checkbox.value == mySelectedGenres[i]) 
      { checkbox.checked = true; }
      i++;
    }
  })

  dropdownButton.innerText = mySelectedGenres.length > 0 ? mySelectedGenres.join(', ') : 'Select Book Genre(s)'; 

  read_pg_input.value = book.read_page; 
  book_length_input.value = book.book_length;
  book_progress_input.innerHTML = book.book_progress;
  
  last_read_input.value = book.last_read; // e.g., 2023-11-07
  read_status_input.checked = book.read_status;

  rating_input.innerHTML = book.rating;

  bookModal.classList.add('moveup-animate');
  overlay.classList.add('active');
};

const editBookDB = (e) => {
  console.log('editBookBtn is called')
  
  e.preventDefault();
  const newBook = getBookProperties();
  console.log(newBook)

  // if user is logged in
  if (auth.currentUser) {
    // update db by updating book
    updateBookDB(newBook, prevBkTitle);
  } else {
    // else update book in library 
    // remove first then create new book 
    lib.removeBookFromLib(prevBkTitle);
    lib.addBookToLib(newBook);
    saveLocalStore() ;
    // iterate through lib.books and append each book card 
    updateBooksGrid();
  }
  // close book modal
  closeBookModal()    
}

const updateBookDB = async (newBook, prevBkTitle) => {
  const data = {
    title: newBook.title,
    author: newBook.author,
    genres: newBook.genres,
    read_page: newBook.read_page, // !!!
    book_length: newBook.book_length,
    book_progress: newBook.book_progress,
    last_read: newBook.last_read,
    read_status: newBook.read_status,
    rating: newBook.rating
  }
  // get book reference
  const bookRef = doc(db, 'books', await getBookIdDB(prevBkTitle));

  updateDoc(bookRef, data);
}

editBookBtn.addEventListener('click', editBookDB);

// Read Progress
let i = 0;  
function move() {
  if (i == 0) {
    i = 1;
    let width = 1;

    let id = setInterval(frame, 10);
    let elem = document.getElementById('myBar');

    function frame() {

      let currentPg = document.getElementById('pgRead').value;
      let totalPg = document.getElementById('totalPg').value;
      let updateProgress = Math.round(currentPg / totalPg * 100);

      if (updateProgress > 0 && updateProgress != Infinity) {
        if (width >= updateProgress) {
          clearInterval(id); // cancels repeating action established by call to setInterval()
          i = 0;
        } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = `${width}% read`   
        }
      } else {
        elem.style.width = width + "%";
        elem.innerHTML = `${width} % read`   
      }
    }
  }
}

progressBtn.addEventListener('click', move) 
// callback: move vs calling the function directly: move()

