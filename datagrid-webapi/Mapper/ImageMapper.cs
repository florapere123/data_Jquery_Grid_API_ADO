using datagrid_webapi.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using datagrid_webapi.Utility;

namespace datagrid_webapi.Mapper
{
    public static class ImageMapper
    {
        public static ImageModel MapAsImage(this SqlDataReader reader,bool isList = false)
        {
            if(!isList)
            {
                if (!reader.HasRows)
                    return null;
                reader.Read();
            }
            var item = new ImageModel();
            if (reader.IsColumnExists("Id"))
                item.Id = SqlHelper.GetNotNullableInt32(reader, "Id");

            if (reader.IsColumnExists("ImageUrl"))
                item.ImageUrl = SqlHelper.GetNullableString(reader, "ImageUrl");
             
            return item;
        }
        public static List<ImageModel> MapAsImagesList(this SqlDataReader reader)
        {
            var list = new List<ImageModel>();
            while (reader.Read())
            {
                list.Add(MapAsImage(reader, true));
            }
            return list;
        }

    }
}
