//creates array of selectable to do lists
let selectableLists = [];
let storedItems = [];

//adds event listener to add list button
function onLoad() {
	let addList = document.getElementById("addListToStoredLists");
	let addItem = document.getElementById("addListItem");
	addList.addEventListener("click", checkInputValue);
	addItem.addEventListener("click", addListItem);
};

//finds the index value of the list name
function findListIndex() {
	let listName = document.getElementById("currentListName").innerHTML;	
	let listIndex = selectableLists.indexOf(listName);
	return listIndex;
};

//checks if input value is empty
function checkInputValue() {
	if (document.getElementById("listName").value == "") {
		alert("Please enter a list name");
		return;
	} else {
		addListToStoredList();
	}
};

//renders the array of selectable lists
function renderList(){
	let lists = document.getElementById("lists");
	lists.innerHTML = "";
	selectableLists.forEach(appendUl);
};

//stores the list name in the array
function storeLiName(list, array) {
	let listName = document.getElementById(list).value;
	array.unshift(listName);
	let storedList = sessionStorage.setItem(list, array);
};

//creates the selectable lists on the page
function appendUl(item) {
	let newListName = item;
	let newList = document.createElement("li");
	let listName = document.createTextNode(newListName);
	newList.appendChild(listName);
	document.getElementById("lists").appendChild(newList);
}

//creates the list name on the page above the to do list
function setListName() {
	let listName = selectableLists[0];
	let listNameText = document.getElementById("currentListName");
	listNameText.innerHTML = listName;
}

//clears the input fields
function clearInput() {
	document.getElementById("listName").value = "";
	document.getElementById("toDoItem").value = "";
}

//adds the list name to the array and renders the list
function addListToStoredList() {
	storeLiName(lists, selectableLists);
	renderList();
	clearInput();
	setListName();
};

//adds the to do item to the list
function addListItem() {;
	let itemName = document.getElementById("toDoItem").value;
	storedItems.unshift(itemName);
	let storedList = sessionStorage.setItem("storedItem", storedItems);
	clearInput();
};


//starts the event listners on page load
window.onload = onLoad();


