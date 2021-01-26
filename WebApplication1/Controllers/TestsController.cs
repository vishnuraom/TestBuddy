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

namespace WebApplication1.Controllers
{
    public class TestsController : ApiController
    {
        private TestBuddy db = new TestBuddy();

        // GET: api/Tests
        public IQueryable<Tests> GetTests()
        {
            return db.Tests;
        }

        // GET: api/Tests/5
        [ResponseType(typeof(Tests))]
        public IHttpActionResult GetTests(string id)
        {
            Tests tests = db.Tests.Find(id);
            if (tests == null)
            {
                return NotFound();
            }

            return Ok(tests);
        }

        [Authorize(Roles = "Admin,Recruiter")]
        // POST: api/Tests
        [ResponseType(typeof(Tests))]
        public IHttpActionResult PostTests(Tests tests)
        {
            long ticks = DateTime.Now.Ticks;
            byte[] bytes = BitConverter.GetBytes(ticks);
            string id = Convert.ToBase64String(bytes)
                                    .Replace('+', '_')
                                    .Replace('/', '-')
                                    .TrimEnd('=');
            tests.TestId = id;
            tests.EmailId = User.Identity.Name;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tests.Add(tests);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TestsExists(tests.TestId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tests.TestId }, tests);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TestsExists(string id)
        {
            return db.Tests.Count(e => e.TestId == id) > 0;
        }
    }
}