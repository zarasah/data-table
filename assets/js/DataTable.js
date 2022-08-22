class DataTable {
    constructor(
        columns = [], 
        data = [], 
        {
            perPage = 5,
            rowClassName = '',
            cellClassName = '',
            tableClassName = '',
        }) 
        {
        this.columns = columns;
        this.data = data;
        this.perPage = perPage;
        this.rowClassName = `datatable__row ${rowClassName}`;
        this.cellClassName = `datatable__cell ${cellClassName}`;
        this.tableClassName = `datatable ${tableClassName}`;
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
        $table.setAttribute('class', this.tableClassName); // change $table.classList.add(this.tableClassName);
        this.$table = $table;
        this.currentData = this.data.slice(0, this.perPage);
        $dataTableContainer.appendChild($table);
        // debugger;
        const $deleteBtn = document.createElement('button');
        this.$deleteBtn = document.createElement('button');
        this.$deleteBtn.innerText = 'DELETE CHECKED';
        this.$deleteBtn.classList.add('delete');
        
        this.$deleteBtn.addEventListener('click', (e) => {
            const checkedData = document.querySelectorAll('.check');
            const deleteCheckData = [];
            checkedData.forEach((item) => {
                if (item.checked) {
                    deleteCheckData.push(+item.dataset.id);  
                }
            })

            if (this.filteredData) {
                const filteredData = this.filteredData.filter((data) => {
                    return !deleteCheckData.includes(data.id);
                })
                const tempData = this.data.filter((data) => {
                    return !deleteCheckData.includes(data.id);
                })
                this.data = tempData;
                this.filteredData = filteredData;
                this.pageCount = Math.ceil(this.filteredData.length / this.perPage);
                this.currentData = this.filteredData.slice(0, this.perPage);
                this.renderData(this.currentData);
                this.renderPagination(this.pageCount, this.filteredData);

            } else {
                const tempData = this.data.filter((data) => {
                    return !deleteCheckData.includes(data.id);
                })
                this.data = tempData;
                this.pageCount = Math.ceil(this.data.length / this.perPage);
                this.currentData = this.data.slice(0, this.perPage);
                this.renderData(this.currentData);
                this.renderPagination(this.pageCount, this.data);
            }
            
            this.$thCheck.checked = false;
            this.$deleteBtn.hidden = true;
        })

        this.createThead();
        this.createTbody();
        this.renderData(this.currentData);
        this.renderPagination(this.pageCount, this.data);
        this.createSearch();
        this.createSelect();

        $dataTableContainer.append(this.$deleteBtn);
        this.$deleteBtn.hidden = true;
    }

    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        $tr.setAttribute('class', this.rowClassName);  // $tr.classList.add(this.rowClassName); 

        const $thCheck = document.createElement('input');
        this.$thCheck = $thCheck;
        $thCheck.setAttribute('type', 'checkbox');
        $tr.appendChild($thCheck);

        $thCheck.addEventListener('change', (e) => {
            const $checkList = document.querySelectorAll('.check');

            if($thCheck.checked) {
                $checkList.forEach((checkBox => {
                    checkBox.checked = true;
                    this.checkDataList.push(+checkBox.dataset.id);
                    this.$deleteBtn.hidden = false;
                }))
            } else {
                $checkList.forEach((checkBox => {
                    checkBox.checked = false;
                    this.$deleteBtn.hidden = true;
                }))
            }
        })

        this.columns.forEach((column) => {
            const $th = document.createElement('th');
            $th.setAttribute('class', this.cellClassName);  //  $th.classList.add(this.cellClassName);
            $th.innerHTML = column.value;

            column.dataIndex === 'delete' ? $th.setAttribute('data-delete', column.dataIndex): $th.setAttribute('data-sort', column.dataIndex);
            column.dataIndex === 'delete' ? "" : $th.setAttribute('data-sort-order', 'asc');

            $th.addEventListener('click', (e) => {
                const sortMethod = $th.getAttribute('data-sort-order');
                const columnName = $th.getAttribute('data-sort');
                const tempData = !this.filteredData ? this.data : this.filteredData;              

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
        const $thDel = document.createElement('th');
        $thDel.setAttribute('class', this.cellClassName);
        $thDel.innerHTML = 'Delete';
        $tr.appendChild($thDel);

        const $thEdit = document.createElement('th');
        $thEdit.setAttribute('class', this.cellClassName);
        $thEdit.innerHTML = 'Edit';
        $tr.appendChild($thEdit);

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
            $tr.setAttribute('class', this.rowClassName);
            
            const $tdCheck = document.createElement('input');
            this.$tdCheck = $tdCheck;
            $tdCheck.setAttribute('class', this.cellClassName);
            $tdCheck.setAttribute('type', 'checkbox');
            $tdCheck.setAttribute('data-id', item.id);
            $tdCheck.classList.add('check');
            $tr.appendChild($tdCheck);
            const checkDataList = [];
            this.checkDataList = checkDataList;
            $tdCheck.addEventListener('change', (e) => {
                // debugger;
                const checkedData = +e.target.dataset.id;
                if (e.target.checked) {
                    this.checkDataList.push(checkedData);
                } else {
                    const temp = this.checkDataList.filter((item) => {
                        return item !== checkedData;
                    })
                    this.checkDataList = temp;
                }
                
                console.log(this.checkDataList);
                
                if (this.checkDataList.length > 1) {
                    console.log(this.checkDataList.length)
                    this.$deleteBtn.hidden = false;
                } else {
                    this.$deleteBtn.hidden = true;
                }

                if (this.checkDataList.length === this.currentData.length) {
                    this.$thCheck.checked = true;
                } else {
                    this.$thCheck.checked = false;
                }
            })

            for (const key in item) {
                const $td = document.createElement('td');
                $td.setAttribute('class', this.cellClassName);
                $td.innerHTML = item[key];
                $tr.appendChild($td);
            }
            
            const $tdDel = document.createElement('td');
            $tdDel.setAttribute('class', this.cellClassName);
            $tdDel.innerHTML = '&#10008';
            $tdDel.setAttribute('data-id', item.id);
            $tr.appendChild($tdDel);
            
            $tdDel.addEventListener('click', (e) => {
                const deleteData = +e.target.dataset.id;

                if (!this.filteredData) {
                    const newData = this.data.filter((item) => {
                        return item.id !== deleteData;
                    })
                    this.pageCount = Math.ceil(newData.length / this.perPage);
                    this.data = newData;
                    this.currentData = this.data.slice(0, this.perPage);
                    this.renderData(this.currentData);
                    this.renderPagination(this.pageCount, this.data);
                } else {
                    const newData = this.data.filter((item) => {
                        return item.id !== deleteData;
                    })
                    const newFiltered = this.filteredData.filter((item) => {
                        return item.id !== deleteData;
                    })
                    this.data = newData;
                    this.filteredData = newFiltered;
                    this.pageCount = Math.ceil(this.filteredData.length / this.perPage);
                    this.currentData = this.filteredData.slice(0, this.perPage);
                    this.renderData(this.currentData);
                    this.renderPagination(this.pageCount, this.filteredData);
                }
            })

            const $tdEdit = document.createElement('td');
            $tdEdit.setAttribute('class', this.cellClassName);
            $tdEdit.innerHTML = '&#9998';
            $tdEdit.setAttribute('data-id', item.id);
            $tr.appendChild($tdEdit);
            let check = true;

            $tdEdit.addEventListener('click', (e) => {
                if (document.querySelector('.editForm')) {
                    check = false;
                }

                if (check) {
                    const $div = document.createElement('div');
                    $div.classList.add('editForm');
                    const $form = document.createElement('form');

                    this.columns.forEach((item) => {
                        const $label = document.createElement('lable');
                        $label.innerHTML = item.value;
                        const $input = document.createElement('input');
                        const editID = +e.target.dataset.id;
                        const editText = this.data.filter((data) => {
                            return data.id === editID;
                        })[0];
                        // debugger;
                        const index = item.value.toLowerCase();
                        const text = editText[index];
                        $input.name = index;
                        console.log($input.name);
                        $input.value = text;
                        $label.appendChild($input);
                        $form.appendChild($label);
                    })
                    const $save = document.createElement('button');
                    const $cancel = document.createElement('button');
                    $save.innerHTML = 'Save';
                    $cancel.innerHTML = 'Cancel';

                    $save.addEventListener('click', (e) => {
                        e.preventDefault();
                        const editedData = this.data.map((item) => {
                            if (item.id === +$tdEdit.dataset.id) {
                                const editItem = {};
                                for (let key in item) {
                                    const newItem = $form.querySelector(`input[name=${key}]`).value;
                                    console.log('newItem', newItem);
                                    if (typeof item[key] === 'number') {
                                        editItem[key] = +newItem;
                                    } else {
                                        editItem[key] = newItem;
                                    }
                                }
                                item = editItem;
                            }
                        return item;
                        })
                        this.data = editedData;
                        this.currentData = this.data.slice(0, this.perPage);
                        this.renderData(this.currentData);
                        this.renderPagination(this.pageCount, this.data);
                        check = true;
                        $div.remove();
                    })

                    $cancel.addEventListener('click', (e) => {
                        check = true;
                        $div.remove();
                    })

                    $form.appendChild($save);
                    $form.appendChild($cancel);
                    $div.appendChild($form);
                    this.$dataTableContainer.appendChild($div);
                }   
            })
            this.$tbody.appendChild($tr);
        });
    }

    renderPagination(pageCount, data) {
        const $pagination = document.querySelector('.pagination') || document.createElement('div');
        $pagination.classList.add('pagination');
        $pagination.innerHTML = null; // null or ''
        for (let i = 1; i <= pageCount; i++) {
            const $button = document.createElement('button');
            $button.innerHTML += i;
            $pagination.appendChild($button);

            $button.addEventListener('click', (e) => {
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
                this.perPage = 10;
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
            this.renderData(this.currentData);
            this.renderPagination(this.pageCount, this.filteredData);
        });
    }
}

export default DataTable;