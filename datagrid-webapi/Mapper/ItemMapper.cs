using datagrid_webapi.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using datagrid_webapi.Utility;

namespace datagrid_webapi.Mapper
{
    /// <summary>
    /// mapper ->mapes from sql SqlDataReader to model
    /// </summary>
    public static class ItemMapper
    {
        public static ItemModel MapAsItem(this SqlDataReader reader,bool isList = false)
        {
            if(!isList)
            {
                if (!reader.HasRows)
                    return null;
                reader.Read();
            }
            var item = new ItemModel();
            if (reader.IsColumnExists("Id"))
                item.Id = SqlHelper.GetNotNullableInt32(reader, "Id");

            if (reader.IsColumnExists("Name"))
                item.Name = SqlHelper.GetNullableString(reader, "Name");

            if (reader.IsColumnExists("Description"))
                item.Description = SqlHelper.GetNullableString(reader, "Description");
            if (reader.IsColumnExists("SaleStartDate"))
                item.SaleStartDate = SqlHelper.GetDateTime(reader, "SaleStartDate");

             
            if (reader.IsColumnExists("ImageId"))
                item.ImageId = SqlHelper.GetNullableInt32(reader, "ImageId");

            if (reader.IsColumnExists("ImageUrl"))
                item.ImageUrl = SqlHelper.GetNullableString(reader, "ImageUrl");
            return item;
        }

        public static List<ItemModel> MapAsItemsList(this SqlDataReader reader)
        {
            var list = new List<ItemModel>();
            while(reader.Read())
            {
                list.Add(MapAsItem(reader, true));
            }
            return list;
        }
        public static DeletedItemModel MapAsDeletedItem(this SqlDataReader reader, bool isList = false)
        {
            if (!isList)
            {
                if (!reader.HasRows)
                    return null;
                reader.Read();
            }
            var item = new DeletedItemModel();
            if (reader.IsColumnExists("DeletedId"))
                item.DeletedId = SqlHelper.GetNotNullableInt32(reader, "DeletedId");

            if (reader.IsColumnExists("IsDeleted"))
                item.IsDeleted = SqlHelper.GetNullableBoolean(reader, "IsDeleted");

            
            return item;
        }
         
    }
}
