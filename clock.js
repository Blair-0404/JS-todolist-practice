const clockContainer = document.querySelector('.js-clock'),
  clockTitle = document.querySelector('h1');

function addZero(time) {
  return time < 10 ? `0${time}` : time
}

function getTime() {
  const date = new Date();
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());
  const nowTime = `${hours}:${minutes}:${seconds}`;

  clockTitle.innerText = `현재시각 : ${nowTime}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000)
}

init();