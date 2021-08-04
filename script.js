const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const deleteBtn = document.getElementById("delete-btn");

const todos = JSON.parse(localStorage.getItem("todos"));

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
    todoEl.contentEditable = "false";
    editButton(todoEl);

    todoEl.addEventListener("click", () => {
      if (todoEl.contentEditable === "false") {
        todoEl.classList.toggle("completed");
        updateLS();
      }
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
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

deleteBtn.addEventListener("click", () => {
  const items = document.querySelectorAll("li");
  items.forEach((item) => item.remove());
  updateLS();
  displayDeleteBtn();
});

function editButton(item) {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  if (item.contains(btn)) {
    console.log("contain");
  } else {
    item.appendChild(btn);
  }

  btn.addEventListener("click", (e) => {
    item.contentEditable = !item.isContentEditable;
    item.focus();

    if (item.contentEditable === "false") {
      updateLS();
    }

    e.stopPropagation();
  });

  item.addEventListener("input", function () {
    if (this.innerText.toString().length === 0) {
      this.innerHTML = `&nbsp; <button class="btn"></button>`;
    }
  });
}
