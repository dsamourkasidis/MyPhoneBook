using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;

namespace MyPhoneBook.Hubs
{
    public class MyHub : Hub
    {
        static Dictionary<string, string > OnlineUsers = new Dictionary<string,string>();

        public void GoOnline(string email)
        {
            var connid = Context.ConnectionId;
            if (OnlineUsers.ContainsValue(connid))
            {
                Clients.Caller.receiveconusers(OnlineUsers);
            }
            else
            {
                OnlineUsers.Add(email, connid);
                Clients.Others.receiveconusers(OnlineUsers);
            }
        }

        public void GoOffline()
        {
            string connid = Context.ConnectionId;
            //Remove the user from the ConnectedUsers dic on disconnect
            if (OnlineUsers.ContainsValue(connid))
            {
                var discon = OnlineUsers.First(x => x.Value == connid);
                OnlineUsers.Remove(discon.Key);
                Clients.All.receiveconusers(OnlineUsers);
            }
        }

        public void SendMessage(string receipient_email, string msg)
        {
            
            if (OnlineUsers.ContainsKey(receipient_email))
            {
                string senderid = Context.ConnectionId;
                var sender = OnlineUsers.FirstOrDefault(u => u.Value == senderid);
                if (sender.Key == null)
                {
                    Clients.Caller.receivemsg("Get Online First!", "phonebook@");
                }
                else
                {
                    List<string> ids = new List<string>();
                    ids.Add(senderid);
                    ids.Add(OnlineUsers[receipient_email]);
                    Clients.Clients(ids).receivemsg(msg, sender.Key, receipient_email);
                }

            }
            else
            {
                Clients.Caller.receivemsg("User Not Online!", "phonebook@");
            }
            
        }

        public override Task OnConnected()
        {
            Clients.All.receiveconusers(OnlineUsers);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            string connid = Context.ConnectionId;
            //Remove the user from the ConnectedUsers dic on disconnect
            if (OnlineUsers.ContainsValue(connid))
            {
                var discon = OnlineUsers.First(x => x.Value == connid);
                OnlineUsers.Remove(discon.Key);
            }
            Clients.All.receiveconusers(OnlineUsers);
            return base.OnDisconnected(true);
        }


    }
}