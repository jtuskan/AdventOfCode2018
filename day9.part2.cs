public static void Main(string[] args)
    {
        Console.WriteLine(string.Format("{0}/{1}", SolveDay9(446, 7152200), 3277920293));
        Console.ReadKey();
    }

    private static long SolveDay9(int numberOfPlayers, int lastMarbleValue)
    {
        var players = new long[numberOfPlayers];

        LinkedList<int> board = new LinkedList<int> { };
        var head = board.AddFirst(0);
        var currentMarble = board.AddAfter(head, 1);
        long score = 0;
        for (var i = 2; i <= lastMarbleValue; i++)
        {
            if (i % 23 == 0)
            {
                int x = 7;
                var node = currentMarble;
                while (x-- != 0) node = node.Previous ?? board.FindLast(board.Last());
                score = i + node.Value;
                currentMarble = node.Next;
                board.Remove(node);
                players[i % numberOfPlayers] += score;
            }
            else
            {
                if (currentMarble.Next != null)
                {
                    currentMarble = board.AddAfter(currentMarble.Next, i);
                }
                else
                {
                    currentMarble = board.AddAfter(head, i);
                }
            }
        }

        return players.Max();
    }