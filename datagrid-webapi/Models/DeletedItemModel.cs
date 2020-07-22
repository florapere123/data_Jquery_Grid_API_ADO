using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace datagrid_webapi.Models
{
    public class DeletedItemModel
    {
        public int DeletedId { get; set; }
        public bool? IsDeleted { get; set; }
        
    }
}