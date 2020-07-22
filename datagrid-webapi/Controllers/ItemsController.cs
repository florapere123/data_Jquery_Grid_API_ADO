using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using datagrid_webapi.Models;
using datagrid_webapi.Repository;
using datagrid_webapi.Utility;

namespace datagrid_webapi.Controllers
{
    public class ItemsController : ApiController
    {
        public  string itemsStoreConnectionString;
        public ItemsController()
        {
            itemsStoreConnectionString = ConfigurationManager.ConnectionStrings["GeneralDBConnectionString"].ConnectionString; 
        }
        /// <summary>
        /// get all items
        /// </summary>
        /// <returns></returns>
        // GET api/<controller>
        [HttpGet]
        public List<ItemModel> Get()
        {
            var data = DbClientFactory<ItemsDbClient>.Instance.GetItems(itemsStoreConnectionString);
            return data;
           
        }
        /// <summary>
        /// get specific item by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        // GET api/<controller>/5
        public ItemModel Get(int id)
        {
               ItemModel item = new ItemModel();
                var data = DbClientFactory<ItemsDbClient>.Instance.GetItems(itemsStoreConnectionString, id);

               return data.Any() ? data.FirstOrDefault() : null;
            
        }
        /// <summary>
        /// add item to store
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        // POST api/<controller>
        public ItemModel Post()
        {
            ItemModel item = new ItemModel();

            ConvertFormDataToItemModel(item);
            var updatedItem = DbClientFactory<ItemsDbClient>.Instance.CreateItem(item, itemsStoreConnectionString);

            return updatedItem;
        }

      
        /// <summary>
        /// update item
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        // PUT api/<controller>/5
        public ItemModel Put()
        {
            ItemModel item = new ItemModel();

            ConvertFormDataToItemModel(item);
            var updatedItem = DbClientFactory<ItemsDbClient>.Instance.Updatetem(item, itemsStoreConnectionString);

            return updatedItem;
        }
        /// <summary>
        /// helper method that is called from put and post methods -the core of those methods is identical
        /// </summary>
        /// <param name="item"></param>
        private static void ConvertFormDataToItemModel(ItemModel item)
        {
            var sendedForm = HttpContext.Current.Request;
            if (sendedForm != null && sendedForm.Form != null && sendedForm.Form.AllKeys.Length > 0)
            {
                var formKeys = sendedForm.Form.AllKeys;


                foreach (var key in formKeys)
                {
                    var val = sendedForm.Form.Get(key);
                    switch (key)
                    {
                        case "Id":
                            item.Id = Convert.ToInt32(val);
                            break;
                        case "Name":
                            item.Name = val;
                            break;
                        case "Description":
                            item.Description = val;
                            break;
                        case "SaleStartDate":
                            item.SaleStartDate = String.IsNullOrEmpty(val) ? ((DateTime?)null) : Convert.ToDateTime(val);
                            break;
                        case "ImageId":
                            item.ImageId = String.IsNullOrEmpty(val) ? ((int?)null) : Convert.ToInt32(val);
                            break;
                        case "ImageUrl":
                            item.ImageUrl = val;
                            break;

                        default:
                            // code block
                            break;
                    }
                   
                }
                // Show all the key-value pairs.
                if (sendedForm.Files != null && sendedForm.Files.Count > 0)
                {
                    var currentFile = sendedForm.Files[0];
                    var url = UploadFile.Upload(currentFile);
                    if (!String.IsNullOrEmpty(url))
                    {
                        item.ImageId = 0;
                        item.ImageUrl = url;
                    }

                }
            }
        }
        /// <summary>
        /// delete method
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // DELETE api/<controller>/5
        public DeletedItemModel Delete(int id)
        {
            var deletedItem = DbClientFactory<ItemsDbClient>.Instance.Deletetem(id, itemsStoreConnectionString);

            return deletedItem;
        }
    }
}