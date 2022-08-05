"use strict";
var _a;
const fetchClient = (url) => (resource) => (method) => (body) => {
    return fetch(`${url}/${resource}`, {
        body: body && JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        method
    });
};
const api = fetchClient('http://localhost:3000');
const resource = api('promise');
const getAction = resource('get');
const postAction = resource('post');
const updateAction = resource('put');
const deleteItem = (id) => {
    const resource = api(`promise/${id}`);
    resource('delete')().then(loadItems);
};
const loadItems = () => {
    getAction().then((res) => res.json().then(renderList));
};
const input = document.getElementById('promise-input');
const saveItem = () => {
    if (input.value) {
        postAction({ desc: input.value }).then(loadItems);
        input.value = '';
    }
};
const renderList = (data) => {
    const table = document.getElementById('promise-table');
    if (table) {
        table.innerHTML = '';
        let tr = document.createElement('tr');
        ['Description', 'Delete'].forEach((label) => {
            const th = document.createElement('th');
            th.innerText = label;
            tr.appendChild(th);
        });
        table.appendChild(tr);
        data.forEach((el) => {
            table.appendChild(renderRow(el));
        });
    }
};
const renderRow = (el) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerHTML = el.desc;
    tr.appendChild(td1);
    const td2 = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    deleteButton.onclick = () => deleteItem(el.id);
    td2.appendChild(deleteButton);
    tr.appendChild(td2);
    return tr;
};
(_a = document.getElementById('promise-save')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', saveItem);
loadItems();
