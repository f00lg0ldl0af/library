// Header DOM elements 

export const userIn = document.getElementById('sign-in');
export const userOut = document.getElementById('sign-out');

export const userState = document.getElementById('username');

export const profileImg = document.getElementById('profileimg')

export const overlay = document.getElementById('overlay');

export const error_msg = document.getElementById('errorTitle');


// Input Fields

export const title_input = document.getElementById('title');
export const author_input = document.getElementById('author');
// mySelectedItems for genres
export const read_pg_input = document.getElementById('pgRead'); 
//!!!
export const book_length_input = document.getElementById('totalPg');
export const book_progress_input = document.getElementById('myBar');
export const last_read_input = document.getElementById('lastRead');
export const read_status_input = document.getElementById('isRead');

export const rating_input = document.getElementById('starRating');
export const stars = document.querySelectorAll(".stars i");



// Btns

export const userBtn = document.getElementById('userBtn');
export const signInBtn = document.getElementById('signInBtn');
export const signOutBtn = document.getElementById('signOutBtn');

export const addBookBtn = document.getElementById('addBookBtn');
export const clearAllBtn = document.getElementById('clearAllBtn');

export const progressBtn = document.getElementById('chkProgressBtn');
export const saveBookBtn = document.getElementById('saveBookBtn');
export const editBookBtn = document.getElementById('editBookBtn');

// Modals
export const accModal = document.getElementById('accModal')
export const bookModal = document.getElementById('bookModal');
export const bookForm = document.getElementById('bookForm');
export const acBookModal = document.getElementById('acBookModal');

// Book Grid
export const booksGrid = document.getElementById('booksGrid');

// Forms
const bookRating = document.getElementById('bookRating');

export const showUserOptions = (user) => {
    if (user) {
      userIn.classList.add('active');
      userOut.classList.remove('active');
    } else {
      userIn.classList.remove('active');
      userOut.classList.add('active');
    }
}


export const showLoginState = (user) => {
    userState.innerHTML = `${user.displayName}`;
}

export const showProfileImg = (user) => {
  profileImg.src = `${user.photoURL}`;
}

