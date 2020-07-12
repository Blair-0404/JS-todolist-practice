const listItem = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');

let dragItem = null;

for(let i = 0; i < listItem.length; i++) {
  listItem[i].addEventListener('dragstart', () => {
    dragItem = listItem[i];

    setTimeout(() => {
      listItem[i].style.display='none';
    }, 0);
  });

  listItem[i].addEventListener('dragend', () => {

    setTimeout(() => {
      dragItem.style.display = 'block';
      dragItem = null;
    }, 0)
  });

  for(let j = 0; j < lists.length; j++) {
    lists[j].addEventListener('dragover', (e) => {
      e.preventDefault(); // 이걸 막아야 카드 이동가능해진다
    });

    lists[j].addEventListener('dragenter', (e) => {
      e.preventDefault();
      lists[j].style.backgroundColor = '#ffa767'
    });

    lists[j].addEventListener('dragleave', (e) => {
      e.preventDefault();
      lists[j].style.backgroundColor = '#bcad81'

    });

    lists[j].addEventListener('drop', () => {
      console.log('drop');
      lists[j].append(dragItem); // 이쪽 list에 새 item 추가!
      lists[j].style.backgroundColor = '#bcad81'

    });
  }
}