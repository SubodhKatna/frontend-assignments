// Grab the elements from the DOM
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Function to add a new task
function addTask() {
    if (taskInput.value.trim() === '') {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item (li)
    let li = document.createElement("li");
    li.innerText = taskInput.value;
    
    let span = document.createElement("span");
    span.innerHTML = "&times;"; // The HTML code for an 'X' symbol
    
    li.appendChild(span);
    taskList.appendChild(li);

    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

taskList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
    } 
    else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
    }
});