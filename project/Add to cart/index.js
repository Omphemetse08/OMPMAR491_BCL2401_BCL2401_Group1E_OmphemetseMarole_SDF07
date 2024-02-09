import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-ce53b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const groceriesListInDB = ref(database, "groceriesList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const groceriesListEl = document.getElementById("groceries-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(groceriesListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(groceriesListInDB, function(snapshot) {
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
    
        clearGroceriesListEl()
    
        for (let i = 0; i < itemsArray.length; i++) {
             let currentItem =itemsArray[i]
             let currentItemID = currentItem[0]
             let currentItemValue = currentItem[1]
        
             appendItemToGroceriesListEl(currentItem)
        }
    } else {
        groceriesListEl.innerHTML = "no items here... yet"
    }
})

function clearGroceriesListEl() {
    groceriesListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToGroceriesListEl(item) {
    let itemID =item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `groceriesList/${itemID}`)
        
        remove(exactLocationOfItemInDB)  
    })
    
    groceriesListEl.append(newEl)
}