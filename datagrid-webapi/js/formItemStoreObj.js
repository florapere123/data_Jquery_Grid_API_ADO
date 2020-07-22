/////****************/////////
/////file for form management/////////
/////****************/////////
var formItemStoreObj = {
    basePath: 'http://localhost:63429/',
    apiUrl: 'http://localhost:63429/api/items',
    GridData: null,
    formItem: {
        Id: 0,
        Name: null,
        Description: null,
        SaleStartDate: null,
        File: null,
        ImageId: null,
        ImageUrl: ''
    },
    Save: function (updateFormData) {
        var NameTxt = $('#nameTxt').dxTextBox('instance').option('value');
        var DescriptionTxt = $('#descriptionTxt').dxTextBox('instance').option('value');
        var SaleStartDateTxt = $('#saleStartDateTxt').dxDateBox('instance').option('value');
        updateFormData.Name = NameTxt;
        updateFormData.Description = DescriptionTxt;
        updateFormData.SaleStartDate = SaleStartDateTxt;


        //$.post(this.apiUrl, function (data) {
        //    formItemStoreObj.InitGridWithData(data);
        //}); 
        const formData = new FormData();

        if (updateFormData.File) {
            formData.append('File', updateFormData.File);
        }
        else {
            formData.append('ImageUrl', updateFormData.ImageUrl);
        }
        formData.append('Id', updateFormData.Id);
        formData.append('Name', updateFormData.Name);
        formData.append('Description', updateFormData.Description);
        formData.append('SaleStartDate', new Date(updateFormData.SaleStartDate).toISOString());

        let req_send_type = {
            type: 'POST',
            url: this.apiUrl + '/Post'
        };
        if (updateFormData.Id > 0) {
            req_send_type = {
                type: 'PUT',
                url: this.apiUrl + '/Put'
            };
        }
        ServiceObj.saveItemsService(req_send_type, formData);

    },
    Delete: function (formData) {
        let req_send_type = {
            type: 'DELETE',
            url: this.apiUrl + '/Delete/' + formData.Id
        };
        ServiceObj.deletetemsService(req_send_type);
    },
    InitFormWithData: function (formItemData) {

        $("#nameTxt").dxTextBox({
            value: formItemData.Name,
            showClearButton: true
        }).dxValidator({
            validationGroup: "itemForm",
            validationRules: [{
                type: "required",
                message: "Name is required"
            },
            {
                type: "stringLength",
                min: 2,
                message: "Name must have at least 2 symbols"
            },
            {
                type: "stringLength",
                max: 20,
                message: "Name must have at most 20 symbols"
            }]
        });
        $("#descriptionTxt").dxTextBox({
            value: formItemData.Description,
            showClearButton: true
        }).dxValidator({
            validationGroup: "itemForm",
            validationRules: [{
                type: "required",
                message: "Description is required"
            },
            {
                type: "stringLength",
                min: 2,
                message: "Description must have at least 2 symbols"
            },
            {
                type: "stringLength",
                max: 100,
                message: "Description must have at most 100 symbols"
            }]
        });
        $("#saleStartDateTxt").dxDateBox({
            displayFormat: "dd/MM/yyyy",
            value: formItemData.SaleStartDate,
            showClearButton: true
        }).dxValidator({
            validationGroup: "itemForm",
            validationRules: [{
                type: "required",
                message: "Sale start date is required"
            }]
        });
        $("#file-uploader").dxFileUploader({
            selectButtonText: "Select photo",
            labelText: "",
            withPreview: true,
            singleImage: true,
            multiple: false,
            accept: ['.jpg', '.gif', '.png', '.gif', '.svg'],//"image/*",
            //uploadMode: "useButtons",
            onValueChanged: function (e) {
                var files = e.value;

                if (files.length > 0) {
                    $("#selected-files .selected-item").remove();
                    $.each(files, function (i, file) {
                        formItemData.File = file;//for now only one
                        var $selectedItem = $("<div />").addClass("selected-item");
                        $selectedItem.append(
                            $("<span />").html("Name: " + file.name + "<br/>"),
                            $("<span />").html("Size " + file.size + " bytes" + "<br/>"),
                            $("<span />").html("Type " + file.type + "<br/>"),
                            $("<span />").html("Last Modified Date: " + file.lastModifiedDate)
                        );
                        $selectedItem.appendTo($("#selected-files"));
                    });
                    $("#selected-files").show();
                }
                else {
                    formItemData.File = null;
                    $("#selected-files").hide();
                }

            }
        });
        var fileUploader = $("#file-uploader");
        var fileUploaderInstance = fileUploader.dxFileUploader("instance");
        fileUploaderInstance.reset();
        $("#selected-files .selected-item").remove();


        $("#saveButton").dxButton({
            text: formItemData.Id > 0 ? "Update" : "Create",
            type: "success",
            validationGroup: "itemForm",
            onClick: function (e) {
                var result = e.validationGroup.validate();
                if (result.isValid) {
                    formItemStoreObj.Save(formItemData);
                    return false;
                }
                else {
                    DevExpress.ui.dialog.alert('There are some validations errors,Please correct form data');
                }
            }
        });
        $("#deleteButton").dxButton({
            text: "Delete",
            visible: formItemData.Id > 0,
            type: "success",
            onClick: function () {
                formItemStoreObj.Delete(formItemData);
                return false;
            }
        });

        document.getElementById("formSection").style.display = 'block';

    },
    AddNewRow: function () {
        let newForm = JSON.parse(JSON.stringify(this.formItem));//deep clone
        this.InitFormWithData(newForm);
    },
    ClearForm: function () {
        let newForm = JSON.parse(JSON.stringify(this.formItem));//deep clone
        this.InitFormWithData(newForm);
    }
};
 
 
 