using datagrid_webapi.Models;
using datagrid_webapi.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using datagrid_webapi.Mapper;
using System.Data.SqlClient;
using System.Data;

namespace datagrid_webapi.Repository
{/// <summary>
/// 
/// </summary>
    public class ItemsDbClient
    {
        public List<ItemModel> GetItems(string connString, int? ID=null)
        {
            SqlParameter[] param = {
                new SqlParameter("@Id",ID)
            };
            return SqlHelper.ExtecuteProcedureReturnData<List<ItemModel>>(connString,
                "GetItems",  r => r.MapAsItemsList(),param);
        }

        public ItemModel CreateItem(ItemModel model, string connString)
        {
           
            SqlParameter[] param = {
               // new SqlParameter("@Id",model.Id),
                new SqlParameter("@Name",model.Name),
                new SqlParameter("@Description",model.Description),
                new SqlParameter("@SaleStartDate",model.SaleStartDate),
                new SqlParameter("@ImageUrl",model.ImageUrl)
            };
            var updatedItem= SqlHelper.ExtecuteProcedureReturnData<ItemModel>(connString, "CreateItem", r => r.MapAsItem(), param);
            return (updatedItem);
        }

        public ItemModel Updatetem(ItemModel model, string connString)
        {

            SqlParameter[] param = {
                new SqlParameter("@Id",model.Id),
                new SqlParameter("@Name",model.Name),
                new SqlParameter("@Description",model.Description),
                new SqlParameter("@SaleStartDate",model.SaleStartDate),
                new SqlParameter("@ImageUrl",model.ImageUrl)
            };
            var updatedItem = SqlHelper.ExtecuteProcedureReturnData<ItemModel>(connString, "UpdateItem", r => r.MapAsItem(), param);
            return (updatedItem);
        }

        public DeletedItemModel Deletetem(int id, string connString)
        {

            SqlParameter[] param = {
                new SqlParameter("@id",id) 
            };
            var deletedItem = SqlHelper.ExtecuteProcedureReturnData<DeletedItemModel>(connString, "DeleteItem", r => r.MapAsDeletedItem(), param);
            return (deletedItem);
        }
    }
}
