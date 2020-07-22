using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace datagrid_webapi.Utility
{
    public static class UploadFile
    {
        public static string UploadPath = "UploadedFiles/images/";
        
        /// <summary>
        /// uploades file to the specified place inside project
        /// the path is taken from config file 
        /// if the path is not specified than it copies to Resources/Images
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public static string Upload(HttpPostedFile file)
        {
            var url = "";
            
            string fileName = Path.GetFileName(file.FileName);
            string fullPath = Path.Combine(HostingEnvironment.MapPath("~/"+ UploadPath), fileName);
            if (file != null && file.ContentLength > 0)
            {
                try
                {
                    file.SaveAs(fullPath);
                    url = String.Concat(UploadPath, fileName);
                   
                }
                catch(Exception ex)
                {
                    throw ex;
                }
            
               
            }
             return url;
            
           
        }
    }
}