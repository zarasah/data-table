import DataTable from './DataTable.js';

const columns = ['id', 'name', 'age'];

const data = [
    {
        id: 1,
        name: 'Albert',
        age: 50,
    },
    {
        id: 2,
        name: 'Zara',
        age: 32,  
    },
    {
        id: 3,
        name: 'Vika',
        age: 6,  
    },
    {
        id: 4,
        name: 'Jhon',
        age: 42,  
    },
    {
        id: 5,
        name: 'Jane',
        age: 25,  
    }
];

const dataTable = new DataTable(columns, data);

dataTable.createTable();

// Element.prototaype.dataTable = function() {
    
// };

// const $table = document.querySelector('data-table-container');

// $table.dataTable();