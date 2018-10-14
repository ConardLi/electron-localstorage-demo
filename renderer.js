
const storage = require('electron-localstorage');

initPage();
saveUser();
getAll();
clear();

function initPage() {
  const userName = storage.getItem('userName');
  const passWord = storage.getItem('passWord');
  document.getElementById('userName').value = userName;
  document.getElementById('passWord').value = passWord;
}

function saveUser() {
  document.getElementById('submit').addEventListener('click', () => {
    const userName = document.getElementById('userName').value;
    const passWord = document.getElementById('passWord').value;
    storage.setItem('userName', userName);
    storage.setItem('passWord', passWord);
    getAll();
    alert('保存成功');
  })
}

function getAll() {
  const config = storage.getAll();
  let html = '';
  if (config) {
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        html += `<li>${key}：${config[key]}</li>`;
      }
    }
    document.getElementById('all').innerHTML = html;
  }
}


function clear() {
  document.getElementById('removeItem').addEventListener('click', () => {
    storage.removeItem('userName');
    initPage();
    getAll();
  })
  document.getElementById('clear').addEventListener('click', () => {
    storage.clear();
    initPage();
    getAll();
  })
}