const form = document.querySelector('.js-todoForm'),
  todoInput = document.querySelector('.todo-input-box'),
  todoList = document.querySelector('.js-todoList');

const TODOS_LOCALSTORAGE = 'todos'; // localStorage key
let todosArr = []; // 이 배열이 변경될때마다 항상 localStorage 에도 반영되야함

function showTodoList(value) {
  const li = document.createElement('li');
  li.classList.add('todo-li');
  li.setAttribute('draggable', 'true');

  createAddRole(li, value);
  createDelRole(li);
}

// 할일 추가 기능
function createAddRole(li, inputValue) {
  const div = document.createElement('div');
  const todoObj = {
    id: todosArr.length + 1,
    value: inputValue
  };

  // 태크생성 후 값 넣기
  div.classList.add('todo-div');
  div.innerText = `✔ ${inputValue}`;
  li.classList.add(todoObj.id);
  li.appendChild(div);
  todoList.appendChild(li);
  todoInput.value = '';

  // todoArr 에도 할일추가
  todosArr.push(todoObj);

  // localStorage 에 변경된 todosArr 반영
  updateLocalstorage(todosArr);
}

// 할일 삭제 기능
function createDelRole(li) {
  const delBtn = document.createElement('button');
  const idOfLi = parseInt(li.classList[1]);

  // 삭제버튼 생성
  delBtn.classList.add('todo-del-btn');
  delBtn.innerText = "✘";
  li.appendChild(delBtn);

  // 삭제버튼 클릭 이벤트 달기
  delBtn.addEventListener('click', () => {

    // 할일태그 삭제
    todoList.removeChild(li);
    // localStorage 값 꺼내오기
    const parsedTodos = JSON.parse(localStorage.getItem(TODOS_LOCALSTORAGE));
    // 삭제된 할일을 localStorage 값 에서도 삭제해주기
    parsedTodos.forEach((val, idx) => {
      if (parseInt(val.id) === idOfLi) {
        parsedTodos.splice(idx, 1);
      }
    });
    // todosArr도 삭제된것 반영
    todosArr = parsedTodos;
    // localStorage 에 변경된 todosArr 반영
    updateLocalstorage(parsedTodos)
  });
}

// todosArr 이 변경됨에따라 localStorage 에도 반영
function updateLocalstorage(todosArr) {
  const stringfiedTodosArr = JSON.stringify(todosArr);

  localStorage.setItem(TODOS_LOCALSTORAGE, stringfiedTodosArr)
}

// 페이지 열때 localStorage 값 가져와서 브라우저에 반영해주기
function loadLocalstorageTodos() {
  if (localStorage.getItem(TODOS_LOCALSTORAGE)) {
    const parsedTodos = JSON.parse(localStorage.getItem(TODOS_LOCALSTORAGE));
    parsedTodos.forEach((todo) => {
      showTodoList(todo.value)
    })
  }
}

function init() {
  loadLocalstorageTodos();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showTodoList(todoInput.value)
  });
}

init();
