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
    },
    {
        id: 6,
        name: 'Nane',
        age: 30,
    },
    {
        id: 7,
        name: 'Gevorg',
        age: 20,  
    },
    {
        id: 8,
        name: 'Nelly',
        age: 19,  
    },
    {
        id: 9,
        name: 'Artak',
        age: 42,  
    },
    {
        id: 10,
        name: 'Tatev',
        age: 37,  
    }
];

const dataTable = new DataTable(columns, data);

dataTable.createTable();

// Element.prototaype.dataTable = function() {
    
// };

// const $table = document.querySelector('data-table-container');

// $table.dataTable();