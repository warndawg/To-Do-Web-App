storedList = JSON.parse(localStorage.getItem('storedList')) || [];
currentList = JSON.parse(localStorage.getItem('currentList')) || storedList[0];
toDoNames = [];

//event listner for buttons
onLoad = () => {
	let addList = document.getElementById("addListToStoredLists");
    let addItem = document.getElementById("addListItem");
    let inputList = document.getElementById("listName");
    let toDoIt = document.getElementById("toDoItem");
	addList.addEventListener("click", createStoredList);
    addItem.addEventListener("click", addToDoItem);
    inputList.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            createStoredList();
        }
      });
    toDoIt.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            addToDoItem();
        }
    });
    render();   
};

//function to add list to stored list
createStoredList = () => {
    checkInput('listName');
    if (checkInput('listName') == true) {
        addListToStoredLists();
        clearInput('listName');
        render();
        saveStoredLists();
    }else {
        return;
    };
};

//check if input is empty
checkInput = (listName) => {
    if (document.getElementById(listName).value == "") {
        alert("Please enter a list name");
        return false;
    } else {
        return true;
    }
};

//function to add list to stored list
addListToStoredLists = () => {
    let list = document.getElementById('listName');
    let keyName = list.value;
    storedList.unshift({
        'name':keyName, 
        'ToDoS':[],
    });
    currentList = storedList[0];
    toDoNames = [];
};

//function to clear input
clearInput = (inputName) => {
    document.getElementById(inputName).value = "";
};

function render() {
    // this will hold the html that will be displayed in the sidebar
    let listsHtml = '<div class="list-group text-center">';
    // iterate through the lists to get their names
    storedList.forEach((storedList) => {
      listsHtml += `<div class="list-group-item h2 p-0" id="${storedList.name}" onclick="changeCurrentList()">${storedList.name}</div>`;
    });
    listsHtml += '</div>';

    // print out the lists
    document.getElementById('lists').innerHTML = listsHtml;
    
    // print out the name of the current list
    if (currentList == undefined) {
        document.getElementById('currentListName').innerText = "No Lists Created";
        return;
    }
    else {
        document.getElementById('currentListName').innerText = currentList.name;
    };
    
    // iterate over the todos in the current list
    let todosHtml = '<div class="list-group-flush p-2">';
    currentList.ToDoS.forEach((currentList) => {
        if (currentList.completed == true) {
            todosHtml += `<div class="list-group-item h2" id="${currentList.text}" onclick="checkOffItem()"><img src="images/checkbox.png" width="25" height="25"><span>  ${currentList.text}</div>`;
        } else {
            todosHtml += `<div class="list-group-item h2" id="${currentList.text}" onclick="checkOffItem()"><img src="images/unchecked.png" width="25" height="25"><span>  ${currentList.text}</div>`;
        }    
    });

    // print out the todos
    document.getElementById('current-list-todos').innerHTML = todosHtml;

    highlightCurrentList();
};

//function to save storedLists to local storage
saveStoredLists = () => {
    localStorage.setItem('storedList', JSON.stringify(storedList));
};

//function that adds item to the list
addToDoItem = () => {
    // get the todo text from the todo input box
    let inputText = document.getElementById('toDoItem').value;
    let itemsChecked = toDoNames.includes(inputText) || toDoNames == [];
    if(itemsChecked == true){
        alert("This item is already on the list");
    } else {
        currentList.ToDoS.push({
            text: inputText,
            completed: false,
        });
        toDoNames = [...currentList.ToDoS.map(x => x.text)];
        render();
        clearInput('toDoItem');
    }
    saveStoredLists();
    saveCurrentList();
};

checkItems = (array, text) => {
    if (array.includes(text) || currentList == undefined) {
        return true;
    } else {
        return false;
    }        
}
//function to save current list to local storage
saveCurrentList = () => {
    localStorage.setItem('currentList', JSON.stringify(currentList));
};

//function to set current list to the heading above the list
setCurrentList = () => {
    let currentLi = document.getElementById('currentListName')
    current = storedList[0];
    currentLi.innerHTML = current.name;
    currentList = storedList[0];
    console.log(currentList);
}

//function to check off item
checkOffItem = () => {
    let el = event.target;
    let item = el.closest('div');
    let id = item.id;
    let indextoChange = currentList.ToDoS.findIndex(x => x.text == id);
    currentList.ToDoS[indextoChange].completed = true;
    item.innerHTML = `<img src="images/checkbox.png" width="25" height="25"><span> ${item.id}</div>`;
    saveStoredLists();
    saveCurrentList();
}

updateToDoNames = () => {
    currentList.ToDoS.forEach((item, index) => {
        if (item.completed == true) {
            currentList.ToDoS.splice(index, 1);
        }
    });
    toDoNames = [...currentList.ToDoS.map(x => x.text)];
}

//function to remove completed items from list
removeCompleted = () => {
    updateToDoNames();
    saveStoredLists();
    saveCurrentList();
    render();
}

//function to change current list
function changeCurrentList() {
    let el = event.target;
    let item = el.closest('div');
    let id = item.id;
    function isListName(lists) {
        return lists.name === id;
      }
    foundName = (storedList.find(isListName));
    foundIdx = storedList.findIndex(x => x.name == id);
    storedList.splice(foundIdx, 1);
    storedList.unshift(foundName);
    currentList = storedList[0];
    updateToDoNames();
    saveStoredLists();
    saveCurrentList();
    render();
};

//remove list from stored list
removeList = () => {
    let listName = currentList.name;
    let listIdx = storedList.findIndex(x => x.name == listName);
    storedList.splice(listIdx, 1);
    currentList = storedList[0];
    saveStoredLists();
    saveCurrentList();
    render();
}

//function to remove all lists from local storage
removeAllLists = () => {
    localStorage.clear();
    storedList = [];
    currentList = [];
    location.reload();
}

//funstion to highlight current list
highlightCurrentList = () => {
    let currentListName = currentList.name;
    let currentListEl = document.getElementById(currentListName);
    currentListEl.classList.add('active');
}

window.onload = onLoad();