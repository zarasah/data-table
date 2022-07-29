class DataTable {
    constructor(columns = [], data = [], {perPage = 5}) {
        this.columns = columns;
        this.data = data;
        this.perPage = perPage;
    }

    createTable($dataTableContainer) {
        const $table = document.createElement('table');
        this.$table = $table;
        // const $dataTableContainer = document.querySelector('.data-table-container');
        // this.perPage = 3;
        this.currentData = this.data.slice(0, this.perPage);
        this.$dataTableContainer = $dataTableContainer;
        $dataTableContainer.appendChild($table);

        this.createThead();
        this.createTbody();
        this.renderData();
        this.renderPagination();
        this.createSelect();
    }

    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');

        this.columns.forEach((column) => {
            const $th = document.createElement('th');
            $th.innerHTML = column;
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

    renderData() {
        this.$tbody.innerHTML = null; // null or ''

        this.currentData.map((item) => {
            const $tr = document.createElement('tr');

            for (const key in item) {
                const $td = document.createElement('td');
                $td.innerHTML = item[key];
                $tr.appendChild($td);
            }

            this.$tbody.appendChild($tr);
        });
    }

    renderPagination() {
        const $pagination = document.querySelector('.pagination') || document.createElement('div');
        $pagination.classList.add('pagination');
        $pagination.innerHTML =null; // null or ''
        const pageCount = Math.ceil (this.data.length / this.perPage);

        for (let i = 1; i <= pageCount; i++) {
            const $button = document.createElement('button');
            $button.innerHTML += i;
            $pagination.appendChild($button);

            $button.addEventListener('click', (e) => {
                //debugger;
                const currentPage = e.target.innerHTML;
                
                if (currentPage === '1') {
                    this.currentData = this.data.slice(0, this.perPage);
                    this.renderData();
                } else {
                    const startData = (+currentPage - 1) * this.perPage;
                    const endData = startData + this.perPage;
                    this.currentData = this.data.slice(startData, endData);
                    this.renderData();
                }
            })
        }

        this.$dataTableContainer.appendChild($pagination);
    }

    // addEvent() {
    // ???
    // }

    createSelect() {
        const $selectPerPages = document.createElement('select');
        for ( let i = 0; i <= 27;  i = i + 3) {
            const $option = document.createElement('option');
            $option.innerHTML = i + 3;
            $selectPerPages.appendChild($option);
        }

        $selectPerPages.addEventListener('change', (e) => {
            this.perPage = +e.target.value;
            this.currentData = this.data.slice(0, this.perPage);
            this.renderData();
            this.renderPagination();
        })

        this.$dataTableContainer.prepend($selectPerPages);
    }
}

export default DataTable;