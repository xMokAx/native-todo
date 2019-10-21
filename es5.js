"use strict";

//if there is data stored in local storage turn it into an object and assign data to it otherwise assign data to object with empty arrays.
var data = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : {
  todos: [],
  completed: []
}; //add the todos in data to the DOM using the displayTodos function

function renderTodoListData() {
  if (!data.todos.length && !data.completed.length) return;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.todos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var todo = _step.value;
      displayTodos(todo);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = data.completed[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _todo = _step2.value;
      displayTodos(_todo, true);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
} //add todos to localStorage in the form of JSON


function dataObjUpdated() {
  localStorage.setItem("todoList", JSON.stringify(data));
} //remove and check icons in SVG format


var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" style="isolation:isolate" viewBox="0 -15 40 40" width="22" height="22"><path d="M16-15c-1.046 0-2.118.307-2.876.938-.756.63-1.124 1.522-1.124 2.395V-10H0v3.333h2V20c0 2.742 2.71 5 6 5h24c3.29 0 6-2.258 6-5V-6.667h2V-10H28v-1.667c0-.87-.368-1.765-1.126-2.396C26.12-14.693 25.046-15 24-15h-8zm0 3.333h8V-10h-8v-1.667zm-10 5h28V20c0 .925-.89 1.667-2 1.667H8c-1.11 0-2-.742-2-1.667V-6.667zm4 5v18.334h4V-1.667h-4zm8 0v18.334h4V-1.667h-4zm8 0v18.334h4V-1.667h-4z" fill="#8B8B8B"/></svg>';
var checkSVG = '<svg xmlns="http://www.w3.org/2000/svg" style="isolation:isolate" viewBox="-0.526 -0.526 41.053 41.053" width="22" height="22"><path d="M0 20C0 8.962 8.962 0 20 0s20 8.962 20 20-8.962 20-20 20S0 31.038 0 20z" fill="#FFF" vector-effect="non-scaling-stroke" stroke-width="1.053" stroke="#C1311E"/><path d="M31.142 10.09L16.857 24.393 10.96 18.51l-2.974 2.98 8.876 8.855 17.26-17.278-2.98-2.976z" fill="#C1311E"/></svg>';
renderTodoListData();
var addBtn = document.getElementById("add");
var addTodoInput = document.getElementById("addTodoInput");
addBtn.addEventListener("click", function () {
  var addTodoInputText = addTodoInput.value;

  if (addTodoInputText) {
    addTodo(addTodoInputText);
  }
});
addTodoInput.addEventListener("keydown", function (e) {
  var addTodoInputText = addTodoInput.value;

  if (e.code === "Enter" && addTodoInputText) {
    addTodo(addTodoInputText);
  }
}); //completed argument default value is false. the code would work without giving completed a default value but it's better for readability.
//this function adds todo to ul with id todoList if completed is false otherwise it adds the todo to ul with id completed

function displayTodos(text) {
  var completed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var list = completed ? document.getElementById("completedList") : document.getElementById("todoList");
  var todo = document.createElement("li");
  todo.textContent = text;
  var buttons = document.createElement("div");
  buttons.className = "buttons";
  var removeBtn = document.createElement("button");
  removeBtn.className = "remove";
  var completeBtn = document.createElement("button");
  completeBtn.className = "complete";
  removeBtn.innerHTML = removeSVG;
  completeBtn.innerHTML = checkSVG;
  buttons.appendChild(removeBtn);
  buttons.appendChild(completeBtn);
  todo.appendChild(buttons);
  list.appendChild(todo);
  removeBtn.addEventListener("click", removeTodo);
  completeBtn.addEventListener("click", toggleTodo);
}

function addTodo(text) {
  data.todos.push(text);
  dataObjUpdated();
  displayTodos(text);
  document.getElementById("addTodoInput").value = "";
}

function removeTodo() {
  var todo = this.parentNode.parentNode;
  var list = todo.parentNode;
  var listId = list.id;
  var todoText = todo.textContent;

  if (listId === "todoList") {
    data.todos.splice(data.todos.indexOf(todoText), 1);
  } else {
    data.completed.splice(data.completed.indexOf(todoText), 1);
  }

  list.removeChild(todo);
  dataObjUpdated();
}

function toggleTodo() {
  var todo = this.parentNode.parentNode;
  var list = todo.parentNode;
  var listId = list.id;
  var todoText = todo.textContent;
  var targetList = listId === "todoList" ? document.getElementById("completedList") : document.getElementById("todoList");
  list.removeChild(todo);
  targetList.appendChild(todo);

  if (listId === "todoList") {
    data.todos.splice(data.todos.indexOf(todoText), 1);
    data.completed.push(todoText);
  } else {
    data.completed.splice(data.completed.indexOf(todoText), 1);
    data.todos.push(todoText);
  }

  dataObjUpdated();
}