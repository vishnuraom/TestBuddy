using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    // Models returned by various actions.

    public class ReturnRole
    {
        public string Role { get; set; }
    }

    public class TestModel
    {
        public string Description { get; set; }
        public string TestName { get; set; }
        public string TestId { get; set; }
        public int MaxMarks { get; set; }
        public int MinMarks { get; set; }
    }


    public class QuestionModel
    {
        public string QuestionId { get; set; }
        public string Question { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
    }

    public class AnswerModel
    {
        public string QuestionId { get; set; }
        public int Answer { get; set; }
    }

    public class StudentResultsModel
    {
        public string TestId { get; set; }
        public string StudentId { get; set; }
        public string Email { get; set; }
        public double Percentage { get; set; }

    }

    public class StudentEmail
    {
        public string EmailId { get; set; }

    }

}