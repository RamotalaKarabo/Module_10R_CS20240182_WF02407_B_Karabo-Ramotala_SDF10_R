
//Database imports
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase , ref , push ,onValue ,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//variables declarations

//database variables
const appSettings = {
    databaseURL : "https://realtime-database-9d36a-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
console.log(app);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
//elements variables
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
//


//interactions
addButtonEl.addEventListener("click", function() {

    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);
    console.log(`${inputValue} added to database`);
    clearInputField();



    onValue(shoppingListInDB, function(snapshot){
        
 //        if(snapshot.exist()){
            let itemsArray = Object.entries(snapshot.val());
            clearShoppingList();
            for(let counter = 0; counter<itemsArray.length;counter++){

                let currentItem = itemsArray[counter];
                let currentItemID =currentItem[0];
                let currentItemValue = currentItem[1];
    
                addItemToShoppingList(currentItem);
         }
 //       }else{
 //           shoppingListEl.innerHTML="No items here yet...";
//}
})
})

//functions
function addItemToShoppingList(item){

    let itemID = item[0]
    let itemValue = item[1]


    let newEl = document.createElement("li");

    newEl.textContent = `${itemValue}`;

    shoppingListEl.append(newEl); 

    newEl.addEventListener("click" , function(){
        let exactLocationOfItemInShoppingDB = ref(database , `shoppingList/${itemID}`);
        remove(exactLocationOfItemInShoppingDB);
    })
}


function clearInputField(){
    inputFieldEl.value = "";

}
function clearShoppingList(){
    shoppingListEl.innerHTML = "";
}


