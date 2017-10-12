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
        var from = new EmailAddress("vishnumechineni@gmail.com", "Admin TestBuddy");
        var subject = message.Subject;
        var to = new EmailAddress(message.Destination, "User");
            //var plainTextContent = "and easy to do anywhere, even with C#";
            var plainTextContent = message.Body;
            var htmlContent = message.Body;
            //var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg);
        }
    }
}