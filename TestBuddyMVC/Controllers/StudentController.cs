using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestBuddyMVC.Controllers
{
    public class StudentController : Controller
    {
        // GET: Student
        public ActionResult Test()
        {
            return View();
        }

        public ActionResult Dashboard()
        {
            return View();
        }
    }
}