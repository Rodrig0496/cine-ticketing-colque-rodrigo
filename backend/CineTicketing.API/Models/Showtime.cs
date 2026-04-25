namespace CineTicketing.API.Models;

public class Showtime {
    public int Id { get; set; }
    public int MovieId { get; set; }
    public Movie? Movie { get; set; }
    public DateTime StartTime { get; set; }
    public int RoomId { get; set; }
}
