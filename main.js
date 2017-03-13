window.onload = function() {
    var containerList = document.querySelector(".container-list ul.list");

    function compareNumeric(a, b) {
        return a - b;
    }

    function BubbleSort(A)       
    {                           
        var n = A.length;
        var elems = document.querySelectorAll(".container-list ul.list tr:not(:first-child)");
        
        for (var i = 0; i < n-1; i++)
        { 
            for (var j = 0; j < n-1-i; j++) {
                if (A[j+1].num < A[j].num) { 
                    var t = A[j+1];
                    A[j+1] = A[j]; 
                    A[j] = t; 

                    var z = List.items[j+1];
                    List.items[j+1] = List.items[j]; 
                    List.items[j] = z;
                }
            }
        }
        List.renderTable(List.items, containerList);         
        return A;    
    }


    class ListState {
        constructor(items) {
            this.items = items;
            this.StateArray = [];
        }

        setStateArray(param) {
            for(let i = 0; i < this.items.length; i++){
                this.StateArray.push({num: +this.items[i][param], position: i});
                Object.defineProperty(this.items[i],"position", {
                    value: i,
                    enumerable: false,
                    writable: false
                })
            }
        }

        renderHead(row, toCont) {
            let tr = document.createElement("tr");
            for (let item in row) {
                let th = document.createElement("th");
                th.innerHTML = item;
                tr.appendChild(th);
            }

            toCont.appendChild(tr);
        }

        renderRow(row, toCont) {
            let tr = document.createElement("tr");
            for (let item in row) {
                let td = document.createElement("td");
                td.innerHTML = row[item];
                tr.appendChild(td);
            }

            toCont.appendChild(tr);
        }

        renderTable(rows, toCont) {

            if(containerList.querySelectorAll("tr")) {
                containerList.querySelectorAll("tr").forEach((item)=>item.remove())
            }
            this.renderHead(rows[0], toCont);

            for(let i = 0; i < rows.length; i++){
                this.renderRow(rows[i], toCont);
            }
        }
        
        sortBy(list) {
            let SortInfo = this.dataset.sort.split(" ");
            let method = SortInfo[SortInfo.length-1];
            List.StateArray = BubbleSort(List.StateArray);
        }

        
    }


    var List = new ListState(JSON.parse(IconJson));
    List.setStateArray("num");

    console.log(List);
    List.renderTable(List.items, containerList);

    var sortBtn = document.querySelector(".sortBtn");
    sortBtn.addEventListener("click", List.sortBy);
    console.log(List)

}