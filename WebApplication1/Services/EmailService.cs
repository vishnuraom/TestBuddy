using Microsoft.AspNet.Identity;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await configSendGridasync(message);
        }

        // Use NuGet to install SendGrid (Basic C# client lib) 
        private async Task configSendGridasync(IdentityMessage message)
        {
        var client = new SendGridClient("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");
        var from = new EmailAddress("admin@testbuddy.com", "Admin TestBuddy");
        var subject = message.Subject;
        var to = new EmailAddress(message.Destination, "User");
        var plainTextContent = message.Body;
        var htmlContent = message.Body;
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg);
        }



        public async Task SendAsyncMultiple(List<string> destinations,string body)
        {
            await configSendGridasync(destinations,body);
        }

        private async Task configSendGridasync(List<string> destinations,string body)
        {
            List<EmailAddress> s = new List<EmailAddress>();
            foreach (var email in destinations)
            {
                var toemail = new EmailAddress(email, "User");

                s.Add(toemail);
            }
            var client = new SendGridClient("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");
            var from = new EmailAddress("admin@testbuddy.com", "Admin TestBuddy");
            var subject = body;
            var plainTextContent =body;
            var htmlContent = body;
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, s, subject, plainTextContent, htmlContent,true);
            var response = await client.SendEmailAsync(msg);
        }
    }
}