using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using TestBuddyMVC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.SignalR
{
    public class TestHub : Hub
    {
        public static class UserHandler
        {
            public static HashSet<string> ConnectedIds = new HashSet<string>();
            public static HashSet<string> Submitted = new HashSet<string>();
        }

        public void SendTestMessage(string testid,string testname,string desc,int maxtime)
        {
            Clients.All.addNewMessageToPage(testid, testname, desc,maxtime);
        }

        public void UpdateConnectedUsers(int n)
        {
            Clients.All.updateConnectedUsers(n);
        }

        public void TestSubmittedUsers(string lol)
        {
            UserHandler.Submitted.Add(Context.ConnectionId);
            Clients.All.testSubmittedUsers(UserHandler.Submitted.Count);
        }
        public override Task OnConnected()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            UpdateConnectedUsers(UserHandler.ConnectedIds.Count);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            UpdateConnectedUsers(UserHandler.ConnectedIds.Count);
            return base.OnDisconnected(stopCalled);
        }
    }
}