using Microsoft.AspNetCore.SignalR;

namespace ApiSignalRElectron
{
    public class ChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {    
            await Clients.Caller.SendAsync("GetConnectionId", Context.ConnectionId);
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
