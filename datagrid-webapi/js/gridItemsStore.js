/////****************/////////
/////file for grid management/////////
/////****************/////////
var gridItemsStoreObj = Object.create(null);
gridItemsStoreObj.basePath= 'http://localhost:63429/';
gridItemsStoreObj.GridData = null;
gridItemsStoreObj.InitGridWithData = function () {
    $("#grid").dxDataGrid({
        width: 560,
        dataSource: gridItemsStoreObj.GridData,
        keyExpr: "Id",
        selection: {
            mode: "single"
        },
        editing: false,
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        filterPanel: { visible: false },
        headerFilter: { visible: true },
        rowDragging: {
            allowReordering: true,
            onReorder: function (e) {
                var visibleRows = e.component.getVisibleRows(),
                    toIndex = tasks.indexOf(visibleRows[e.toIndex].data),
                    fromIndex = tasks.indexOf(e.itemData);

                tasks.splice(fromIndex, 1);
                tasks.splice(toIndex, 0, e.itemData);

                e.component.refresh();
            }
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                formItem = data;
                //$(".employeeNotes").text(data.Notes);
                //$(".employeePhoto").attr("src", data.Picture);
                formItemStoreObj.InitFormWithData(formItem);
            }
        },
        columnAutoWidth: false,
        groupPanel: { visible: true },
        grouping: { autoExpandAll: false },
        paging: {
            pageSize: 5
        },
        pager: {
            showInfo: true
        },
        //masterDetail: {
        //    enabled: true,
        //    template: masterDetailTemplate
        //},
        columns: [
            {
                dataField: "Id",
                width: 50,
                formItem: {
                    // visible: false
                }
            },
            { dataField: "Name", dataType: "string", width: 100 },
            { dataField: "Description", dataType: "string", width: 100 },
            { dataField: "SaleStartDate", dataType: "date", width: 100 },
            {
                caption: "Image", width: 180,
                cellTemplate: function (container, options) {
                    let imgUrl = options.data.ImageUrl;
                    if (imgUrl) {
                        $("<img src=" + gridItemsStoreObj.basePath + options.data.ImageUrl + " alt='' class='image-cell' />")
                            .appendTo(container);
                    }
                    else {
                        $("<span>NO IMAGE</span>")
                            .appendTo(container);
                    }
                }
            }
        ]
    });

};
gridItemsStoreObj.LoadGridData = function () {

    ServiceObj.getItemsService();
};
gridItemsStoreObj.ManupulateGridData = function (newObj) {
    var dataGrid = $("#grid").dxDataGrid("instance");
    if (newObj.action_type == 'ADD') {
        //find the element in list and replace it
        let newGridData = gridItemsStoreObj.GridData.concat(newObj.payload);
        gridItemsStoreObj.GridData = newGridData;
        var dataSource = dataGrid.getDataSource();
        dataSource.store().insert(newObj.payload).then(function () {
            dataSource.reload();
        });
    }
    if (newObj.action_type == 'UPDATE') {
        //find the element in list and replace it
        let newGridData = gridItemsStoreObj.GridData.map((item) => {
            if (item.Id === newObj.payload.Id) {
                return newObj.payload;
            }
            else {
                return item;
            }
        });
        gridItemsStoreObj.GridData = newGridData;
        //var dataSource = dataGrid.getDataSource();
        //dataSource.store().insert(newObj.payload).then(function () {
        //    dataSource.reload();
        //});
        gridItemsStoreObj.InitGridWithData();
    }
    if (newObj.action_type == 'DELETE') {
        //find the element in list and replace it
        let newGridData = gridItemsStoreObj.GridData.filter((item) => item.Id !== newObj.payload.DeletedId);

        gridItemsStoreObj.GridData = newGridData;

        gridItemsStoreObj.InitGridWithData();
    }

    dataGrid.refresh();
}
$(function () {
    gridItemsStoreObj.LoadGridData();
});