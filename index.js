import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'; //importing the initializeApp function from the firebase-app module
import {getDatabase, ref, push, onValue} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'; //importing the getDatabase, ref and push functions from the firebase-database module

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

function addDataToList(text) {
    let listItem = document.createElement('li'); // create a new list item
    listItem.textContent = text; // set the text content to the input value
    list.appendChild(listItem); // append the list item to the unordered list
}

// Function to handle new data from the database
onValue(dbRef, function(snapshot) {
    let data = snapshot.val(); // get data from the snapshot
    list.innerHTML = ''; // clear the current list
    clearInputField(); // clear the input field

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            addDataToList(data[key]); // add each item to the list
        }
    }
});

but.onclick = function() {
    let text = ip.value;
    console.log(text);
    push(dbRef, text); // pushing the data to the database push(database reference, data)

    clearInputField();
    // addingDataToList(text);
}
