// index.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'; //importing the initializeApp function from the firebase-app module
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'; //importing the getDatabase, ref and push functions from the firebase-database module

const appSettings = {
    databaseURL: 'https://to-do-app-e93dd-default-rtdb.asia-southeast1.firebasedatabase.app/', //database URL
};

const app = initializeApp(appSettings); //initializing the app
const db = getDatabase(app); //getting the database
const dbRef = ref(db, 'items'); //referencing the database

let ip = document.getElementById('user_ip');
let but = document.getElementById('submit_button');
let list = document.getElementById('list');

function clearInputField() {
    ip.value = ''; //clearing the input field
}

function addDataToList(text, key) {
    let listItem = document.createElement('li'); // create a new list item
    listItem.textContent = text; // set the text content to the input value
    listItem.dataset.key = key; // store the key in a data attribute
    list.appendChild(listItem); // append the list item to the unordered list

    // Add click event listener to delete the item from the database
    listItem.addEventListener('click', function () {
        let itemKey = listItem.dataset.key; // get the key from the data attribute
        let itemRef = ref(db, 'items/' + itemKey); // create a reference to the item in the database
        remove(itemRef); // remove the item from the database
    });
}

// Function to handle new data from the database
onValue(dbRef, function (snapshot) {
    let data = snapshot.val(); // get data from the snapshot

    list.innerHTML = ''; // clear the current list
    clearInputField(); // clear the input field

    for (let key in data) {
        let value = data[key]; // get the value
        addDataToList(value, key); // add each item to the list with its key
    }
});

but.onclick = function () {
    let text = ip.value;
    if (text.trim() !== '') { // Check if input is not empty
        push(dbRef, text); // pushing the data to the database push(database reference, data)
        clearInputField();
    }
};
