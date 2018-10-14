
const storage = require('electron-localstorage');
// const storage = require('./localStorage');
const path = require('path')

initPage();
initEvent();
initPath();
getAll();
clear();


function initPath() {
  const pathele = document.getElementById('path');
  const submitPath = document.getElementById('submitPath');
  pathele.value = storage.getStoragePath();
  submitPath.addEventListener('click', () => {
    const p = document.getElementById('path');
    if (p) {
      storage.setStoragePath(path.join(__dirname, p.value));
      alert('修改成功');
    }
  })
}

function initPage() {
  const userName = storage.getItem('userName');
  const passWord = storage.getItem('passWord');
  const indexPage = storage.getItem('indexPage');
  const isDev = storage.getItem('isDev');
  document.getElementById('userName').value = userName;
  document.getElementById('passWord').value = passWord;
  document.getElementById('indexPage').value = indexPage;
  document.getElementById('isDev').value = isDev;
}

function initEvent() {
  document.getElementById('submit').addEventListener('click', () => {
    const userName = document.getElementById('userName').value;
    const passWord = document.getElementById('passWord').value;
    const indexPage = document.getElementById('indexPage').value;
    const isDev = document.getElementById('isDev').value;
    storage.setItem('userName', userName);
    storage.setItem('passWord', passWord);
    storage.setItem('indexPage', indexPage);
    storage.setItem('isDev', isDev);
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