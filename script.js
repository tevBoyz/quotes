// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe2m6TDM2rhrv63SgALT-_18CQQ01Ne2s",
  authDomain: "quotes-ee703.firebaseapp.com",
  databaseURL: "https://quotes-ee703-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quotes-ee703",
  storageBucket: "quotes-ee703.appspot.com",
  messagingSenderId: "369823603466",
  appId: "1:369823603466:web:d275b4427a79876e2478f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const databases = getDatabase(app);

import {getDatabase, set, get, update, remove, ref, child} from  "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const share = document.getElementById('share');
const newQuote  = document.getElementById('qinput');

const db = getDatabase();

function insertData(ID, quote, reference, author, date){
    set(ref(db, "Quotes/" + ID), {
        ID: ID,
        quote: quote, 
        reference: reference,
        author: author,
        date: date
})
.then(() => {
    alert("New Quote Added Successfully!");
})
.catch((error)=>{
    alert(error);
});
}

function updateData(){
    update(ref(db, "Quotes/" + id), {
        quote: quote.value, 
        reference: reference.value,
        author: author.value,
        date: date,
    })
    .then(() => {
        alert("Updated Successfully!")
    })
    .catch((error) => {
        alert(error);    
    });
    
}

function removeData(){
    remove(ref(db, "People/" + id))
    .then(()=>{
        alert("Removed Successfully!");
    })
    .catch((error) => {
        alert(error);
    })
}

function getAllData(){
    const dbref = ref(db);
    // get(dbref, 'Quotes/').then(snapshot => {
    //app.database().ref('Quotes/').once('value', (snapshot) =>{
        // snapshot.forEach(
    //         function(ChildSnapshot){
    //             let author = ChildSnapshot.val().author;
    //             let date = ChildSnapshot.val().date;
    //             let quote = ChildSnapshot.val().quote;
    //             let reference = ChildSnapshot.val().quote;
    //             createCards(author, date, quote, reference);
    //         }
    //     )
    // });
    get(child(dbref, "Quotes"))    
    .then((snapshot) => {
        snapshot.forEach(ChildSnapshot => 
            {
                createCards(ChildSnapshot.val().author,
                ChildSnapshot.val().date, 
                ChildSnapshot.val().quote,
                ChildSnapshot.val().reference)
            });
    })
    
}


function createCards(author, date, quote, reference){
    let  container = document.getElementById('table-of-quotes');
    let card = `<div class="card">
    <div class="top-section">
      <div class="holder">
        <span id="author">Shared by: ${author}</span>
        <span id="date-of-post">${date}</span>
      </div>
    </div>
    <div class="bottom-section">
      <div class="hold">
        <p id="quote">${quote}</p>
        <span id="reference">Source: ${reference}</span>
      </div>
    </div>
  </div>`

  container.innerHTML += card;
}


share.addEventListener('click', ()=> {
    if(newQuote.value != ''){
        let popup = document.getElementById('popup');
        popup.style.display='flex';

        let authIn = document.getElementById('authorIn');
        let refIn = document.getElementById('referenceIn');
        let date = document.getElementById('todaysDate');
        let newQ = document.getElementById('newQuote');

        newQ.value = newQuote.value;

        let todai = new Date().toDateString();
        date.innerHTML = todai;    

        let cancel = document.getElementById('cancel');
        cancel.addEventListener('click', ()=> {
            resetPopUp();
        });

        let submit = document.getElementById('submit');   
        submit.disabled = false;

        submit.addEventListener('click', ()=> {
            submit.disabled = true;
            console.log("disabled")
            let quoteID = Math.floor(Math.random() * 100000000);
            let q = newQ.value;
            let auth = authIn.value;
            let refe = refIn.value == '' ? "Unknown" : refIn.value;

            console.log(quoteID, q, refe, auth, todai);
            insertData(quoteID, q, refe, auth, todai);
            createCards(auth, todai,q, refe);
            resetPopUp();
    });
}
else{
    alert( 'Please enter a Quote!')
    newQuote.focus();
}

});

function resetPopUp(){

    let popup = document.getElementById('popup');

    let authIn = document.getElementById('author');
    let refIn = document.getElementById('reference');
    let date = document.getElementById('todaysDate');
    let newQ = document.getElementById('newQuote');

    popup.style.display = 'none';
    authIn.value = "";
    refIn.value = "";
    date.innerHTML = "";
    newQ.value = "";
    newQuote.value = "";
}

getAllData();
