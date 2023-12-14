# PROJECT LIBRARY

## Description
The mini web-based application (web-app) **Library** allows book lovers to save books they enjoyed reading and track their reading progress. You can use the website on your Windows or your Mac computer.
### Video Demo:  <URL HERE>

## Project files
- `index.html` file
This file contains the raw data (text, list, cards lists and buttons) the web-app is built out of. 
---
- `style.css` file
This file contains the stylesheet used to make the web-app look visually pleasing and modern. Library uses a minimalist dark design so that it is easier on the user's eyes.
---
- several JavaScript (js) files
    - `index.js`
    - `classes.js`
    - `ui.js`
Together, these js files adds a layer of interactivity to the web-app. They have been organised into separate files for dode maintainability and readability.

* `classes.js` contains the classes/templates for creating two kinds of objects crucial to our web-app, `Book` and `Library`. 
    *  To store and retrieve data of the books which users enjoyed reading, we will need to create `Book` object(s) whereby we can access its various properties (title, author etc.).

    * We will store our book objects into a simple array, which will be another `Library` object. The `Library` object contains methods, actions that can be performed on our `Book` objects. Be it, adding a new book; removing a current book; retrieving a current book; or clearing all books saved in the library.

    * Since the web-app will contain an arbitrary number of books that the user choose to save, manually typing out the contents of each `Book` object is not feasible. There needs to be a cleaner way to create our book objects, which brings us to classes. 

    * Hence, we will create a class called `Book`. 

    * Although we will only be using a single `Library` object in the current version, we will create a `Library` class to ensure code maintainability for any future improvements. 

* `ui.js` contains the different HTML elements that users can interact with. 

* `index.js` contains the code to
    * use the following FireBase services 
        * FireBase Authentication: authenticates users to the web-app
            * Knowing a user's identity allows our app to securely save user data in the cloud and provide the same personalised experience across all of the user's devices. 
            * I chose to use FireBase Authentication as it integrates tightly with other Firebase services and leverages industry standards like Oauth 2.0 and OpenID Connect.
            * In this current version, I have decided to go with the Firebase Authentication SDK for more control over the sign-in experience. 
            * I decided to integrate with one of the most common federated identity providers, allowing users to sign in with their Google accounts. Future improvements would include more sign-in methods like email addresses and passwords, phone numbers, and other federated identity providers like Facebook, Twitter, and GitHub.

        * Cloud Firestore: to store, sync and secure user data  
            * I chose to use the Cloud Firestore data model as it supports flexible, hierarchical data structures which can be efficiently queried against. Query performance is proportional to the size of the user result set, not data set. 
            * Cloud Firestore Security Rules also handles serverless authentication, authorisation and data validation, alongside FireBase Authentication. Basically, for any client requests involving documents, Cloud Firestore is going to look for the security rules that apply to this document, then run a set of tests (rules specified) to determine if this request is allowed. 

    * make the site more interactive
        * Sidebar menu with clickable buttons for user to sign in /out of their Google account, and see their account details.
        * Users can choose to save their data in the cloud (if signed in) or locally, across browser sessions, with the window interface's localStorage property.
        * Main menu with 'Add Book' button that brings up a form allowing users to input the details for the new book. 
            * The form has an interactive star rating system and a reading progress bar.
        * Once the user saves a book, the book will be displayed as a card on the web-app. 
        * On each book’s display, there are some buttons where user can
            * remove the book from the library.
            * toggle the book's read status between "Finished" and "In Progress".
            * edit previously filled-in book details.
        * To save the user the hassle of removing each book manually from the library, there is 'Clear All' button on the main menu.
---
- jpeg file(s) in  `images` folder for web-app icons 
* 

<br>

## Try it Out
[Live Demo](https://f00lg0ldl0af.github.io/library/) :point_left:

Else, run the application on your local machine by:
1. Clone this repository with `git clone https://github.com/f00lg0ldl0af/library.git` or download it as a `.zip` file and extract it to your desired folder.

2. Navigate to where the repository is saved and open the `index.html` file on your desired web browser.

<br> 

## Features
- You can choose to log in with your gmail account or remain logged out.
- If you remain logged out, data will be saved to to your local storage across browser sessions. Else, data will be saved to a realtime database.
- To save a new book to your library, click the 'Add Book' button. 
- A book form will appear, where you can fill in details relevant to the particular book.
- Once you have saved the book details by clicking the 'Save' button, a bookcard, containing details you have filled in, will appear.
- To edit the details of books saved previously, click the 'Edit' button on the bookcard.
- To remove any book(s) from your library too, click the 'Remove' button on the bookcard.
- If you like to clear all books from your library, click the 'Clear All' button at the navigation bar.

<br>


## What I learned 
- Window's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) property
- Authenticate users with [FireBase](https://firebase.google.com/docs/auth/)
- Create and manage databases to store user data with [FireStore](https://firebase.google.com/docs/firestore/manage-databases)
- Create objects' classes and methods
- Interactive UI form elements 
<br>

## Built With
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)   
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)   
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

<br>

## Acknowledgements
* [The Odin Project](https://www.theodinproject.com/)
* [Flaticon](https://www.flaticon.com/authors/inkubators)
* [michalosman](https://github.com/michalosman/library/tree/main)
* [0xabdulkhalid](https://github.com/0xabdulkhalid/plibrary/tree/main)
* [Igorashs](https://github.com/igorashs/library/tree/master)
* [tailwindcss](https://tailwindcss.com/)
<br>

### To-Dos
