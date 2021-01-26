using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestBuddyMVC.Controllers
{
    public class CollegeController : Controller
    {
        // GET: College
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateTest()
        {
            return View();
        }

        public ActionResult CreateTesttwo()
        {
            return View();
        }

        public ActionResult StartTest()
        {
            return View();
        }

        public ActionResult Performance()
        {
            return View();
        }

        public ActionResult QuickStats()
        {
            return View();
        }
        //[HttpPost]
        //public ActionResult UploadTest(HttpPostedFileBase file, string TestId)
        //{
        //    DataSet ds = new DataSet();
        //    if (Request.Files["file"].ContentLength > 0)
        //    {
        //        string fileExtension =
        //                             System.IO.Path.GetExtension(Request.Files["file"].FileName);

        //        if (fileExtension == ".xls" || fileExtension == ".xlsx")
        //        {
        //            string fileLocation = Server.MapPath("~/Content/") + Request.Files["file"].FileName;
        //            if (System.IO.File.Exists(fileLocation))
        //            {

        //                System.IO.File.Delete(fileLocation);
        //            }
        //            Request.Files["file"].SaveAs(fileLocation);
        //            string excelConnectionString = string.Empty;
        //            excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" +
        //            fileLocation + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
        //            //connection String for xls file format.
        //            if (fileExtension == ".xls")
        //            {
        //                excelConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +
        //                fileLocation + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
        //            }
        //            //connection String for xlsx file format.
        //            else if (fileExtension == ".xlsx")
        //            {
        //                excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" +
        //                fileLocation + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
        //            }
        //            //Create Connection to Excel work book and add oledb namespace
        //            OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);
        //            excelConnection.Open();
        //            DataTable dt = new DataTable();

        //            dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
        //            if (dt == null)
        //            {
        //                return null;
        //            }

        //            String[] excelSheets = new String[dt.Rows.Count];
        //            int t = 0;
        //            //excel data saves in temp file here.
        //            foreach (DataRow row in dt.Rows)
        //            {
        //                excelSheets[t] = row["TABLE_NAME"].ToString();
        //                t++;
        //            }
        //            OleDbConnection excelConnection1 = new OleDbConnection(excelConnectionString);


        //            string query = string.Format("Select * from [{0}]", excelSheets[0]);
        //            using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(query, excelConnection1))
        //            {
        //                dataAdapter.Fill(ds);
        //            }
        //        }
        //        string constr = @"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=C:\Users\vishn\Desktop\today28\WebApplication1Up\WebApplication1\App_Data\aspnet-WebApplication1-20171011103106.mdf;Initial Catalog=aspnet-WebApplication1-20171011103106;Integrated Security=True";
        //        SqlConnection con = new SqlConnection(constr);
        //        con.Open();

        //        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        //        {
        //            string QuestionId = TestId + i.ToString();
        //            string query = "Insert into dbo.Questions(TestId, QuestionId, Question, Option1, Option2, Option3, Option4, Answer) Values('" + TestId + "','" + QuestionId + "','" + ds.Tables[0].Rows[i][0].ToString() + "','" + ds.Tables[0].Rows[i][1].ToString() + "','" + ds.Tables[0].Rows[i][2].ToString() + "','" + ds.Tables[0].Rows[i][3].ToString() + "','" + ds.Tables[0].Rows[i][4].ToString() + "','" + ds.Tables[0].Rows[i][5].ToString() + "')";
        //            SqlCommand cmd = new SqlCommand(query, con);
        //            cmd.ExecuteNonQuery();
        //        }
        //        ViewBag.Questions = ds.Tables[0].Rows.Count;
        //        ViewBag.TestId = TestId;
        //        con.Close();
        //    }

        //    return View();
        //}

    }
}