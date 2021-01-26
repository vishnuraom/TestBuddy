using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class CustomController : ApiController
    {
        TestBuddy db = new TestBuddy();

        [Route("api/Role")]
        [HttpGet]
        [Authorize]
        [ResponseType(typeof(ReturnRole))]
        public IHttpActionResult Get()
        {
            if (User.IsInRole("Student"))
            {
                ReturnRole r = new ReturnRole();
                r.Role = "Student";
                return Ok(r);
            }
            else if (User.IsInRole("Admin"))
            {
                ReturnRole r = new ReturnRole();
                r.Role = "Admin";
                return Ok(r);
            }
            else if (User.IsInRole("Recruiter"))
            {
                ReturnRole r = new ReturnRole();
                r.Role = "Recruiter";
                return Ok(r);
            }
            else
            {
                return NotFound();
            }

        }


        [Authorize(Roles = "Student")]
        [Route("api/Submit")]
        [HttpPost]
        public IHttpActionResult Get(string testid, Dictionary<string, int> useranswers)
        {
            Dictionary<string, int> answers = new Dictionary<string, int>();
            var z = from p in db.Questions
                    where p.TestId == testid
                    select new AnswerModel
                    {
                        QuestionId = p.QuestionId,
                        Answer = p.Answer
                    };
            answers = z.ToDictionary(x => x.QuestionId, x => x.Answer);
            double correctAnswers = 0;
            double pc = 0;
            try
            {
                foreach (var key in useranswers.Keys)
                {
                    if (useranswers[key] == answers[key])
                    {
                        correctAnswers++;
                    }
                }
            }
            catch (KeyNotFoundException)
            {
                throw;
            }

            var testObj = (from p in db.Tests where p.TestId.Contains(testid) select p).FirstOrDefault();
            var maxMarks = Convert.ToDouble(testObj.MaxMarks);
            pc = (correctAnswers / maxMarks) * 100;

            StudentResults s = new StudentResults();
            s.EmailId = User.Identity.Name;
            s.Percentage = pc;
            s.TestId = testid;
            if (pc < 40)
            {
                s.Result = false;
            }
            else {
                s.Result = true;
            }
            db.StudentResults.Add(s);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }
            return Ok(s);
        }




        //[Authorize(Roles = "Recruiter")]
        [Route("api/results")]
        [HttpGet]
        public IQueryable<StudentResultsModel> GetStudentResults(string testid)
        {
            var z = from p in db.StudentResults
                    where p.TestId == testid
                    select new StudentResultsModel
                    {
                        Email = p.EmailId,
                        Percentage = p.Percentage,
                        TestId = p.TestId
                    };
            return z;
        }
    }
}
