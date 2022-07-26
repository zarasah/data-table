class DataTable {
    constructor(columns = [], data = []) {
        this.columns = columns;
        this.data = data;
    }

    createTable() {
        const $table = document.createElement('table');
        this.$table = $table;
        const $dataTableContainer = document.querySelector('.data-table-container');
        this.currentData = this.data.slice(0, 3);
        this.$dataTableContainer = $dataTableContainer;
        $dataTableContainer.appendChild($table);

        this.createThead();
        this.createTbody();
        this.renderData();
        this.renderPagination();

        // $table.appendChild(this.createThead());
        // const $tbody =this.createTbody()
        // $table.appendChild($tbody);

        // const data = this.renderData();

        // data.forEach(($tr) => {
        //     this.$tbody.appendChild($tr);
        // })
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
        this.$tbody.innerHTML = null;

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
        const $pagination = document.createElement('div');
        const pageCount = Math.ceil (this.data.length / 3);

        for (let i = 1; i <= pageCount; i++) {
            const $button = document.createElement('button');
            $button.innerHTML = i;
            $pagination.appendChild($button);

            $button.addEventListener('click', (e) => {
                const currentPage = e.target.innerHTML;
                
                if (currentPage === '1') {
                    this.currentData = this.data.slice(0, 3);
                    this.renderData();
                } else {
                    const startData = (+currentPage - 1) * 3
                    const endData = startData + 3;
                    this.currentData = this.data.slice(startData, endData);
                    this.renderData();
                }
            })
        }

        this.$dataTableContainer.appendChild($pagination);       
    }
}

export default DataTable;