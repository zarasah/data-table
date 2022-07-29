import DataTable from './DataTable.js';

const columns = ['id', 'name', 'age'];
const data = [];

const names = ['Ani', 'Artak', 'Zara', 'Albert', 'Vahe', 'Nane', 'Van', 'Nelly', 
                'Anush', 'Narek', 'Serine', 'Jhon', 'Jane', 'Vika', 'Sam', 'Armine', 
                'Lusy', 'Karen', 'Jack', 'Astghik', 'Ashot', 'Davit', 'Nune',
                'Meline', 'Robert', 'Nataly', 'Gor', 'Anahit', 'Ann', 'Ben', 'Mery'];

for (let i = 1; i <= names.length; i++) {
    const obj = {
        id: i,
        name: names[i - 1],
        age: Math.ceil(Math.random() * 30 + 10)
    }

    data.push(obj);
}

const options = { perPage: 10 };
const $dataTableContainer = document.querySelector('.data-table-container');
const dataTable = new DataTable(columns, data, options);

dataTable.createTable($dataTableContainer);

// Element.prototaype.dataTable = function() {
    
// };

// const $table = document.querySelector('data-table-container');

// $table.dataTable();