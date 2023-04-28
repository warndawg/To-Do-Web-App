function addItem() {
    //Grabbing the value of the input field
    var itemValue = document.getElementById('toDoItem').value;
    // assign the value to a new text node
    const newItem = document.createTextNode(itemValue)
    //create a new div
    var newItemDiv = document.createElement("div");
    //add item value to new div
    newItemDiv.appendChild(newItem);
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newItemDiv, currentDiv);
}




