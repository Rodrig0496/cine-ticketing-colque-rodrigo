namespace CineTicketing.API.Models;

public class Seat {
    public int Id { get; set; }
    public string Row { get; set; } = string.Empty;
    public int Number { get; set; }
    public bool IsAvailable { get; set; } = true;
    public int RoomId { get; set; }
}
