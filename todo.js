const form = document.querySelector('.js-todoForm'),
  todoInput = document.querySelector('.todo-input-box'),
  todoList = document.querySelector('.js-todoList');

let todosArr = [];
const TODOS_LOCALSTORAGE = 'todos';

function showTodoList(value) {
  const li = document.createElement('li');
  li.classList.add('todo-li');

  addTodo(li, value);
  deleteTodo(li);
  updateLocalstorage(todosArr);
}

// 할일추가
function addTodo(li, inputValue) {
  const div = document.createElement('div');
  div.classList.add('todo-div');

  div.innerText = `✔ ${inputValue}`;
  li.appendChild(div);
  todoList.appendChild(li);
  todoInput.value = '';

  pushTodoToLocalStorage(inputValue, li)
}

function pushTodoToLocalStorage(inputValue, li) {
  const todoObj = {
    id: todosArr.length + 1,
    value: inputValue
  };

  todosArr.push(todoObj);
  li.classList.add(todoObj.id);
}

// 할일 삭제
function deleteTodo(li) {
  const delBtn = document.createElement('button');
  delBtn.classList.add('todo-del-btn');

  delBtn.innerText = "✘";
  li.appendChild(delBtn);
  const idOfLi = li.classList[1];

  delBtn.addEventListener('click', () => {

    todoList.removeChild(li);
    delTodoInTodosArr(idOfLi);

    const parsedTodos = JSON.parse(localStorage.getItem(TODOS_LOCALSTORAGE))
    parsedTodos.forEach((val, idx) => {
      if(parseInt(val.id) === idOfLi) {
        parsedTodos.splice(idx,1)
        console.log(parsedTodos)
      }
    });
    todosArr = parsedTodos;
    updateLocalstorage(todosArr)
  });
}

function delTodoInTodosArr(idOfLi) {
  todosArr.forEach((val, idx) => {
    if (val.id === idOfLi) {
      console.log('d')

      todosArr.splice(idx, 1);
    }
  });
}

function updateLocalstorage(todosArr) {
  const stringfiedTodos = JSON.stringify(todosArr);

  localStorage.setItem(TODOS_LOCALSTORAGE, stringfiedTodos)
}

function loadLocalstorageTodos() {
  if(localStorage.getItem(TODOS_LOCALSTORAGE)) {
    const parsedTodos = JSON.parse(localStorage.getItem(TODOS_LOCALSTORAGE));
    parsedTodos.forEach((todo) => showTodoList(todo.value))
  }
}

function init() {
  loadLocalstorageTodos();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showTodoList(todoInput.value)
  });

  console.log('하이')
}

init();