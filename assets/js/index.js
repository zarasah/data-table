import DataTable from './DataTable.js';

// const columns = ['id', 'name', 'age'];
const columnsObject = [
    {
        value: 'ID',
        dataIndex: 'id',
    },
    {
        value: 'Name',
        dataIndex: 'name',
    },
    {
        value: 'Age',
        dataIndex: 'age',
    },
    {
        value: 'Hobby',
        dataIndex: 'hobby',
    },
    // {
    //     value: 'Delete',
    //     dataIndex: 'delete',  //  es hanel estexic, heto ciklov datatablei mej mi hat avel syunak avelacnel, heto ciklov meje X-er lcnel
    // },
];
const data = [];

const names = ['Ani', 'Artak', 'Zara', 'Albert', 'Vahe', 'Nane', 'Van', 'Nelly', 
                'Anush', 'Narek', 'Serine', 'Jhon', 'Jane', 'Vika', 'Sam', 'Armine', 
                'Lusy', 'Karen', 'Jack', 'Astghik', 'Ashot', 'Davit', 'Nune', 'Vahag',
                'Meline', 'Robert', 'Nataly', 'Gor', 'Anahit', 'Ann', 'Ben', 'Mery'];

const hobbys = ['Hiking', 'Backpacking', 'Camping', 'Fishing', 'Running'];

for (let i = 1; i <= names.length; i++) {
    const obj = {
        id: i,
        name: names[i - 1],
        age: Math.ceil(Math.random() * 30 + 10),
        hobby: hobbys[Math.floor(Math.random() * 5)]
    }

    data.push(obj);
}

const options = { perPage: 10 };
const $dataTableContainer = document.querySelector('.data-table-container');
// const dataTable = new DataTable(columnsObject, data, options);

// dataTable.createTable($dataTableContainer);

// const $div = document.createElement('div');
Element.prototype.datatable = function (columnsObject, data, options) {
    const dataTable =new DataTable(columnsObject, data, options);
    dataTable.createTable(this);
}

$dataTableContainer.datatable(columnsObject, data, options);






// Element.prototaype.dataTable = function() {
    
// };

// const $table = document.querySelector('data-table-container');

// $table.dataTable();