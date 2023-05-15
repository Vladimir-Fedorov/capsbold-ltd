let addMessage = document.querySelector(".js-message");
let addDesc = document.querySelector(".js-description");
let addButton = document.querySelector(".js-button");
let todo = document.querySelector(".js-todo-list");

let todoList = [];

let title = document.querySelector(".js-title");
let inputs = document.querySelector(".js-inputs");

//открытие формы заполнения дел
title.addEventListener("click", () => {
  title.classList.add("hidden");
  inputs.classList.remove("hidden");
});

// закрытие формы заполнения дел
window.addEventListener("click", (e) => {
  const target = e.target;
  if (
    !target.closest(".js-inputs") &&
    !target.closest(".js-button") &&
    !target.closest(".js-title")
  ) {
    title.classList.remove("hidden");
    inputs.classList.add("hidden");
  }
});

// достаем дела из web-хранилища (LocalStorage для сохранения по адресу)
if (sessionStorage.getItem("todo")) {
  todoList = JSON.parse(sessionStorage.getItem("todo"));
  displayMessages();
}

// добавляем дела в список и сохраняем в web-хранилище (LocalStorage для сохранения по адресу)
addButton.addEventListener("click", function () {
  let newTodo = {
    todo: addMessage.value,
    desc: addDesc.value,
    checked: false,
  };

  todoList.push(newTodo);
  displayMessages();
  sessionStorage.setItem("todo", JSON.stringify(todoList));
  addMessage.value = "";
  addDesc.value = "";
});

// функция вывода дел в список + проверка на непустое дело
function displayMessages() {
  let displayMessages = "";
  todoList.forEach(function (item, i) {
    if (item.todo != "") {
      displayMessages += `
      <li class="todo-list-item todo-list__item">
        <input class="todo-list-item__checked" type='checkbox' id='item_${i}' ${
        item.checked ? "checked" : ""
      }>
        <div class="todo-list-item__wrapper">
          <label class="todo-list-item__message" for='item_${i}'>${
        item.todo
      }</label>
          <label class="todo-list-item__desc" for='item_${i}'>${
        item.desc
      }</label>
        </div>
      </li>
      `;
      todo.innerHTML = displayMessages;
    }
  });
}

// смена состояния чекбокса и сохранение информации в web-хранилище (LocalStorage для сохранения по адресу)
todo.addEventListener("change", function (event) {
  let valueLable = todo.querySelector(
    "[for=" + event.target.getAttribute("id") + "]"
  ).innerHTML;

  todoList.forEach(function (item) {
    if (item.todo === valueLable) {
      item.checked = !item.checked;
      sessionStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});
