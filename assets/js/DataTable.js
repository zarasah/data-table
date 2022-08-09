class DataTable {
    constructor(
        columns = [], 
        data = [], 
        {
            perPage = 5,
            rowClassName = 'row',
            cellClassName = 'cell',
            tableClassName = 'table',
        }) 
        {
        this.columns = columns;
        this.data = data;
        this.perPage = perPage;
        this.rowClassName = rowClassName;
        this.cellClassName = cellClassName;
        this.tableClassName = tableClassName;
    }

    createTable($dataTableContainer) {
        this.$dataTableContainer = $dataTableContainer;

        let pageCount = Math.ceil (this.data.length / this.perPage);
        this.pageCount = pageCount;

        const $label = document.createElement('label');
        $label.innerHTML = 'SEARCH';
        this.$dataTableContainer.appendChild($label);
        const $searchInput = document.createElement('input');
        this.$searchInput = $searchInput;
        this.$dataTableContainer.appendChild($searchInput);
        const $table = document.createElement('table');
        $table.classList.add(this.tableClassName);
        this.$table = $table;
        this.currentData = this.data.slice(0, this.perPage);
        $dataTableContainer.appendChild($table);

        this.createThead();
        this.createTbody();
        this.renderData(this.currentData);
        this.renderPagination(this.pageCount, this.data);
        this.createSearch();
        this.createSelect();
    }

    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        $tr.classList.add(this.rowClassName);

        this.columns.forEach((column) => {
            const $th = document.createElement('th');
            $th.classList.add(this.cellClassName);
            $th.innerHTML = column.value;

            column.dataIndex === 'delete' ? $th.setAttribute('data-delete', column.dataIndex): $th.setAttribute('data-sort', column.dataIndex);
            column.dataIndex === 'delete' ? "" : $th.setAttribute('data-sort-order', 'asc');

            $th.addEventListener('click', (e) => {
                let sortMethod = $th.getAttribute('data-sort-order');
                let columnName = $th.getAttribute('data-sort');                
                let tempData = this.data;

                if (sortMethod === 'asc') {
                    $th.setAttribute('data-sort-order', 'des');
                    $th.innerHTML = column.value;

                    if (columnName === 'id') {
                        tempData.sort((dataA, dataB) => dataA.id - dataB.id);
                    } else if (columnName === 'name') {
                        tempData.sort((dataA, dataB) => {
                            let a = dataA.name.toLowerCase();
                            let b = dataB.name.toLowerCase();

                            if (a < b) return -1;
                            
                            if (a > b) return 1;

                            return 0;
                        })

                    } else if (columnName === 'age') {
                        tempData.sort((dataA, dataB) => dataA.age - dataB.age);
                    }
                   
                } else if (sortMethod === 'des'){
                            $th.setAttribute('data-sort-order', 'asc');
                            $th.innerHTML = column.value;
                    
                    if (columnName === 'id') {
                        tempData.sort((dataA, dataB) => dataB.id - dataA.id);
                    } else if (columnName === 'name') {

                        tempData.sort((dataA, dataB) => {
                            let a = dataA.name.toLowerCase();
                            let b = dataB.name.toLowerCase();

                            if (b < a) return -1;
                            
                            if (b > a) return 1;

                            return 0;
                        })

                    } else if (columnName === 'age') {
                        tempData.sort((dataA, dataB) => dataB.age - dataA.age);
                    }
                } 

                this.currentData = tempData.slice(0, this.perPage);
                this.renderData(this.currentData);
            });

            $tr.appendChild($th);
        });

        $thead.appendChild($tr);
        this.$table.appendChild($thead);
    }

    createTbody() {
        const $tbody = document.createElement('tbody');
        this.$tbody = $tbody;

        this.$table.appendChild($tbody);
    }

    renderData(data) {
        this.$tbody.innerHTML = null; // null or ''

        data.map((item) => {
            const $tr = document.createElement('tr');
            $tr.classList.add(this.rowClassName);

            for (const key in item) {
                const $td = document.createElement('td');
                $td.classList.add(this.cellClassName);
                $td.innerHTML = item[key];
                $tr.appendChild($td);
            }

            this.$tbody.appendChild($tr);
        });
    }

    renderPagination(pageCount, data) {
        console.log('data', data);
        const $pagination = document.querySelector('.pagination') || document.createElement('div');
        $pagination.classList.add('pagination');
        $pagination.innerHTML = null; // null or ''
        // const pageCount = Math.ceil (this.data.length / this.perPage);
        console.log('pagec', pageCount);
        for (let i = 1; i <= pageCount; i++) {
            const $button = document.createElement('button');
            $button.innerHTML += i;
            $pagination.appendChild($button);

            $button.addEventListener('click', (e) => {
                //debugger;
                const currentPage = e.target.innerHTML;
                
                if (currentPage === '1') {
                    this.currentData = data.slice(0, this.perPage);
                    this.renderData(this.currentData);
                } else {
                    const startData = (+currentPage - 1) * this.perPage;
                    const endData = startData + this.perPage;
                    this.currentData = data.slice(startData, endData);
                    console.log('currentData', this.currentData);
                    console.log('data', this.data);
                    this.renderData(this.currentData);
                }
            })
        }

        this.$dataTableContainer.appendChild($pagination);
    }

    createSelect() {
        const $selectPerPages = document.querySelector('select') || document.createElement('select');
        const $option = document.createElement('option');
        $option.innerHTML = '';
        $selectPerPages.appendChild($option);
        for ( let i = 0; i <= 27;  i = i + 3) {
            const $option = document.createElement('option');
            $option.innerHTML = i + 3;
            $selectPerPages.appendChild($option);
        }

        $selectPerPages.addEventListener('change', (e) => {
            this.perPage = +e.target.value;

            if (e.target.value === '') {
                return;  //  ???
            }

            const data = !this.filteredData ? this.data : this.filteredData;
            this.pageCount = Math.ceil (data.length / this.perPage);
            this.currentData = data.slice(0, this.perPage);
            this.renderData(this.currentData);
            this.renderPagination(this.pageCount,data);
        })

        this.$dataTableContainer.prepend($selectPerPages);
    }

    createSearch() {
        this.$searchInput.addEventListener('input', (e) => {
            const searchText = e.target.value;

            this.filteredData = this.data.filter((value) => {
                return value.name.includes(searchText) || value.id === +searchText || value.age === +searchText;
            });
            
            this.pageCount = Math.ceil(this.filteredData.length / this.perPage);
                
            this.currentData = this.filteredData.slice(0, this.perPage);
            console.log('cur', this.currentData);
            console.log('filter', this.filteredData);
            this.renderData(this.currentData);
            this.renderPagination(this.pageCount, this.filteredData);
        });
    }
}

export default DataTable;