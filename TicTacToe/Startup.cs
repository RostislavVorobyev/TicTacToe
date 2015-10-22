using Microsoft.Owin;
using Owin;

namespace TicTacToe
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}