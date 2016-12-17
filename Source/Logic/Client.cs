namespace TicTacToe.Logic
{
    using System;

    public class Client
    {
        public string ConnectionId { get; set; }

        public string Name { get; set; }

        public Client Opponent { get; set; }

        public bool IsPlaying { get; set; }

        public bool WaitingForMove { get; set; }

        public bool LookingForOpponent { get; set; }

        public DateTime GameStarted { get; set; }
    }
}