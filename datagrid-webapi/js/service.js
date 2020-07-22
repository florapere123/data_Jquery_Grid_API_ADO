/////****************/////////
/////file for calls to api -crud operatioms/////////
/////****************/////////
var ServiceObj = Object.create(null);
ServiceObj.apiUrl = 'http://localhost:63429/api/items';
ServiceObj.getItemsService = function () {
    $.get(this.apiUrl, function (data) {
        gridItemsStoreObj.GridData = data;
        gridItemsStoreObj.InitGridWithData();
    }); 
};
ServiceObj.saveItemsService = function (req_send_type, formData) {
    $.ajax({
        url: req_send_type.url,//'http://localhost:63429/api/items/Post/'
        type: req_send_type.type,//'POST',
        data: formData,
        processData: false,
        contentType: false,
        async: false,
        //contentType: 'application/json; charset=utf-8',
        complete: function (data) {
            let newResObj = {
                action_type: req_send_type.type == 'POST' ? 'ADD' : 'UPDATE',
                payload: data.responseJSON
            };
            gridItemsStoreObj.ManupulateGridData(newResObj);
            if (req_send_type.type == 'POST') //ADD Action
            {
                formItemStoreObj.ClearForm();
            }
            DevExpress.ui.dialog.alert('success fully updated' + data.responseJSON.Id, req_send_type.type == 'POST' ? 'Add operation' : 'Update operation');
        },
        error: function (response) {
            console.log(response.responseText);
        }

    });
};
ServiceObj.deletetemsService = function (req_send_type) {
    $.ajax({
        url: req_send_type.url,//'http://localhost:63429/api/items/DELETE/'
        type: req_send_type.type,//'DELETE',
        processData: false,
        contentType: false,
        async: false,
        //contentType: 'application/json; charset=utf-8',
        complete: function (data) {
            let newResObj = {
                action_type: 'DELETE',
                payload: data.responseJSON
            };
            gridItemsStoreObj.ManupulateGridData(newResObj);
            formItemStoreObj.ClearForm();
            DevExpress.ui.dialog.alert('successfully deleted' + data.responseJSON.DeletedId, 'Deleted operation');
        },
        error: function (response) {
            console.log(response.responseText);
        }
    });
}