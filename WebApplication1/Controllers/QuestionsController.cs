using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class QuestionsController : ApiController
    {
        private TestBuddy db = new TestBuddy();

        // GET: api/Questions
        public List<QuestionModel> GetQuestions(string s)
        {
            var z = from p in db.Questions
                    where p.QuestionId.Contains(s)
                    select new QuestionModel
                    {
                        QuestionId = p.QuestionId,
                        Question = p.Question,
                        Option1 =p.Option1,
                        Option2 =p.Option2,
                        Option3=p.Option3,
                        Option4 =p.Option4
                    };

            return z.ToList();
        }


        // POST: api/Questions
        [ResponseType(typeof(List<Questions>))]
        public IHttpActionResult PostQuestions(List<Questions> questions, string Test_ID)
        {

            int Qno = 0;
            foreach (var v in questions)
            {
                Qno += 1;
                db.Questions.Add(new Questions()
                {
                    QuestionId = Test_ID + Qno ,
                    Question = v.Question,
                    TestId = Test_ID,
                    Option1 = v.Option1,
                    Option2 = v.Option2,
                    Option3 = v.Option3,
                    Option4 = v.Option4,
                    Answer = v.Answer
                });
            }


            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                //  return Conflict();
                return Ok("Test Paper uploaded Failed");
            }


            return Ok("Test Paper uploaded Succesfully");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool QuestionsExists(string id)
        {
            return db.Questions.Count(e => e.QuestionId == id) > 0;
        }
    }
}