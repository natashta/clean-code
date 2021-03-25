//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task"); //Add a new task.
var addBtn = document.getElementsByTagName("button")[0]; //first button
var incompleteTasks = document.getElementById("incomplete-tasks"); //ul of #incomplete-tasks
var completedTasks = document.getElementById("complete-tasks"); //completed-tasks


//New task list item
var createNewTaskElement = function(taskString) {

    var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input"); //checkbx
    //label
    var label = document.createElement("label"); //label
    //input (text)
    var editInput = document.createElement("input"); //text
    //button.edit
    var editBtn = document.createElement("button"); //edit button

    //button.delete
    var delBtn = document.createElement("button"); //delete button
    var delBtnImg = document.createElement("img"); //delete button image

    label.innerText = taskString;
    label.className = "task";

    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";

    editBtn.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editBtn.className = "edit";

    delBtn.className = "delete";
    delBtnImg.src = "./remove.svg";
    delBtn.appendChild(delBtnImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editBtn);
    listItem.appendChild(delBtn);
    return listItem;
}



var addTask = function() {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.

var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask = function() {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function() {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function() {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest = function() {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addBtn.onclick = addTask;
addBtn.addEventListener("click", addTask);
addBtn.addEventListener("click", ajaxRequest);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editBtn = taskListItem.querySelector("button.edit");
    var delBtn = taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editBtn.onclick = editTask;
    //Bind deleteTask to delete button.
    delBtn.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTasks.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTasks.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasks.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasks.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.