const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const deleteBtn = document.getElementById("delete-btn");
const addTodoBtn = document.getElementById("add-todo-btn");
const container = document.getElementById("container");
const closeModalBtn = document.getElementById("close-modal-btn");

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
});

addTodoBtn.addEventListener("click", () => {
  addTodo();
  addTodoBtn.classList.remove("dark");
  updateLS();
  displayDeleteBtn();
});

input.addEventListener("input", () =>
  input.value.length === 0
    ? addTodoBtn.classList.remove("dark")
    : addTodoBtn.classList.add("dark")
);

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
    todoEl.contentEditable = "false";
    editButton(todoEl);

    todoEl.addEventListener("click", (e) => {
      if (todoEl.contentEditable === "false") {
        const todosList = JSON.parse(localStorage.getItem("todos"));
        todoEl.classList.toggle("completed");
        if (todoEl.classList.contains("completed")) {
          completedTodos++;
        } else {
          completedTodos--;
        }
        if (todosList.length === completedTodos) {
          container.classList.add("active");
        }
        updateLS();
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

    if (todo) {
      todosUL.append(todoEl);
    } else {
      todosUL.insertBefore(todoEl, todosUL.firstChild);
    }

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
  if (todosList) {
    todosList.forEach((todo) => {
      if (todo.completed) {
        completedTodos++;
      }
    });
  }
}

deleteBtn.addEventListener("click", () => {
  const items = document.querySelectorAll("li");
  items.forEach((item) => item.remove());
  completedTodos = 0;
  updateLS();
  displayDeleteBtn();
});

function editButton(item) {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  item.appendChild(btn);

  btn.addEventListener("click", function (e) {
    item.contentEditable = !item.isContentEditable;
    item.focus();
    if (item.contentEditable === "false") {
      updateLS();
    }

    e.stopPropagation();
  });

  item.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      updateLS();
      item.blur();
      item.contentEditable = false;
    }
  });

  item.addEventListener("blur", function () {
    item.contentEditable = false;
    updateLS();
  });

  item.addEventListener("input", function () {
    if (this.innerText.toString().length === 0) {
      this.innerHTML = `&nbsp; <button class="btn"></button>`;
    }
  });
}

closeModalBtn.addEventListener("click", function () {
  container.classList.remove("active");
});
