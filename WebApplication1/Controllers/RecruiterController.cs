using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    public class RecruiterController : ApiController
    {

        private TestBuddy db = new TestBuddy();

        [Route("api/Company/TestName")]
        public IHttpActionResult GetTestName()
        {
            try
            {
                var TestName = (from data in db.Tests
                                select new { data.TestId,data.TestName });

                return Ok(TestName);
            }
            catch (Exception)
            {
                return NotFound();
            }

        }

        [Route("api/Company/getData")]
        [HttpGet]
        public IQueryable<StudentResultsModel> getData(string testId)
        {
                var asap = (from data in db.StudentResults
                            where data.TestId == testId
                            select new StudentResultsModel { TestId = data.TestId, Email = data.EmailId,Percentage =data.Percentage });
                return asap;
        }


        [Authorize(Roles = "Student")]
        [Route("api/Company/getStudentData")]
        [HttpGet]
        public IQueryable<StudentResultsModel> getStudentData()
        {
            var email = User.Identity.Name;
                var x = (from data in db.StudentResults
                         where data.EmailId == email
                         select new StudentResultsModel { TestId = data.TestId, Email = data.EmailId, Percentage = data.Percentage });

                if (x != null) { return x; }
                else
                    return x;
        }


        [Route("api/Company/sending")]
        [HttpPost]
        public IHttpActionResult Post(List<string> EmailId, string body)
        {
            EmailService objEmailService = new EmailService();
            try
            {
                var x = objEmailService.SendAsyncMultiple(EmailId, body);
                if (x != null) { return Ok("Successfully sent emails"); }
                else
                    return NotFound();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
