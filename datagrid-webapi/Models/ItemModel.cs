using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace datagrid_webapi.Models
{
    public class ItemModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? SaleStartDate { get; set; }
        public int? ImageId { get; set; }
        public string ImageUrl { get; set; }
    }
}