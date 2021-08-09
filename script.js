const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const deleteBtn = document.getElementById("delete-btn");

const todos = JSON.parse(localStorage.getItem("todos"));

let completedTodos = 0;

countCompleted();

if (todos) {
  displayDeleteBtn();
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
  updateLS();
  displayDeleteBtn();
});

function addTodo(todo) {
  let todoText = input.value;
  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      const todosList = JSON.parse(localStorage.getItem("todos"));
      todoEl.classList.toggle("completed");
      if (todoEl.classList.contains("completed")) {
        completedTodos++;
      } else {
        completedTodos--;
      }
      updateLS();
      if (todosList.length === completedTodos) {
        console.log("show modal");
      }
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (todoEl.classList.contains("completed")) {
        completedTodos--;
      }
      todoEl.remove();
      updateLS();
      displayDeleteBtn();
    });

    todosUL.appendChild(todoEl);

    input.value = "";
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.textContent,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function displayDeleteBtn() {
  const todosList = JSON.parse(localStorage.getItem("todos"));
  if (todosList.length > 0) {
    deleteBtn.style.display = "block";
  } else {
    deleteBtn.style.display = "none";
  }
}

function countCompleted() {
  const todosList = JSON.parse(localStorage.getItem("todos"));
  todosList.forEach((todo) => {
    if (todo.completed) {
      completedTodos++;
    }
  });
}

deleteBtn.addEventListener("click", () => {
  const items = document.querySelectorAll("li");
  items.forEach((item) => item.remove());
  completedTodos = 0;
  updateLS();
  displayDeleteBtn();
});
